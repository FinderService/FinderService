import { Schema, model, models } from "mongoose";

var adminSchema = new Schema(
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
    email: {
      type: String,
      require: [true, "El correo es requerido"],
    },
    profilepic: {
      type: String,
      default:
        "https://res.cloudinary.com/dacl2du1v/image/upload/v1684330929/userAvt_tkcm8u.png",
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
    phone: Number,
    profile: {
      type: String,
      default: "admin",
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false }
);

var Admin = models.Admin || model("Admin", adminSchema);
module.exports = Admin;
