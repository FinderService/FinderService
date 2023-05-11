import { Schema, model} from "mongoose";

const jobSchema = new Schema(
  {
    jobrequest: [{
      type: Schema.Types.ObjectId,
      ref: 'JobRequest'
    }],
    jobpostulation: [{
      type: Schema.Types.ObjectId,
      ref: 'JobPostulation',
    }],
    statejob: String,
    review: String,
  },
  { timestamps: false, versionKey: false }
);

export default model('Job', jobSchema)