import { Schema, model, models } from "mongoose";

var addressSchema = new Schema(
  {
    street: {
      type: String,
      required: [true, "Street is required"],
      trim: true,
    },
    number: {
      type: Number,
      required: [true, "Number is required"],
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
