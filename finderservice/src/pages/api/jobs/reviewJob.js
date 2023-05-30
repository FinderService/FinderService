import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Job from "../../../models/Job";

export default async function reviewJob(req, res) {
  await dbConnect();
  try {
    const {
      jobId,
      reviewWorker,
      reviewEmployer,
      ratingWorker,
      ratingEmployer,
    } = req.body;

    let jobDb = await Job.find(jobId);

    if (!jobDb) {
      await dbDisconnect();
      return res.status(404).json({
        success: false,
        error: error,
        msg: "No se encontró el servicio en la base de datos",
      });
    }

    if (jobDb) {
      if (reviewWorker && ratingWorker) {
        let updateJob = await Job.updateOne(
          { _id: jobId },
          {
            $set: { reviewWorker: reviewWorker, ratingWorker: ratingWorker },
          }
        );
        let updateWorkerReview = await Worker.updateOne({});
      }
    }
  } catch (error) {
    await dbDisconnect();
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
}
