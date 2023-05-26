import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";

export default async function dataHandler(req, res) {
  await dbConnect();
  try {
    const { newPhone, newName } = req.body;
    if (!newPhone || newName) {
      throw new Error("Datos incompletos");
    }
    let user = await Employer.findOne({ email }).exec();
    if (!user) {
      user = await Worker.findOne({ email }).exec();
    }
    if (!user) {
      await dbDisconnect();
      return res
        .status(404)
        .json({ error: "No se encontró al empleado con ese correo" });
    }

    let result =
      user.profile === "worker"
        ? await Worker.updateOne(
            { _id: id },
            { $set: { name: newName, phone: newPhone } }
          ).exec()
        : await Employer.updateOne(
            { _id: id },
            { $set: { name: newName, phone: newPhone } }
          ).exec();
    if (result) {
      await dbDisconnect();
      return res.status(200).json({
        success: true,
        msg: "La información se actualizó exitosamente",
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
