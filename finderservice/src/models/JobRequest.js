import { Schema, model, models } from "mongoose";

var jobRequestSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Se necesita un nombre para el trabajo"],
      trim: true,
    },
    employer: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employer",
      },
    ],
    date: {
      type: Date,
      required: [true, "Se necesita una fecha para el trabajo"],
    },
    description: {
      type: String,
      required: [true, "Se necesita una breve descripción del trabajo"],
    },
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
    state: {
      type: String,
      default: "pending",
    },
  },

  { timestamps: false, versionKey: false }
);

var JobRequest = models.JobRequest || model("JobRequest", jobRequestSchema);
module.exports = JobRequest;
