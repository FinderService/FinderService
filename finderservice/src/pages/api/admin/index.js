import Worker from "../../../models/Worker.js";
import Employer from "../../../models/Employer.js";
import { dbConnect, dbDisconnect } from "../../../utils/mongoose.js";
import { converter } from "../../../utils/converter.js";
import { getSession } from "next-auth/reactº";

const session = await getSession({req});
console.log(session)

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        const dataWorker = await Worker.find({});
        const dataEmployer = await Employer.find({});
        await dbDisconnect();
        const data = [
          ...converter(dataWorker, "W"),
          ...converter(dataEmployer, "E"),
        ];
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
    case "POST": {
      res.json({ POST: "succees" });
    }
  }
}
