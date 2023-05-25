import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { encryptPass } from "@/utils/lib";

export default async function recoverPassword(req, res) {
  await dbConnect();
  try {
    const { validator, email, password } = req.body;
    let user = await Employer.findOne({ email }).exec();
    if (!user) {
      user = await Worker.findOne({ email }).exec();
    }
      


    if (!user) {
      await dbDisconnect();
      return res
        .status(404)
        .json({ error: "No se encontró al usuario con ese correo" });
    } else if (user.validator != validator) {
      await dbDisconnect();
      return res.status(404).json({ error: "El validator no es correcto" });
    } else {
      const { encryptedPassword, newSalt } = await encryptPass(password);
      user.UpdateOne({
        password: encryptedPassword,
        salt: newSalt,
      });
      await dbDisconnect();
      res.status(200).json({
        success: true,
        msg: "Se actualizó la contraseña exitosamente",
        user: user,
      });
    }
  } catch (error) {
    await dbDisconnect();
    res.status(400).json({ success: false, msg: error.message });
  }
}
