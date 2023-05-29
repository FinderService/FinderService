import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Address from '../../../models/Address'
export default async function getAddress(req, res) {
  await dbConnect();
  try {
    const response = await Address.find({})
    if(response.length === 0){
        await dbDisconnect();
        return res.status(404).json({
            error: 'No se encontraron direcciones'
        })
    } else {
        await dbDisconnect();
        return res.status(200).json(response)
    }
  } catch (error) {
    console.log(error);
    await dbDisconnect();
    return res.status(400).json({ success: false, error: error });
  }
}
