import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import Address from "../../../models/Address";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        let { name } = query;
        const nameTrimmed = name.trim();
        console.log(name)
        const response = name
          ? await Employer.find({
              name: { $regex: `${nameTrimmed}`, $options: "i" },
            }).populate("address", "-_id name city")
          : await Employer.find({}).populate("address", "-_id name city");
        if (response.length === 0) {
          await dbDisconnect();
          return res.status(404).json({
            error: `No se encontraron empleados con el nombre ${nameTrimmed}`,
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
        const { name, password, age, email, profilepic, address } = body;

        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
          await dbDisconnect();
          return res.status(400).json({
            error: "El correo ya está en uso, por favor inicie sesión",
          });
        }

        const newAddress = new Address({
          name: address[0].name,
          city: address[0].city,
        });

        const validationError2 = await newAddress.validateSync();
        if (validationError2) {
          return res
            .status(500)
            .json(
              validationError2.errors[Object.keys(validationError2.errors)[0]]
                .message
            );
        }

        const saveAddress = await newAddress.save();

        const newEmployer = new Employer({
          name,
          password,
          age,
          email,
          profilepic,
          address: [saveAddress._id],
        });

        const validationError = await newEmployer.validateSync();
        if (validationError) {
          return res
            .status(500)
            .json(
              validationError.errors[Object.keys(validationError.errors)[0]]
                .message
            );
        }

        const savedEmployer = await newEmployer.save();

        const employerWithAddress = await Employer.findById(
          savedEmployer._id
        ).populate("address", "-_id name city");

        await dbDisconnect();
        return res.status(201).json(employerWithAddress);
      } catch (error) {
        await dbDisconnect();
        if (error.message.includes("E11000")) {
          return res
            .status(400)
            .json({ error: "Ya existe una dirección igual" });
        }
        return res.status(400).json({ error: error.message });
      }

    default:
      await dbDisconnect();
      res
        .status(404)
        .json({ error: "La petición HTTP no existe en la base de datos" });
      break;
  }
}
