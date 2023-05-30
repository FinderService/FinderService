import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Address from "@/models/Address";

export default async function dataHandler(req, res) {
  await dbConnect();
  try {
    const { body } = req;
    const { email, address } = body;
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

    let updateUser =
      user.profile === "worker"
        ? await Worker.findOneAndUpdate(
            { email: email },
            { $set: { ...body } }
          ).exec()
        : await Employer.findOneAndUpdate(
            { email: email },
            { $set: { ...body } },
            { new: true }
          ).exec();
   

    let updateAddress = await Address.findOneAndUpdate(
      {
        _id: user.address,
      },
      {
        $set: {
          ...address[0]
        },
      },
      { new: true }
    );

 

    if (updateUser && updateAddress) {
      await dbDisconnect();
      return res.status(200).json({
        success: true,
        msg: "La información se actualizó exitosamente",
        updateUser,
        updateAddress,
      });
    }

    await dbDisconnect();
    return res.status(400).json({
      success: false,
      error: "No se pudo completar la petición, intentelo más tarde.",
    });
  } catch (error) {
    console.log(error);
    await dbDisconnect();
    return res.status(400).json({ error: error.message });
  }
}
