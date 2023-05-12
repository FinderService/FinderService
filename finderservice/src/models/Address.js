import { Schema, model} from "mongoose";

const addressSchema = new Schema(
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
    }
  },
  { timestamps: false, versionKey: false }
);

export default model('Address', addressSchema)