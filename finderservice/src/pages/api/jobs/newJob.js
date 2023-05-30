import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Job from "../../../models/Job";

export default async function newJob(req, res) {
  await dbConnect();
  try {
    const { jobrequestId, jobpostulationId, workerId, employerId } = req.body;
    const newJob = new Job({
      jobrequest: jobrequestId,
      jobpostulation: jobpostulationId,
      worker: workerId,
      employer: employerId,
      statejob: "working",
    });
    if (newJob) {
      await dbDisconnect();
      return res.status(200).json({
        success: true,
        msg: "Se ha creado el job exitosamente",
        newJob,
      });
    } else {
      await dbDisconnect();
      return res.status(400).json({
        success: false,
        msg: "Ha ocurrido un error inesperado",
        error: error,
      });
    }
  } catch (error) {
    console.log(error);
    await dbDisconnect();
    return res.status(400).json({ success: false, error: error });
  }
}
