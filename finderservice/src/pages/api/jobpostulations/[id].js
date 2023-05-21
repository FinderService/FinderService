import { dbConnect } from "@/utils/mongoose";
import JobPostulation from "@/models/JobPostulation.js";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const JobPostulationId = await JobPostulation.findById(id);
        if (!JobPostulationId)
          return res.status(404).json({ error: " Job postulation not found" });
        return res.status(200).json(JobPostulationId);
      } catch (error) {
        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(400).json({ error: error.message });
      }

    case "DELETE":
      try {
        const deleteJobPostulation = await JobPostulation.findByIdAndDelete(id);
        if (!deleteJobPostulation)
          return res.status(404).json({ error: " Job postulation not found" });
        return res.status(204).json();
      } catch (error) {
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
