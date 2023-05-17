import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import { mailGun } from "@/utils/mailgun";
import crypto from "crypto";

import { mailValidate } from "@/utils/plantillas";

export default async function registerHandler(req, res) {
  await dbConnect();

  try {
    const { name, last, phone, birth, password, username } = req.body;
    var birthdate = new Date(birth);
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthdate.getFullYear();
    var hasBirthdayPassed =
      currentDate.getMonth() > birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() &&
        currentDate.getDate() >= birthdate.getDate());

    if (!hasBirthdayPassed) age--;
    var namecomplete = name.trim() + " " + last.trim();
    if (!name || !username || !password) {
      throw new Error("Datos incompletos");
    }

    crypto.randomBytes(16, (err, salt) => {
      const newSalt = salt.toString("base64");
      crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", async (err, key) => {
        const encryptedPassword = key.toString("base64");
        let email = username;
        let user = await Worker.findOne({ email }).exec();
        if (user) {
          return res
            .status(400)
            .json({ success: false, msg: "El usuario ya existe" }, email);
          //return res.status(400).send('El usuario ya existe');
          //throw new Error('El usuario ya existe');
        }

        let appUrl = process.env.APP_URL;
        let validator = salt.toString("base64");
        let content = mailValidate(validator, email, appUrl);

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
        });

        let mail = await mailGun(
          username,
          "Bienvenido a Finder Service",
          content
        );

        if (newUser) {
          return res.status(201).json({
            success: true,
            user: newUser,
            msg: "Usuario registrado con éxito.",
            mail,
          });
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
