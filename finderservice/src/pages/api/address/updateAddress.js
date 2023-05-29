import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Address from "@/models/Address";

export default async function UpdateAddress(req, res) {
  try {
    const { id, name, street, city, state, country, zipCode } = req.body;

    if (!id || !name || !street || !city || !state || !country || !zipCode) {
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
        name,
        street,
        city,
        state,
        country,
        zipCode,
      }
    ).exec();

    if (result) {
      await dbDisconnect();
      return res
        .status(200)
        .json({ success: true, msg: "La direccion se actualizo con éxito" });
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
