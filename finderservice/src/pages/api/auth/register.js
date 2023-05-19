import { dbConnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import { mailGun } from "@/utils/mailgun";
import crypto from 'crypto';

import { mailValidate } from "@/utils/plantillas";

export default async function registerHandler(req, res){

    try{

        const { name, last, phone, username, password } = req.body;
        // console.log(req.body);

        if( !name || !last || !phone || !username || !password ) {
            throw new Error('Datos incompletos');
        }

        await dbConnect();
        console.log('sigue...');
       
        crypto.randomBytes(16, (err, salt) => {
		    const newSalt = salt.toString('base64')
		    crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', async (err, key) => {
			    const encryptedPassword = key.toString('base64')
                let email = username;
			    let user = await Worker.findOne({ email }).exec();
		        if(user){
			        return res.status(400).json({ success: false, msg: 'El usuario ya existe'});
			    }

                let appUrl = process.env.APP_URL;
                let validator = salt.toString('base64');
                let content = mailValidate(validator,email,appUrl);

			    let newUser = await Worker.create({
					name,
                    last,
                    phonenumber: phone,
                    password: encryptedPassword,
                    age: 22,
                    types,
                    email: username,
                    rating: 0,
                    salt: newSalt,
                    validator: validator,
                    profile,
				});


                let mail = await mailGun(username, 'Bienvenido a Finder Service', content );


                if(newUser){
                    return res.status(201).json({ success: true, user: newUser, msg: 'Usuario registrado con éxito.' });
                }
			
		    })  
	    })

    }catch(error){
        res.status(400).json({ success: false, error: error });
    }

}