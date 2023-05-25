import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { retrivePassword } from "@/utils/plantillas";
import { mailGun } from "@/utils/mailgun";
import { generateSalt } from "@/utils/lib";

export default async function validateHandler(req, res) {
  await dbConnect();
  try {
    const { email } = req.body;

    let user = await Promise.any([
      Worker.findOne({ email }),
      Employer.findOne({ email }),
    ]);

    //console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "No se encuentra el usuario" });
    }
    if (user) {
      const newSalt = await generateSalt();
      let appUrl = process.env.APP_URL;
      let validator = newSalt.toString("base64");
      let content = retrivePassword(validator, email, appUrl);

      let mail = await mailGun(email, "Recuperación de contraseña", content);
      user.updateOne({
        validator: validator,
      });

      await dbDisconnect();
      return res.status(201).json({
        success: true,
        user: user,
        msg:"Correo enviado con éxito",
        mail,
      })
    }
    
  } catch (error) {
    await dbDisconnect();
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
}
