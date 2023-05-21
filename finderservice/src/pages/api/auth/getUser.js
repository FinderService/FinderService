import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Admin from "@/models/Admin";

export default async function registerHandler(req, res) {
  await dbConnect();
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Falta el correo...");
    }
    console.log('ola')
    let user = await Employer.findOne({ email });
    console.log(user);

    if (!user) {
      user = await Worker.findOne({ email });

      if (!user) {
        user = await Admin.findOne({ email });
      }
    }

    res.status(200).json({ user });
  } catch (error) {
    await dbDisconnect();
    res.status(400).json({ success: false, error: error });
  }
}
