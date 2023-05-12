import { Schema, model,models} from "mongoose";

var typeSchema = new Schema(
  {
    name: String,
  },
  { timestamps: false, versionKey: false }
);

var Type = models.Type || model("Type", typeSchema);
module.exports = Type;
