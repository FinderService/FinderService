import { dbConnect } from "@/utils/mongoose";
import Worker from "@/models/Worker.js";
import JobPostulation from "@/models/JobPostulation.js";
import JobRequest from "@/models/JobRequest.js";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const jobApply = await JobPostulation.find({})
          .populate("jobrequest", "name employer")
          .populate("worker", "-_id name type");

        if (jobApply.length !== 0) {
          return res.status(200).json(jobApply);
        } else {
          await mongoose.connection.close();
          console.log("Connection shutdown");
          return res
            .status(404)
            .json({ error: "No se encontraron postulaciones" });
        }
      } catch (error) {
        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        

        const jobPostWorker = await Worker.findOne({
          name: req.body.worker.name,
        });

        if (!jobPostWorker) {
          return res.status(400).json({ error: "Worker not found" });
        }

      
            const {name, phone, salary, message, state} = req.body

            jobPostWorker = await Worker.findOne({
                name:req.body.worker.name,
            })

            if(!jobPostWorker){
                return res.status(400).json({error:'Worker not found'})
            }

            const jobPostRequest = await JobRequest.findOne({
                name:req.body.jobrequest.name,
                employer:req.body.jobrequest.employer
            })

            if(!jobPostRequest){
                return res.status(400).json({error:'Job request not found'})
            }

            const newJobPostulation = new JobPostulation({
                jobrequest:[jobPostRequest._id],
                worker:[jobPostWorker._id],
                name,
                phone,
                salary,
                message,
                state,
              });

            const saveJobPostulation = await newJobPostulation.save();
            const jobPostulationPost = await JobPostulation.findById(
                saveJobPostulation._id
            ).populate("jobrequest")
             .populate("worker", "-_id name type")
            await mongoose.connection.close();
            console.log("Connection shutdown");
            return res.status(201).json(jobPostulationPost);



       

        const jobPostRequest = await JobRequest.findOne({
          name: req.body.jobrequest.name,
          employer: req.body.jobrequest.employer,
        });


        if (!jobPostRequest) {
          return res.status(400).json({ error: "Job request not found" });
        }

        const newJobPostulation = new JobPostulation({
          jobrequest: [jobPostRequest._id],
          worker: [jobPostWorker._id],
          duration,
          salary,
          message,
          state,
        });

        const saveJobPostulation = await newJobPostulation.save();
        const jobPostulationPost = await JobPostulation.findById(
          saveJobPostulation._id
        )
          .populate("jobrequest")
          .populate("worker", "-_id name type");
        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(201).json(jobPostulationPost);

      } catch (error) {
        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(400).json({ error: error.message });
      }
  }
}
