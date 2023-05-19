import { Schema, model, models } from "mongoose";

const workerSchema = new Schema(
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
      type: Date,
      require: [true, "La fecha de nacimiento es requerida"],
    },
    age: Number,
    email: {
      type: String,
      require: [true, "El correo es requerido"],
    },
    phonenumber: {
      type: Number,
    },
    profilepic: {
      type: String,
      default: 'https://res.cloudinary.com/dacl2du1v/image/upload/v1684330929/userAvt_tkcm8u.png'
    },
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Type",
      },
    ],
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
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
    },
    reviews: {
      type: Array,
      description: String,
    },
    phone: Number,
  },
  { timestamps: false, versionKey: false }
);

var Worker = models.Worker || model("Worker", workerSchema);
module.exports = Worker;
