import { Schema, model} from "mongoose";

const workerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      require: [true, "Age is required"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
    },
    rating: {
      type: String,
    },
   
  },
  { timestamps: false, versionKey: false }
);

export default model('Worker', workerSchema)