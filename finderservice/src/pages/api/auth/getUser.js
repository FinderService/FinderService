import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Admin from "@/models/Admin";
import Address from "@/models/Address";
import Type from "@/models/Type";

export default async function registerHandler(req, res) {
  await dbConnect();
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Falta el correo...");
    }

    let user = await Employer.findOne({ email });
    console.log(user);

    if (!user) {
      user = await Worker.findOne({ email });

      if (!user) {
        user = await Admin.findOne({ email });
      }
    }

    // obtener los types
    if (user.profile === "worker") {
      let typesArr = await user.type.map(
        async (t) => await Type.findOne({ _id: t })
      );

      let types = [];
      if (typesArr.length) {
        types = (await Promise.all(typesArr)).map((res) => res);
        user.type = [...types];
      }
    }

    // obtener el address
    let address = await Address.find({ id_usuario: user._id, deleted: false });
    if (address) {
      user.address = [...address];
    }

    delete user.password;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    await dbDisconnect();
    res.status(400).json({ success: false, error: error });
  }
}
