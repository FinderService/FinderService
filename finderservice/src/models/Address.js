import { Schema, model, models } from "mongoose";

var addressSchema = new Schema(
  {
    id_usuario: {
      type: String,
      required: [true, "Address is required"],
    },
    name: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      unique: [true, "That address is already in the database"],
    },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false }
);

var Address = models.Address || model("Address", addressSchema);
module.exports = Address;
