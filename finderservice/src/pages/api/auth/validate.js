import Worker from "@/models/Worker";
import { dbConnect } from "@/utils/mongoose";

export default async function validateHandler(req, res){

    try{
        const { validator, email } = req.body;
        console.log(validator,email);
        //return;

        await dbConnect();
		let user = await Worker.findOne({ email }).exec();

        //console.log(user);
        if(user){

            user.active = true;
            let updated = await user.save();
            console.log(updated);
            if(updated){
                return res.status(200).json({ success: true, msg: 'Se actualizo con éxito.', user: user});
            }
            return res.status(404).json({ success: false, msg: 'Error al actualizar.' });
        }

    }catch(error){
        console.log(error);
        res.status(400).json({ success: false, error: error });
    }
}