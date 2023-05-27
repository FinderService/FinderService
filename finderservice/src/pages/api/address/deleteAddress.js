import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Address from "@/models/Address";

export default async function UpdateAddress(req, res) {
  try {
    const { id } = req.body;

    if (!id ) {
      throw new Error("Datos incompletos");
    }

    await dbConnect();

    let address = await Address.findOne({ _id: id });
    if (!address) {
      //throw new Error("Ya tienes una dirección con ese nombre");
      await dbDisconnect();
      return res
        .status(400)
        .json({ success: false, msg: "Direccion no encontrada" });
    }

    let result = await Address.updateOne(
      { _id: id },
      {
        deleted: true
      }
    ).exec();

    if (result) {
      await dbDisconnect();
      return res
        .status(200)
        .json({ success: true, msg: "La direccion se elimino con éxito" });
    }

    await dbDisconnect();
    return res.status(400).json({
      success: false,
      error: "No se pudo completar la petición, intentelo más tarde.",
    });
  } catch (error) {
    await dbDisconnect();
    res.status(400).json({ success: false, error });
    //res.send(error);
    //throw new Error(error);
  }
}
