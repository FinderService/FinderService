import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { verifyPassword, encryptPass } from "@/utils/lib";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Type from "@/models/Type";
import { mailGun } from "@/utils/mailgun";

import { mailValidate } from "@/utils/plantillas";

export default async function registerHandler(req, res) {
  await dbConnect();

  try {
    const { name, last, phone, birth, password, username, profile, types } =
      req.body;

    let email = username;
    var birthdate = new Date(birth);

    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthdate.getFullYear();
    var hasBirthdayPassed =
      currentDate.getMonth() > birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() &&
        currentDate.getDate() >= birthdate.getDate());

    if (!hasBirthdayPassed) age--;
    var namecomplete = name.trim() + " " + last.trim();

    if (!name || !last || !phone || !username || !password) {
      throw new Error("Datos incompletos");
    }

    const { encryptedPassword, newSalt } = await encryptPass(password);

    let user = await Employer.findOne({ email }).exec();
    if (!user) {
      user = await Worker.findOne({ email }).exec();
    }
  

    if (user) {
      await dbDisconnect();
      return res
        .status(400)
        .json({ success: false, msg: "El usuario ya existe" }, email);
    }

    const passwordMatch = await verifyPassword(
      password,
      encryptedPassword,
      newSalt
    );

    if (!passwordMatch) {
      await dbDisconnect();
      return res
        .status(400)
        .json({ success: false, msg: "La contraseña es incorrecta" });
    }

    let appUrl = process.env.APP_URL;
    let validator = newSalt.toString("base64");
    let content = mailValidate(validator, email, appUrl);

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

      let newUser = new Worker({
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

      let mail = await mailGun(
        username,
        "Bienvenido a Finder Service",
        content
      );
      await newUser.save();

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
      let newUser = new Employer({
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
      await newUser.save();

      if (newUser) {
        await dbDisconnect();
        return res.status(201).json({
          success: true,
          user: newUser,
          msg: "Usuario registrado con éxito.",
          mail,
        });
      }
    }
  } catch (error) {
    await dbDisconnect();
    res.status(400).json({ success: false, msg: error.message });
  }
}
