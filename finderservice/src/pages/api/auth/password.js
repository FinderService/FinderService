import { dbConnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import { mailGun } from "@/utils/mailgun";
import crypto from 'crypto';

import { mailValidate } from "@/utils/plantillas";

export default async function registerHandler(req, res){

    try{

        console.log(req.body);

        const { current, newpass, id } = req.body;
        if( !current || !newpass || !email ) {
            throw new Error('Datos incompletos');
        }

        await dbConnect();

        const user = await Worker.findOne({ email }).exec();

        let isValid;
          await verifyPassword(
            password,
            user.password,
            user.salt
          ).then( (response) => {
            isValid = response;
          } )
          .catch( error => {
            console.log(error);
          } );
          
          if (!isValid) {
            console.log("El pass no es valido...");
            throw new Error("Usuario y/o password incorrectos.");
          }


    
    }catch(error){
        res.status(400).json({ success: false, error: error });
    }

}