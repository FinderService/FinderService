import { dbConnect } from "@/utils/mongoose";


dbConnect()

export default async function handler(req,res){
   switch(req.method) {
    
    case "GET":
        const worker = await Worker.find();
        return res.status(200).json(worker);
       

    case "POST":
        const newWorker = new Worker(req.body)
        const saveWorker = await newWorker.save();
        return res.status(201).json(saveWorker); //201 es el objeto nuevo que se ha creado en el backend



    default:
        return res.status(400).json({error:'not found'});
   }

   

}

