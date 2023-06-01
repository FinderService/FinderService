import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Job from "@/models/Job";

export default async function getJob(req, res) {
  await dbConnect();
  try {
    const { idRequest, idPostulation } = req.query;
    let response = await Job.find({
      jobrequest: idRequest,
      jobpostulation: idPostulation,
    });

    let idJob = response[0]._id


    if (!response) {
      await dbDisconnect();
      res.status(404).json({ success: false, error: "No se encontró" });
    }
    await dbDisconnect();
    res.status(200).json(idJob);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
}
