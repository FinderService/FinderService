import Worker from "../../../models/Worker.js";
import Employer from "../../../models/Employer.js";
import Admin from "../../../models/Admin.js";
import { getSession } from "next-auth/react";
import { dbConnect, dbDisconnect } from "../../../utils/mongoose.js";

export default async function handler(req, res) {
  const { method } = req;
  const { body } = req;
  const { id } = req.query;
  const model = body.profile === "worker" ? Worker : Employer;
  console.log(model)
  const session = await getSession({ req });
  const user = session === null ? "No user" : session.user.email;

  await dbConnect();

  switch (method) {
    case "PUT": {
      try {
        const dataAdmin = await Admin.find({});
        if (
          !dataAdmin.some(
            (x) => x.email === user[0].toUpperCase() + user.substring(1)
          )
        ) {
          res.status(402).json({ authorization: "No Auth" });
        }
        const model = body.profile == "worker" ? Worker : Employer;
        const updateModel = await model.updateOne(
          { _id: id },
          {
            $set: body,
          }
        );
        
        await dbDisconnect();
        return res.status(200).json({ status: "Changed", user: updateModel });
      } catch (error) {
        await dbDisconnect();
        return res.status(404).json({ status: "Error", err: errro });
      }
    }
    case "DELETE": {
      try {
       await Worker.findByIdAndDelete(id);
       await Employer.findByIdAndDelete(id);
      await dbDisconnect();
        
        return res.status(200).json({ status: data });
      } catch (error) {
        await dbDisconnect();
        res.status(404).json({ error: "User Not Found!", numId: id });
      }
    }
  }
}
