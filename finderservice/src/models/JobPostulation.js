import { Schema, model} from "mongoose";

const jobPostulationSchema = new Schema(
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
    state: String,
    message: String,
  },
  { timestamps: false, versionKey: false }
);

export default model("JobPostulation", jobPostulationSchema);
