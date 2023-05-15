import { dbConnect } from "@/utils/mongoose";
import Type from '@/models/Type.js'
import mongoose from "mongoose";

export default async function handler(req, res){
    await dbConnect();

    switch (req.method) {
        case "GET":

        try{

            const typeWorker = await Type.find();
            if (typeWorker.length !== 0) {
                return res
                .status(200)
                .json(typeWorker)

            }else{

                await mongoose.connection.close();
                console.log("Connection shutdown");
                return res.status(404).json({error: "Not exist that workers type"});
            }

        }catch(error){

        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(400).json({ error: error.message });
        }

        default:
            
        await mongoose.connection.close();
        console.log("Connection shutdown");
        res.status(404).json({ error: "request do not exist" });
        break;
    }

}