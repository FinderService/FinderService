import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      try {
        const response = await Jobs.find({})
          .populate("jobpostulation")
          .populate("jobrequest");
          if (!response){
            return res.status(404).json({error: 'No se encontraron trabajos'})
          }
      } catch (error) {
        await dbDisconnect();
      }
  }
}
