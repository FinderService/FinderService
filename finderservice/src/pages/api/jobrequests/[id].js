import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import JobRequest from "../../../models/JobRequest";
import Type from "../../../models/Type";
import Address from "../../../models/Address";
import Employer from "../../../models/Employer";

export default async function handler(req, res) {
  await dbConnect();
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const response = await JobRequest.findById(id)
          .populate(
            "employer",
            "_id name email age rating profilepic phone state"
          )
          .populate("address", "_id name street state country zipCode city ")
          .populate("type", "name")
        if (!response) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontró la petición con esa ID" });
        } else {
          await dbDisconnect();
          return res.status(200).json(response);
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    case "PUT":
      try {
        const jobRequestToUpdate = await JobRequest.findById(id);

        if (!jobRequestToUpdate) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontró la petición de trabajo" });
        }

        const updateJobRequest = await JobRequest.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              ...body,
            },
          },
          { new: true }
        )
          .populate("employer", "-_id name email")
          .populate("address", "-_id name city")
          .populate("type", "-_id name");

        await dbDisconnect();
        return res.status(200).json(updateJobRequest);
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

    
      case "DELETE":
        try {
          const jobRequestToDelete = await JobRequest.findById(id);
          
          if (!jobRequestToDelete) {
            await dbDisconnect();
            return res
              .status(404)
              .json({ error: "No se encontró la solicitud con ese id" });
          } else {
            await JobRequest.findByIdAndDelete(id);
            await dbDisconnect();
            return res.status(200).json("Se ha borrado la solicitud de trabajo");
          }
        } catch (error) {
          await dbDisconnect();
          return res.status(400).json({ error: error.message });
        }
      default:
        await dbDisconnect();
        return res.status(404).json({ error: "La petición HTTP no es correcta" });
    }
}
