import { Schema, model} from "mongoose";

const employerSchema = new Schema(
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
    },
    rating: {
      type: Decimal128,
    },
    address:[{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }],
  },
  { timestamps: false, versionKey: false }
);

export default model('Employer', employerSchema)