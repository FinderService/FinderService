import jwt from "jsonwebtoken";
import crypto from "crypto";
import Worker from "@/models/Worker";
import { dbConnect } from "@/utils/mongoose";
import { serialize } from "cookie";


export default async function loginHandler(req, res) {
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

    let user = await Worker.findOne({ email }).exec();

    if (user) {
      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password === encryptedPassword) {
          console.log(user._id);
          const token = signToken(user._id);

          const serialized = serialize("fsToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
          });

          //res.setHeader('Set-Cookie', serialized);
          return res
            .status(200)
            .json({ success: true, msg: "login successfully", user: user });
        }
        return res
          .status(404)
          .json({ success: false, msg: "Usuario y/o contraseña incorrecta" });
      });
    }

    return res
      .status(404)
      .json({ success: false, msg: "Usuario y/o contraseña incorrectos." });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
}
