import jwt from "jsonwebtoken";
import crypto, { verify } from "crypto";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Admin from "@/models/Employer";

import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { serialize } from "cookie";
import { verifyPassword } from "@/utils/lib";

export default async function loginHandler(req, res) {
  console.log('gononea')
  await dbConnect();
  try {
    console.log(req.body);
    const { username, password } = req.body;
    

    const signToken = (_id) => {
      return jwt.sign({ _id }, "mi-secreto", {
        expiresIn: 60 * 60 * 24 * 365,
      });
    };

    if (!username || !password) {
      throw new Error("Datos incompletos...");
    }

    let email = username;
    await dbConnect();

    let user = await Promise.any([
      Worker.findOne({ email }),
      Employer.findOne({ email }),
      Admin.findOne({ email }),
    ]);
    console.log(user);

   

    if (user) {
      let isValid;
      try {
        isValid = await verifyPassword(password, user.password, user.salt);
      } catch (error) {
        console.log(error);
      }
      console.log(user.active)

      

      if (isValid) {
        const token = signToken(user._id);

        const serialized = serialize("fsToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 30,
          path: "/",
        });

        await dbDisconnect();
        return res
          .status(200)
          .json({ success: true, msg: "login successfully", user: user })
          .header("Set-Cookie", serialized);
      } else {
        await dbDisconnect();
        return res
          .status(404)
          .json({ success: false, msg: "Usuario y/o contraseña incorrecta" });
      }
    }

    await dbDisconnect();
    return res
      .status(404)
      .json({ success: false, msg: "Usuario y/o contraseña incorrectos." });
  } catch (error) {
    await dbDisconnect();
    return res.status(400).json({ success: false, error: error });
  }
}
