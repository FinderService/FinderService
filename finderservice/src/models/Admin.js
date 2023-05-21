import { Schema, model, models } from "mongoose";

var adminSchema = new Schema(
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
    profile: {
      type: String,
      default: 'admin',
    }
  },
  { timestamps: false, versionKey: false }
);

var Admin = models.Admin || model("Admin", adminSchema);
module.exports = Admin;
