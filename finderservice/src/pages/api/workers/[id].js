import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker.js";
import mongoose from "mongoose";
import { verifyPassword, encrypthPass } from "@/utils/lib";

export default async function handlerId(req, res) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const workerId = await Worker.findById(id);
        if (!workerId)
          return res.status(404).json({ error: " worker not found" });
        return res.status(200).json(workerId);
      } catch (error) {
        await mongoose.connection.close();
        console.log("Connection shutdown");
        return res.status(400).json({ error: error.message });
      }

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
        await encrypthPass(newpass, user.salt)
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
        const deleteWorker = await Worker.findByIdAndDelete(id);
        if (!deleteWorker)
          return res.status(404).json({ error: " worker not found" });
        return res.status(204).json();
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
