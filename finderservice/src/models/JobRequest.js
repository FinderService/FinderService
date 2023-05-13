import { Schema, model, models } from "mongoose";

var jobRequestSchema = new Schema(
  {
    employer: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employer",
      },
    ],
    date: Date,
    description: String,
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Type",
      },
    ],
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    duration: String,
    salary: String,
  },
  { timestamps: false, versionKey: false }
);

var JobRequest = models.JobRequest || model("JobRequest", jobRequestSchema);
module.exports = JobRequest;
