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
          await dbDisconnect();
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

        const employerDb = await Employer.findById(employerid);

        const validationAddress = await newAddress.validateSync();
        if (validationAddress) {
          dbDisconnect();
          return res.status(400).json({
            error:
              validationAddress.errors[Object.keys(validationAddress.errors)[0]]
                .message,
          });
        }
        const typeJob = await Type.findOne({ name: type });
        if (!typeJob) {
          dbDisconnect();
          return res.status(404).json({
            error: "No se encontró el tipo de trabajo en la base de datos",
          });
        }
        const newJobRequest = new JobRequest({
          name,
          date,
          description,
          photo,
          employer: employerDb._id,
          type: typeJob._id,
          address: newAddress._id,
        });

        if (!validationAddress) {
          const savedAddress = await newAddress.save();
          newJobRequest.address = [savedAddress._id];
          const savedJobRequest = await newJobRequest.save();

          const jobRequestComplete = await JobRequest.findById(
            savedJobRequest._id
          )
            .populate("employer", "-_id name email")
            .populate("address", "-_id name city")
            .populate("type", "-_id name");
          await dbDisconnect();
          return res.status(201).json(jobRequestComplete);
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
  }
}
