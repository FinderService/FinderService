import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import Address from "../../../models/Address";
import { verifyPassword, encrypthPass } from "@/utils/lib";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        let { name, address } = query;
        const queryOptions = {};
        if (name) {
          queryOptions.name = { $regex: `${name}`, $options: "i" };
        }
        if (address) {
          queryOptions["address.city"] = {
            $regex: "${address}",
            $options: "id",
          };
        }
        const response = queryOptions
          ? await Employer.find(queryOptions).populate(
              "address",
              "-_id name city"
            )
          : await Employer.find({}).populate("address", "-_id name city");
        if (response.length === 0) {
          return res.status(404).json({
            error: `No se encontraron empleados con el nombre ${name}`,
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
    case "PUT":
      console.log("estoy en el put");
      try {
        const { current, newpass, userid: id, email } = req.body;
        if (!current || !newpass || !email || !id) {
          throw new Error("Datos incompletos");
        }
        console.log(req.body);
        const user = await Employer.findOne({ email }).exec();
        console.log(user);

        if (!user) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontró al empleado con ese id" });
        }

        let isValid;
        try {
          isValid = await verifyPassword(current, user.password, user.salt);
        } catch (error) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ success: false, msg: "Contraseña incorrecta" });
        }

        console.log("por aca");

        const { encryptedPassword, newSalt } = await encrypthPass(newpass);

        console.log(encryptedPassword);

        let result = await Employer.updateOne(
          { _id: id },
          { $set: { password: encryptedPassword, salt: newSalt } }
        ).exec();

        console.log(result);
        if (result) {
          await dbDisconnect();
          return res.status(200).json({
            success: true,
            msg: "La contraseña se actualizó con éxito!",
          });
        }
        await dbDisconnect();
        return res.status(400).json({
          success: false,
          error: "No se pudo completar la petición, intentelo más tarde.",
        });
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

        const validationAddress = await newAddress.validateSync();
        if (validationAddress) {
          dbDisconnect();
          return res.status(400).json({
            error:
              validationAddress.errors[Object.keys(validationAddress.errors)[0]]
                .message,
          });
        }

        const newEmployer = new Employer({
          name,
          password,
          age,
          email,
          profilepic,
          address: [newAddress._id],
        });

        const validationEmployer = await newEmployer.validateSync();
        if (validationEmployer) {
          await dbDisconnect();
          return res.status(400).json({
            error:
              validationEmployer.errors[
                Object.keys(validationEmployer.errors)[0]
              ].message,
          });
        }

        if (!validationEmployer && !validationAddress) {
          const savedAddress = await newAddress.save();
          newEmployer.address = [savedAddress._id];
          const savedEmployer = await newEmployer.save();

          const employerWithAddress = await Employer.findById(
            savedEmployer._id
          ).populate("address", "-_id name city");

          await dbDisconnect();
          return res.status(201).json(employerWithAddress);
        }
      } catch (error) {
        await dbDisconnect();
        if (error.code === 11000 && error.keyValue && error.keyValue.name) {
          return res.status(400).json({
            error: "Ya existe una dirección igual en nuestra base de datos",
          });
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
