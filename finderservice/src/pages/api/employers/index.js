import { dbConnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import Address from "../../../models/Address";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { name } = req.query;
        const response = name
          ? await Employer.find({
              name: { $regex: `${name}`, $options: "i" },
            })
          : await Employer.find({});
        if (response.length === 0) {
          res.status(404).json({ error: "No employers found with that name" });
        } else {
          res.status(200).json(response);
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const { name, password, age, email, profilepic } = req.body;

        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
          return res
            .status(400)
            .json({ error: "Email already in use, please loggin" });
        }

        const newAddress = new Address({
          name: req.body.address.name,
          city: req.body.address.city,
        });
        const validationError2 = newAddress.validateSync();
        if (validationError2) {
          throw new Error(
            validationError2.errors[
              Object.keys(validationError2.errors)[0]
            ].message
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
        const validationError = newEmployer.validateSync();
        if (validationError) {
          throw new Error(
            validationError.errors[
              Object.keys(validationError.errors)[0]
            ].message
          );
        }

        const savedEmployer = await newEmployer.save();
        const employerWithAddress = await Employer.findById(
          savedEmployer._id
        ).populate("address", "-_id name city");
        res.status(201).json(employerWithAddress);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

    default:
      res.status(404).json({ error: "request do not exist" });
      break;
  }

  await mongoose.connection.close();
  console.log("Conecction shutdown");
}
