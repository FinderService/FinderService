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
    age: {
      type: Number,
      required: [true, "La edad es requerida"],
    },
    email: {
      type: String,
      require: [true, "El correo es requerido"],
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
