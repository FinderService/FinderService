import { Schema, model, models } from "mongoose";

var addressSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      unique: [true, "That address is already in the database"]
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
  },
  { timestamps: false, versionKey: false }
);

var Address = models.Address || model("Address", addressSchema);
module.exports = Address;
