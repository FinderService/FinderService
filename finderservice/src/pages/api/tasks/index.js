import { dbConnect } from "@/utils/mongoose";

dbConnect()

export default function handler(req,res){
    res.status(200).json('Connected to db')
}
