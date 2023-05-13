import { Schema, model, models } from "mongoose";

var employerSchema = new Schema(
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
      unique: true
    },
    rating: {
      type: String,
    },
    profilepic: String,
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    reviews: {
      type: String,
      description: String,
    },
  },
  { timestamps: false, versionKey: false }
);
var Employer = models.Employer || model("Employer", employerSchema);
module.exports = Employer;
