import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Job from "@/models/Job";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";

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

    const statejob = "Done";

    let jobDb = await Job.findById(jobId);
    //console.log('job: ', jobDb.worker);

    if (!jobDb) {
      await dbDisconnect();
      return res.status(404).json({
        success: false,
        msg: "No se encontró el servicio en la base de datos",
      });
    }

    if (jobDb) {
      if (reviewWorker && ratingWorker) {
        let updateJob = await Job.updateOne(
          { _id: jobId },
          {
            $set: { reviewWorker, ratingWorker, statejob },
          }
        );

        // primero la data del user
        let workerId = jobDb.worker;
        let worker = await Worker.findById(workerId);

        // ahora todos los jobs del user
        let jobs = await Job.find({ worker: worker._id });

        // sacamos las calificaciones de los jobs
        let rating = 0;
        let totalJobs = 0;
        jobs.map((j) => {
          rating += isNaN(j.ratingEmployer) ? 0 : Number(j.ratingEmployer);
          totalJobs++;
        });

        let finalRating = Math.ceil(rating / totalJobs);

        let updateWorker = await Worker.updateOne(
          { _id: worker._id },
          {
            $set: { rating: Math.floor(finalRating) },
          }
        );

        if (updateJob && updateWorker) {
          return res
            .status(200)
            .json({
              success: true,
              msg: "Se guardo la reseña satisfactoriamente",
            });
        }

        throw new Error("Algo sali mal, inténtalo más tarde");

        //let updateWorkerReview = await Worker.updateOne({});
      }

      if (reviewEmployer && ratingEmployer) {
        let updateJob = await Job.updateOne(
          { _id: jobId },
          {
            $set: { reviewEmployer, ratingEmployer, statejob },
          }
        );

        // primero la data del user
        let employerId = jobDb.employer;
        let employer = await Employer.findById(employerId);

        // ahora todos los jobs del user
        let jobs = await Job.find({ employer: employer._id });

        // sacamos las calificaciones de los jobs
        let rating = 0;
        let totalJobs = 0;
        jobs.map((j) => {
          rating += isNaN(j.ratingEmployer) ? 0 : Number(j.ratingEmployer);
          totalJobs++;
        });

        let finalRating = Math.ceil(rating / totalJobs);

        let updateEmployer = await Employer.updateOne(
          { _id: employer._id },
          {
            $set: { rating: finalRating },
          }
        );

        if (updateJob && updateEmployer) {
          return res
            .status(200)
            .json({
              success: true,
              msg: "Se guardó la reseña satisfactoriamente",
            });
        }

        throw new Error("Algo salió mal, inténtalo más tarde");
        //let updateEmployerReview = await Worker.updateOne({});
      }
    }
  } catch (error) {
    await dbDisconnect();
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
}
