import { Schema, model, models } from "mongoose";

var jobSchema = new Schema(
  {
    jobrequest: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobRequest",
      },
    ],
    jobpostulation: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobPostulation",
      },
    ],
    worker: [
      {
        type: Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    employer: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employer",
      },
    ],
    statejob: String,
    reviewWorker: String,
    reviewEmployer: String,
    ratingWorker: String,
    ratingEmployer: String,
  },
  { timestamps: false, versionKey: false }
);

var Job = models.Job || model("Job", jobSchema);
module.exports = Job;
