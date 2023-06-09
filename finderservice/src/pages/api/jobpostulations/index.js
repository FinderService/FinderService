import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker.js";
import JobPostulation from "@/models/JobPostulation.js";
import JobRequest from "@/models/JobRequest.js";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { idWorker } = req.query;
        let response;
        if (idWorker) {
          response = await JobPostulation.find({
            worker: idWorker,
          })
            .populate({
              path: "jobrequest",
              select: "title employer type description date address",
              populate: [
                {
                  path: "type",
                  select: "name",
                },
                {
                  path: "employer",
                  select: "name profilepic",
                },
                {
                  path: "address",
                  select: "country state city street zipCode"
                }
              ],
            })
            .populate({
              path: "worker",
              select: "_id name email type",
              populate: {
                path: "type",
                select: "name",
              },
            })
           
        } else {
          response = await JobPostulation.find({})
          .populate({
            path: "jobrequest",
            select: "title employer type description date address",
            populate: [
              {
                path: "type",
                select: "name",
              },
              {
                path: "employer",
                select: "name profilepic",
              },
              {
                path: "address",
                select: "country state city street zipCode"
              }
            ],
          })
          .populate({
            path: "worker",
            select: "_id name email type",
            populate: {
              path: "type",
              select: "name",
            },
          })
            
        }

        if (response) {
          await dbDisconnect();
          return res.status(200).json(response);
        } else {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontraron postulaciones" });
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        // if (!req.body.worker || !req.body.worker.name) {
        //     return res.status(400).json({ error: "Worker name is missing" });
        //   }

        const { workerEmail, jobrequest, salary, message } = req.body;

        if (!workerEmail) {
          await dbDisconnect();
          return res.status(400).json({ error: "Worker email is missing" });
        }

        const jobPostWorker = await Worker.findOne({ email: workerEmail });

        if (!jobPostWorker) {
          await dbDisconnect();
          return res.status(400).json({ error: "Worker not found" });
        }

        const jobPostRequest = await JobRequest.findOne({
          _id: jobrequest,
        });

        if (!jobPostRequest) {
          await dbDisconnect();
          return res.status(400).json({ error: "Job request not found" });
        }
        const jobPostAlready = await JobPostulation.findOne({
          jobrequest: jobrequest,
          worker: jobPostWorker,
        });
        console.log(jobPostAlready);

        if (jobPostAlready) {
          await dbDisconnect();
          return res.status(400).json({
            success: false,
            msg: "Ya hiciste una postulación a ese trabajo",
          });
        }

        const newJobPostulation = new JobPostulation({
          jobrequest: [jobPostRequest._id],
          worker: [jobPostWorker._id],
          salary,
          message,
        });

        const saveJobPostulation = await newJobPostulation.save();
        const jobPostulationPost = await JobPostulation.findById(
          saveJobPostulation._id
        ).populate("jobrequest", "title employer");
        await dbDisconnect();
        return res.status(201).json(jobPostulationPost);
      } catch (error) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
  }
}
