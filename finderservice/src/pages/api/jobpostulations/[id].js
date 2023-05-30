import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import JobPostulation from "@/models/JobPostulation.js";


export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const JobPostulationId = await JobPostulation.findById(id);
        if (!JobPostulationId){
          await dbDisconnect();
          return res.status(404).json({ error: " Job postulation not found" });
        }
        await dbDisconnect();
        return res.status(200).json(JobPostulationId);

      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    case "DELETE":
      try {
        const deleteJobPostulation = await JobPostulation.findByIdAndDelete(id);
        if (!deleteJobPostulation){
          await dbDisconnect();
          return res.status(404).json({ error: " Job postulation not found" });
        }
        await dbDisconnect();
        return res.status(204).json();

      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    default:
      await dbDisconnect();
      res.status(404).json({ error: "request do not exist" });
      break;
  }
}
