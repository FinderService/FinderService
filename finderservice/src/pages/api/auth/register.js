import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Type from "@/models/Type";
import { mailGun } from "@/utils/mailgun";
import crypto from "crypto";

import { mailValidate } from "@/utils/plantillas";

export default async function registerHandler(req, res) {
  await dbConnect();

  try {
    const { name, last, phone, birth, password, username, profile, types } =
      req.body;

    var birthdate = new Date(birth);

    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthdate.getFullYear();
    var hasBirthdayPassed =
      currentDate.getMonth() > birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() &&
        currentDate.getDate() >= birthdate.getDate());

    if (!hasBirthdayPassed) age--;
    var namecomplete = name.trim() + " " + last.trim();

        if( !name || !last || !phone || !username || !password ) {
            throw new Error('Datos incompletos');
        }

    crypto.randomBytes(16, async (err, salt) => {
      if (err) {
        await dbDisconnect();
        return res
          .status(500)
          .json({ success: false, msg: "Internal Server Error" });
      }

      const newSalt = salt.toString("base64");

      crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", async (err, key) => {
        const encryptedPassword = key.toString("base64");

        let email = username;

        let user = await Promise.any([
          Worker.findOne({ email }),
          Employer.findOne({ email }),
        ]);
        if (user) {
          await dbDisconnect();

          return res
            .status(400)
            .json({ success: false, msg: "El usuario ya existe" }, email);
        }
        if (err) {
          await dbDisconnect();
          return res
            .status(500)
            .json({ success: false, msg: "Internal Server Error" });
        }
        //return res.status(400).send('El usuario ya existe');
        //throw new Error('El usuario ya existe');

        if (profile === "worker" && !user) {
          const typesDb = await Promise.all(
            types.map(async (type) => {
              const typeDb = await Type.findOne({ name: type });
              return typeDb;
            })
          );
          let typesId = [];
          for (let i = 0; i < typesDb.length; i++) {
            typesId.push(typesDb[i]._id);
          }
          console.log(birthdate);
          let appUrl = process.env.APP_URL;
          let validator = salt.toString("base64");
          let content = mailValidate(validator, email, appUrl);

          let mail = await mailGun(
            username,
            "Bienvenido a Finder Service",
            content
          );
          let newUser = await Worker.create({
            name: namecomplete,
            phone: phone,
            password: encryptedPassword,
            age: age,
            birthdate: birthdate,
            email: username,
            rating: 0,
            salt: newSalt,
            validator: validator,
            type: typesId,
          });
          if (newUser) {
            await dbDisconnect();
            return res.status(201).json({
              success: true,
              user: newUser,
              msg: "Usuario registrado con éxito.",
              mail,
            });
          }
        } else if (profile === "employer" && !user) {
          let appUrl = process.env.APP_URL;
          let validator = salt.toString("base64");
          let content = mailValidate(validator, email, appUrl);

          let mail = await mailGun(
            username,
            "Bienvenido a Finder Service",
            content
          );
          let newUser = await Employer.create({
            name: namecomplete,
            phone: phone,
            password: encryptedPassword,
            age: age,
            birthdate: birthdate,
            email: username,
            rating: 0,
            salt: newSalt,
            validator: validator,
          });
          await dbDisconnect();
          if (newUser) {
            return res.status(201).json({
              success: true,
              user: newUser,
              msg: "Usuario registrado con éxito.",
              mail,
            });
          }
        }
      });
    });

    //const user = await Worker.create(workerexample);
    //return res.status(201).json({ success: true, user: user });
    //mongoose.connection.close();
  } catch (error) {
    await dbDisconnect();
    res.status(400).json({ success: false, msg: error.message });
  }
}
