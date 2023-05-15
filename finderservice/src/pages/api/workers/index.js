import { dbConnect } from "@/utils/mongoose";
import Worker from '@/models/Worker.js'
import Type from '@/models/Type.js'
import Address from '@/models/Address.js'
import mongoose from "mongoose";

export default async function handler(req, res){
    await dbConnect();

   switch(req.method) {
    case "GET":

        try{   

            const {name} = req.query;
            const workername = name?
                await Worker.find({
                name: { $regex: `${name}`, $options: "i" },
                })
                .populate("type", "-_id name")
                .populate("address", "-_id name city")
                : await Worker.find({})
                .populate("type", "-_id name")
                .populate("address", "-_id name city")

            if(workername.length!==0) {
                return res
                .status(200)
                .json(workername)
            } else {
                await mongoose.connection.close();
                console.log("Connection shutdown");
                return res.status(404).json({error:'No workers found with that name'})
            }  
            
        }catch(error){
            await mongoose.connection.close();
            console.log('Connection shutdown');
            return res.status(400).json({error:error.message});
        }


    case "POST":
        
        try {

            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // if(!emailRegex.test(email)){
            //     return res.status(400).json({error: 'Invalid email'})
            // }

            const {name, password, age, email, rating} = req.body;
            const existedWorker = await Worker.findOne({
                email:{$regex: `${email}`, $options: "i"},
                name: name
            });
            if(existedWorker){
                return res
                .status(400)
                .json({error: "Email and name already used"})
            };

            const newType = new Type({
                name: req.body.type
            });


            const newWorker = new Worker({name, password, age, email, rating})
            const saveWorker = await newWorker.save();
            return res.status(201).json(saveWorker); //201 es el objeto nuevo que se ha creado en el backend
    
        }catch(error){
            res.status(400).json({error:error.message});

        }finally {
            await mongoose.connection.close();
            console.log('Connection shutdown');
        }
        


    // default:
    //     return res.status(400).json({error:'not found'});
   }

   
}