import Worker from "../../../models/Worker.js";
import Employer from "../../../models/Employer.js";
import { dbConnect, dbDisconnect } from "../../../utils/mongoose.js";

export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;
  const { body } = req;
  const model = body.category == "W" ? Worker : Employer;

  await dbConnect();

  switch (method) {
    case "PUT": {
      try {
        const updateModel = await model.updateOne(
          { _id: id },
          {
            $set: body,
          }
        );
        await dbDisconnect();
        res.status(200).json({ status: "Changed", user: updateModel });
      } catch (error) {
        return res.status(404).json({ status: "Error", err: errro });
      }
    }
    case "DELETE": {
      try {
        await Model.findByIdAndDelete(id);
        await dbDisconnect();
        return res.status(200).json({ status: "Succes" });
      } catch (error) {
        await dbDisconnect();
        res.status(404).json({ error: "User Not Found!", numId: id });
      }
    }
  }
}
