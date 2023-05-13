import { dbConnect } from "@/utils/mongoose";
import Worker from '@/models/Worker.js'
import mongoose from "mongoose";

export default async function handler(req, res){

    await dbConnect();

   switch(req.method) {
    
    case "GET":

        const {name} = req.query;

        try{    

            const workername = name?
                await Worker.find({
                name: { $regex: `${name}`, $options: "i" },
                })
                : await Worker.find({});

            if(workername.length!==0) res.status(200).json(workername)
            else{res.status(404).json({error:'No employers found with that name'})}  
            
        }catch(error){
            res.status(400).json({error:error.message});
        }finally {
            await mongoose.connection.close();
            console.log('Connection shutdown');
        }


    case "POST":
        
        try {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const {name, password, age, email, rating} = req.body;

            if(!emailRegex.test(email)){
                return res.status(400).json({error: 'Invalid email'})
            }

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