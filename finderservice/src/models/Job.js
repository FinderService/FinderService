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
    statejob: String,
    reviewworker: String,
    reviewemployer: String,
    ratingworker: String,
    ratingemployer: String,
  },
  { timestamps: false, versionKey: false }
);

var Job = models.Job || model("Job", jobSchema);
module.exports = Job;
