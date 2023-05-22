import { dbConnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import { uptloadCl } from "@/utils/cloudinary";

export default async function avatarHandler(req, res) {
  try {
    const { avatar, id_usuario } = req.body;

    if (!avatar || !id_usuario) {
      throw new Error("Datos incompletos");
    }

    await dbConnect();
    console.log(req.body);

    let user = await Employer.findById(id_usuario).exec();
    console.log(user);

    if (!user) {
      user = await Worker.findById(id_usuario).exec();
    }
    console.log("waos");
    console.log(user);

    if (!user) {
      throw new Error("No se encontro el usuario");
    }

    const clImg = await uptloadCl(avatar);

    let result =
      user.profile === "worker"
        ? await Worker.updateOne(
            { _id: id_usuario },
            { $set: { profilepic: clImg } }

          ).exec()
        : await Employer.updateOne(
            { _id: id_usuario },
            { $set: { profilepic: clImg } },
          ).exec();

    if (result.acknowledged) {
      return res
        .status(200)
        .json({ success: true, msg: "La foto se actualizó con éxito" });
    }

    return res.status(400).json({
      success: false,
      error: "No se pudo completar la petición, intentelo más tarde.",
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
    //res.send(error);
    //throw new Error(error);
  }
}

// /zLf3PCSWhhvhthE+v0fyMEWzduXHzKzQWfkXuq74OawG5qeZbHA5YHe5H+wrdDXvwAJ7XFAE/HiNi7bXPfwKA==
// { email: 'nalonsor@outlook.com' }
