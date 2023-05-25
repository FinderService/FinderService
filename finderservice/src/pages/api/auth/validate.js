import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";


export default async function validateHandler(req, res) {
  await dbConnect();
  try {
    const { validator, email } = req.body;
    console.log(validator, email);

    let user = await Employer.findOne({ email }).exec();

    if (!user) {
      user = await Worker.findOne({ email }).exec();
    } else if (!user) {
      throw new Error("No se encontró al usuario");
    }

    if (user) {
      if (user.validator == validator) {
        let result =
          user.profile === "worker"
            ? await Worker.updateOne(
                { email: user.email },
                { $set: { active: true } }
              ).exec()
            : await Employer.updateOne(
                { email: user.email },
                { $set: { active: true } }
              ).exec();
        if (result.acknowledged) {
          return res
            .status(200)
            .json({
              success: true,
              msg: "Se actualizo con éxito.",
              user: user,
            });
        }
      }
    }
    throw new Error("El validator no es válido");
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}
