import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import Address from "../../../models/Address";
import mongoose from "mongoose";

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
        const response = await Employer.findById(id).populate(
          "address",
          "-_id name city"
        );
        if (!response) {
          return res
            .status(404)
            .json({ error: "No se encontró el empleado con esa id" });
        } else {
          await dbDisconnect();
          return res.status(200).json(response);
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
      break;
    case "PUT":
      try {
        const employerToUpdate = await Employer.findById(id);
        if (!employerToUpdate) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontró al empleado con ese id" });
        }

        const { name, city } = body.address;

        const updateAddress = await Address.findOneAndUpdate(
          {
            _id: employerToUpdate.address,
          },
          {
            $set: { name, city },
          },
          { new: true }
        );

        const updatedEmployer = await Employer.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...body,
              address: updateAddress._id,
            },
          },
          { new: true }
        ).populate("address", "-_id name city");

        await dbDisconnect();
        return res.status(200).json(updatedEmployer);
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const employerToDelete = await Employer.findById(id);
        await Employer.findByIdAndDelete(id);
        await Address.findByIdAndDelete(employerToDelete.address)

        if (!employerToDelete) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontró el empleado con ese id" });
        } else {
          await dbDisconnect();
          return res
            .status(200)
            .json("Se ha borrado al empleado con ese id");
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

      break;
    default:
      await dbDisconnect();
      return res.status(404).json({ error: "La petición HTTP no existe en la base de datos" });
  }
}
