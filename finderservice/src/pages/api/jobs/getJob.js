import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Job from "@/models/Job";

export default async function getJob(req, res) {
  await dbConnect();
  try {
    const { idWorker } = req.query;
    let response = [];

    console.log(idWorker)
    if (idWorker) {
      response = await Job.find({
        worker: idWorker,
      })
        .populate("worker", "name email")
        .populate("employer", "name email")
        .populate("jobrequest", "title")
        .populate("jobpostulation", "title");
    } else if(!idWorker) {
      response = await Job.find({})
        .populate("worker", "name email")
        .populate("employer", "name email")
        .populate("jobrequest", "title")
        .populate("jobpostulation", "title");
    }
    

    if (!response) {
      await dbDisconnect();
      res
        .status(404)
        .json({ success: false, msg: "No se encontró trabajos activos" });
    }
    await dbDisconnect();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
}
