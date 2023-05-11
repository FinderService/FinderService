import { Schema, model} from "mongoose";

const jobRequestSchema = new Schema(
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

export default model("JobRequest", jobRequestSchema);
