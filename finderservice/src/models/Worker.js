import { Schema, model, models} from "mongoose";

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
    salt: {
      type: String,
    },
    validator: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    }
   
  },
  { timestamps: false, versionKey: false }
);

var Worker = models.Worker || model("Worker", workerSchema);
module.exports = Worker;