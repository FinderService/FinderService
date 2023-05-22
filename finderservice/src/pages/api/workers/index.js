import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker.js";
import Type from "@/models/Type.js";
import Address from "@/models/Address.js";
import mongoose from "mongoose";
import { encrypthPass, verifyPassword } from "@/utils/lib";

export default async function handler(req, res) {
  console.log("hola");
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        let { name, address } = query;
        const queryOptions = {
          deleted: {$ne: true},
        };
        if (address) {
          queryOptions["address.city"] = {
            $regex: `${address}`,
            $options: "i",
          };
        }
        if (name) {
          queryOptions.name = { $regex: `${name}`, $options: "i" };
        }
        const response = queryOptions
          ? await Worker.find(queryOptions)
          : await Worker.find({}).populate("address", "-_id name city");
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

    case "PUT":
      console.log("estoy en el put");
      try {
        const { current, newpass, userid: id, email } = req.body;
        if (!current || !newpass || !email || !id) {
          throw new Error("Datos incompletos");
        }
        console.log(req.body);
        const user = await Worker.findOne({ email }).exec();
       

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

        

        const { encryptedPassword, newSalt } = await encrypthPass(newpass);

        console.log(encryptedPassword);

        let result = await Worker.updateOne(
          { _id: id },
          { $set: { password: encryptedPassword, salt: newSalt } }
        ).exec();

       
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
        const { name, password, age, email, phonenumber, profilepic, rating } =
          req.body;
        const existedWorker = await Worker.findOne({
          email: { $regex: `${email}`, $options: "i" },
        });
        if (existedWorker) {
          return res.status(400).json({ error: "Email already used" });
        }

        const existedType = await Type.findOne({ name: req.body.type.name });

        if (!existedType) {
          return res.status(400).json({ error: "Invalid type" });
        }

        const newAddressWorker = new Address({
          name: req.body.address.name,
          city: req.body.address.city,
        });

        const validationError2 = newAddressWorker.validateSync();

        if (validationError2) {
          res
            .sendStatus(500)
            .json(
              validationError2.errors[Object.keys(validationError3.errors)[0]]
                .message
            );
          return;
        }

        const saveAddressWorker = await newAddressWorker.save();

        const newWorker = new Worker({
          name,
          password,
          age,
          email,
          phonenumber,
          profilepic,
          address: [saveAddressWorker._id],
          type: [existedType._id],
          rating,
        });

        const validationError3 = newWorker.validateSync();

        if (validationError3) {
          res
            .sendStatus(500)
            .json(
              validationError3.errors[Object.keys(validationError3.errors)[0]]
                .message
            );
          return;
        }

        const saveWorker = await newWorker.save();
        const workerWithAT = await Worker.findById(saveWorker._id)
          .populate("address", "-_id name city")
          .populate("type", "-_id name");
        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(201).json(workerWithAT);

        // return res.status(201).json(saveWorker); //201 es el objeto nuevo que se ha creado en el backend
      } catch (error) {
        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(400).json({ error: error.message });
      }

    default:
      await mongoose.connection.close();
      console.log("Connection shutdown");
      res.status(404).json({ error: "request do not exist" });
      break;
  }
}
