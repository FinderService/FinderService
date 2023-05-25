import Worker from "../../../models/Worker.js";
import Employer from "../../../models/Employer.js";
import Admin from "../../../models/Admin.js";
import { getSession } from "next-auth/react";
import { dbConnect, dbDisconnect } from "../../../utils/mongoose.js";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
 

  const session = await getSession({ req });
  const user = session === null ? "Not auth" : session.user.email;
  await dbConnect();

  const auth = async () => {
    const dataAdmin = await Admin.find({});
    return dataAdmin.some(
      (x) => x.email === user[0].toUpperCase() + user.substring(1)
    );
  };

  const allowUser = await auth();
  if(!allowUser) return res.status(401).json({auth:'failed'});

  switch (method) {
    case "GET": {
      const foundWorker = await Worker.findById(id);
      const foundEmployer = await Employer.findById(id);
      const foundUser = foundWorker ? foundWorker : foundEmployer;
      await dbDisconnect();
      return res.json(foundUser);
    }
    case "PUT": {
      try {
        const model = req.body.profile === "worker" ? Worker : Employer;

        await model.updateOne({ _id: id }, { $set: req.body });
        await dbDisconnect();
        return res.status(200).json({ status: "Changed" });
      } catch (error) {
        await dbDisconnect();
        return res.status(404).json({ status: "Error", err: error });
      }
    }
    case "DELETE": {
      try {
        await Worker.findByIdAndDelete(id);
        await Employer.findByIdAndDelete(id);
        await dbDisconnect();
        return res.status(200).json({ status: "Deleted" });
      } catch (error) {
        await dbDisconnect();
        res.status(404).json({ error: "User Not Found!" });
      }
    }
    default: {
      return res.status(404).json({ method: "Not Found" });
    }
  }
}
