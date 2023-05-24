import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import Address from "../../../models/Address";
import mongoose from "mongoose";
import { verifyPassword, encryptPass } from "@/utils/lib";

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
        const { current, newpass, userid: id, email } = req.body;
        if (!current || !newpass || !email || !id) {
          throw new Error("Datos incompletos");
        }

        const user = await Employer.findById(id);
        if (!user) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontró al empleado con ese id" });
        }

        let isValid;
        await verifyPassword(current, user.password, user.salt)
          .then((response) => {
            isValid = response;
          })
          .catch((error) => {
            console.log(error);
          });

        if (!isValid) {
          return res.status(400).json({
            sucess: false,
            msg: "La contraseña actual no es correcta",
          });
        }

        let newEncryptPass;
        let newSalt;
        await encryptPass(newpass, user.salt)
          .then((response) => {
            newEncryptPass = response.encrypthPassword;
            newSalt = response.newSalt;
          })
          .catch((error) => {
            console.log(error);
          });

        let res = await Employer.updateOne(
          { _id: id },
          { password: newEncryptPass, salt: newSalt }
        );
        if (res.acknowledged) {
          return res.status(200).json({
            sucess: true,
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
    case "DELETE":
      try {
        const employerToDelete = await Employer.findById(id);
        await Employer.findByIdAndDelete(id);
        await Address.findByIdAndDelete(employerToDelete.address);

        if (!employerToDelete) {
          await dbDisconnect();
          return res
            .status(404)
            .json({ error: "No se encontró el empleado con ese id" });
        } else {
          await dbDisconnect();
          return res.status(200).json("Se ha borrado al empleado con ese id");
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }

      break;
    default:
      await dbDisconnect();
      return res.status(404).json({ error: "La petición HTTP no es correcta" });
  }
}
