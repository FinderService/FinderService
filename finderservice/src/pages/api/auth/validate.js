import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";

export default async function validateHandler(req, res) {
  await dbConnect();
  try {
    const { validator, email } = req.body;
    console.log(validator, email);
   

    let user = await Promise.any([
      Worker.findOne({ email }),
      Employer.findOne({ email }),
    ]);

    //console.log(user);
    if (user) {
      user.active = true;
      let updated = await user.save();
      console.log(updated);
      if (updated) {
        return res
          .status(200)
          .json({ success: true, msg: "Se actualizo con éxito.", user: user });
      }
      return res
        .status(404)
        .json({ success: false, msg: "Error al actualizar." });
    }
  } catch (error) {
    await dbDisconnect();
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
}
