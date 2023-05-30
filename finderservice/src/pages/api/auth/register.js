import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { verifyPassword, encryptPass } from "@/utils/lib";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Type from "@/models/Type";
import Address from "@/models/Address";
import { mailGun } from "@/utils/mailgun";

import { mailValidate } from "@/utils/plantillas";

export default async function registerHandler(req, res) {
  await dbConnect();

  try {
    const {
      address,
      name,
      last,
      phone,
      birth,
      password,
      username,
      profile,
      types,
      profilepic,
    } = req.body;
    console.log(address);

    let email = username;
    var birthdateRaw = new Date(birth);

    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthdateRaw.getFullYear();
    var hasBirthdayPassed =
      currentDate.getMonth() > birthdateRaw.getMonth() ||
      (currentDate.getMonth() === birthdateRaw.getMonth() &&
        currentDate.getDate() >= birthdateRaw.getDate());

    if (!hasBirthdayPassed) age--;
    var namecomplete = name.trim() + " " + last.trim();
    let birthdate = birthdateRaw.toISOString().split("T")[0];

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
    let validatorEncode = newSalt.toString("base64");
    let validator = encodeURIComponent(validatorEncode);
    console.log(validator);
    let content = mailValidate(validator, email, appUrl);
    console.log(address);

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
        profilepic: profilepic ? profilepic : "",
      });
      console.log(address);

      let newAddress = new Address({
        id_usuario: newUser._id,
        name: address[0].addressname,
        country: address[0].country,
        state: address[0].state,
        city: address[0].city,
        zipCode: address[0].zipCode,
        street: address[0].street,
      });
      console.log(newAddress);

      newUser.address = newAddress._id;

      if (newUser && newAddress) {
        let mail = await mailGun(
          username,
          "Bienvenido a Finder Service",
          content
        );
        await newUser.save();
        await newAddress.save();
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
        profilepic: profilepic ? profilepic : "",
      });
      let newAddress = new Address({
        id_usuario: newUser._id,
        name: address[0].addressname,
        country: address[0].country,
        state: address[0].state,
        city: address[0].city,
        zipCode: address[0].zipCode,
        street: address[0].street,
      });
      newUser.address = newAddress._id;

      if (newUser && newAddress) {
        try {
          await newAddress.save();
          await newUser.save();

          await dbDisconnect();
          let mail = await mailGun(
            username,
            "Bienvenido a Finder Service",
            content
          );

          return res.status(201).json({
            success: true,
            user: newUser,
            msg: "Usuario registrado con éxito.",
            mail,
          });
        } catch (error) {
          console.log(error);
          await dbDisconnect();
          return res.status(400).json({
            success: false,
            msg: "Ocurrió un error inesperado",
          });
        }
      }
    }
  } catch (error) {
    await dbDisconnect();
    return res.status(400).json({ success: false, msg: error.message });
  }
}
