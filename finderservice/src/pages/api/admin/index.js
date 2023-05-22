import Worker from "../../../models/Worker.js";
import Employer from "../../../models/Employer.js";
import Admin from "../../../models/Admin.js";
import { dbConnect, dbDisconnect } from "../../../utils/mongoose.js";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const user = session === null ? "No user" : session.user.email;

  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        const dataAdmin = await Admin.find({});
        if (
          !dataAdmin.some(
            (x) => x.email === user[0].toUpperCase() + user.substring(1)
          )
        ) {
          res.status(402).json({ authorization: "No Auth" });
        }

        const dataWorker = await Worker.find({});
        const dataEmployer = await Employer.find({});
        await dbDisconnect();
        const data = [...dataWorker, ...dataEmployer];
        if (data.length == 0)
          return res
            .status(400)
            .json({ Status: "No existen los Worker , tampoco los Employers" });
        return res.status(200).json(data);
      } catch {
        return res
          .status(404)
          .json({ error: "Algo salio mal al momento de hacer la peticion" });
      }
    }
    default: {
      return res.status(404).json({ method: "Not Found" });
    }
  }
}
