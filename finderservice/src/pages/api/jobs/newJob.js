import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Job from "../../../models/Job";
import JobPostulation from "../../../models/JobPostulation";
import JobRequest from "@/models/JobRequest";

export default async function newJob(req, res) {
  await dbConnect();
  try {
    const { jobrequestId, jobpostulationId, workerId, employerId } = req.body;
    console.log(req.body)
    const newJob = new Job({
      jobrequest: jobrequestId,
      jobpostulation: jobpostulationId,
      worker: workerId,
      employer: employerId,
      statejob: "working",
    });
    if (newJob) {
      await newJob.save();
      let updateJobPostulation = await JobPostulation.findOneAndUpdate(
        {
          _id: jobpostulationId,
        },
        {
          $set: { state: "accepted" },
        },
        { new: true }
      );

      let updateOtherJobPostulations = await JobPostulation.findOneAndUpdate(
        {
          jobrequest: jobrequestId,
          state: { $ne: "accepted" },
        },
        { $set: { state: "declined" } },
        { new: true }
      );
      let updateJobRequest = await JobRequest.findOneAndUpdate(
        {
          _id: jobrequestId,
        },
        {
          $set: { state: "accepted" },
        },
        { new: true }
      );

      

      await dbDisconnect();
      return res.status(200).json({
        success: true,
        msg: "Se ha aceptado la postulación exitosamente",
        newJob,
        updateJobPostulation,
        updateOtherJobPostulations,
        updateJobRequest
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
