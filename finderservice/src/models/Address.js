import { Schema, model, models } from "mongoose";

var addressSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      unique: true,
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
