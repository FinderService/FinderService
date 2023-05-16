import { dbConnect } from "@/utils/mongoose";
import Worker from '@/models/Worker.js'
import mongoose from "mongoose";

export default async function handlerId(req, res){

    await dbConnect();

    const {id} = req.query

    switch(req.method){

        case "GET":

        try{

            const workerId = await Worker.findById(id);
            if(!workerId) return res.status(404).json({error:' worker not found'});
            return res.status(200).json(workerId);


        }catch(error){
            await mongoose.connection.close();
            console.log('Connection shutdown');
            return res.status(400).json({error:error.message});

        }

        case "PUT":

            try{
        
                const updateWorker = await Worker.findByIdAndUpdate(id, req.body, {
                    new: true,
                });

                if(!updateWorker) return res.status(404).json({error:' worker not found'});
                return res.status(200).json();
        
            }catch(error){
                await mongoose.connection.close();
                console.log('Connection shutdown');
                return res.status(400).json({error:error.message});
        
            }

        case "DELETE":

            try{

                const deleteWorker = await Worker.findByIdAndDelete(id);
                if(!deleteWorker) return res.status(404).json({error:' worker not found'});
                return res.status(204).json();

            }catch(error){
                await mongoose.connection.close();
                console.log('Connection shutdown'); 
                return res.status(400).json({error:error.message});

            }

        default:
            await mongoose.connection.close();
            console.log("Connection shutdown");
            res.status(404).json({ error: "request do not exist" });
            break;

    }
   



}

