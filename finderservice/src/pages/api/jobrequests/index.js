import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import JobRequest from "../../../models/JobRequest";
import Address from "../../../models/Address";
import Type from "../../../models/Type";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      try {
        const response = await JobRequest.find({})
          .populate("employer", "name _id")
          .populate("address", "name city")
          .populate("type", "name");
        if (response.length === 0) {
          return res.status(404).json({
            error: "No se encontraron peticiones de trabajo activas",
          });
        } else {
          await dbDisconnect();
          return res.status(200).json(response);
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const { name, employerid, date, description, photo, type, address } =
          body;
        const newAddress = new Address({
          name: address[0].name,
          city: address[0].city,
        });

        const validationAddress = await newAddress.validateSync();
        if (validationAddress) {
          dbDisconnect();
          return res.status(400).json({
            error:
              validationAddress.errors[Object.keys(validationAddress.errors)[0]]
                .message,
          });
        }
        const typeJob = await Type.find({ type });
        if (!typeJob) {
          return res.status(404).json({
            error: "No se encontró el tipo de trabajo en la base de datos",
          });
        }
        const newJobRequest = new JobRequest({
          name,
          date,
          description,
          photo,
          employer : employerid,
          type,
        });
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
  }
}
