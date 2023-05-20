import { Schema, model, models } from "mongoose";

var employerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
    },
    birthdate: {
      type: Number,
      required: [true, "La fecha de nacimiento es requerida"],
    },
    age: Number,
    email: {
      type: String,
      require: [true, "El correo es requerido"],
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
    salt: {
      type: String,
    },
    validator: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: String,
      description: String,
    },
    phone: Number,
  },
  { timestamps: false, versionKey: false }
);
var Employer = models.Employer || model("Employer", employerSchema);
module.exports = Employer;
