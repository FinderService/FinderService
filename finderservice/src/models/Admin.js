import { Schema, model} from "mongoose";

const adminSchema = new Schema(
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
    email: {
      type: String,
      require: [true, "Email is required"],
    },
  },
  { timestamps: false, versionKey: false }
);

export default model('Admin', adminSchema)