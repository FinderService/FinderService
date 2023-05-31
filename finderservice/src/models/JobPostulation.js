import { Schema, model, models } from "mongoose";

var jobPostulationSchema = new Schema(
  {
    jobrequest: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobRequest",
      },
    ],
    worker: [
      {
        type: Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    salary: Number,
    message: String,
    state: {
      type: String,
      default:"pending"
    }
    // state: String,
  },
  { timestamps: false, versionKey: false }
);

var JobPostulation =
  models.JobPostulation || model("JobPostulation", jobPostulationSchema);
module.exports = JobPostulation;
