import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from '@/models/Worker'
import Employer from '@/models/Employer'
import { verifyPassword, encryptPass } from "@/utils/lib";

export default async function passwordHandler(req, res) {

    await dbConnect();
  
  try {
    const { current, newpass, userid: id, email } = req.body;
    if (!current || !newpass || !email || !id) {
      throw new Error("Datos incompletos");
    }
    console.log(req.body);
    let user = await Employer.findOne({ email }).exec();
    if (!user) {
      user = await Worker.findOne({ email }).exec();
    }
    console.log(user);

    if (!user) {
      await dbDisconnect();
      return res
        .status(404)
        .json({ error: "No se encontró al empleado con ese id" });
    }

    let isValid;
    try {
      isValid = await verifyPassword(current, user.password, user.salt);
    } catch (error) {
      await dbDisconnect();
      return res
        .status(404)
        .json({ success: false, msg: "Contraseña incorrecta" });
    }

    console.log("por aca");

    const { encryptedPassword, newSalt } = await encryptPass(newpass);

    console.log(encryptedPassword);

    let result =
      user.profile === "worker"
        ? await Worker.updateOne(
            { _id: id },
            { $set: { password: encryptedPassword, salt: newSalt } }
          ).exec()
        : await Employer.updateOne(
            { _id: id },
            { $set: { password: encryptedPassword, salt: newSalt } }
          ).exec();

    console.log(result);
    if (result) {
      await dbDisconnect();
      return res.status(200).json({
        success: true,
        msg: "La contraseña se actualizó con éxito!",
      });
    }
    await dbDisconnect();
    return res.status(400).json({
      success: false,
      error: "No se pudo completar la petición, intentelo más tarde.",
    });
  } catch (error) {
    await dbDisconnect();
    return res.status(400).json({ error: error.message });
  }
}
