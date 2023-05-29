import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "@/models/Employer.js";
import Address from "@/models/Address.js";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        let { name, address } = query;
        const queryOptions = {
          deleted: { $ne: true },
          active: { $ne: false },
        };
        if (name) {
          queryOptions.name = { $regex: `${name}`, $options: "i" };
        }
        if (address) {
          queryOptions["address.city"] = {
            $regex: `${address}`,
            $options: "i",
          };
        }
        const response = queryOptions
          ? await Employer.find(queryOptions).populate(
              "address",
              "-_id name street state country zipCode city"
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
        console.log(error);
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
