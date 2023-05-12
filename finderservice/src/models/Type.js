import { Schema, model} from "mongoose";

const typeSchema = new Schema(
  {
    name: String,
  },
  { timestamps: false, versionKey: false }
);

export default model("Type", typeSchema);
