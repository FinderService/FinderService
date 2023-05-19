import { dbConnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";

export default async function registerHandler(req, res){

    try{

        console.log(req.body);
        const { email } = req.body;
        if( !email ) {
            throw new Error('Falta el correo...');
        }

        await dbConnect();

        const user = await Worker.findOne({ email }).exec();

        res.status(200).json({ user })
    
    }catch(error){
        res.status(400).json({ success: false, error: error });
    }

}