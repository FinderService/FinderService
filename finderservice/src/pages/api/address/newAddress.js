import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Address from "@/models/Address";


export default async function NewAddressHandler(req, res) {
  try {
    const { id, name, street, city, state, country, zipCode } = req.body;

    if ( !id || !name || !street || !city || !state || !country || !zipCode ) {
      //throw new Error("Datos incompletos");
      await dbDisconnect();
      return res
        .status(400)
        .json({ success: false, msg: "Datos incompletos" });
    }

    await dbConnect();

    let user = await Employer.findById(id).exec();

    if (!user) {
      user = await Worker.findById(id).exec();
    }

    if (!user) {
      //throw new Error("No se encontro el usuario");
      await dbDisconnect();
      return res
        .status(400)
        .json({ success: false, msg: "No se encontro el usuario" });
    }

    let checkAddress = await Address.findOne({ id_usuario: id, name });
    if(checkAddress){
      //throw new Error("Ya tienes una dirección con ese nombre");
      await dbDisconnect();
      return res
        .status(400)
        .json({ success: false, msg: "Ya tienes una direccion con ese nombre" });
    }

    let deleted = false;
    let address = new Address({
      id_usuario: id, name, street, city, state, country, zipCode, deleted 
    });

    await address.save();
    console.log('resultado de insercion: ', address);

    
    if (address) {
      await dbDisconnect();
      return res
        .status(200)
        .json({ success: true, msg: "La direccion se agrego con éxito" });
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
