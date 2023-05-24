// import { dbConnect } from "@/utils/mongoose";
// import Worker from "@/models/Worker";

// import { verifyPassword, encrypthPass } from "@/utils/lib";

// export default async function registerHandler(req, res) {
//   try {
//     const { current, newpass, userid: id, email } = req.body;

//     if (!current || !newpass || !email || !id) {
//       throw new Error("Datos incompletos");
//     }

//     await dbConnect();
//     console.log(req.body);

//     const user = await Worker.findOne({ email: email }).exec();
//     //console.log(user);

//     if (!user) {
//       throw new Error("No se encontro el usuario");
//     }

//     let isValid;
//     await verifyPassword(current, user.password, user.salt)
//       .then((response) => {
//         isValid = response;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log("isvalid:", isValid);

//     if (!isValid) {
//       //console.log("El pass no es valido...");
//       return res
//         .status(400)
//         .json({ success: false, msg: "La contraseña actual no es correcta" });
//       //throw new Error("Usuario y/o password incorrectos.");
//       //return res.status(400).json({ success: false, error: 'La contraseña actual no es correcta' });
//     }

//     let newEncryptPass;
//     let newSalt;
//     await encrypthPass(newpass, user.salt)
//       .then((response) => {
//         newEncryptPass = response.encryptedPassword;
//         newSalt = response.newSalt;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     let res = await Worker.updateOne(
//       { _id: id },
//       { password: newEncryptPass, salt: newSalt }
//     );
//     console.log(res);

//     if (res.acknowledged) {
//       return res
//         .status(200)
//         .json({ success: true, msg: "La contraseña se actualizo con éxito!" });
//     }

//     return res
//       .status(400)
//       .json({
//         success: false,
//         error: "No se pudo completar la petición, intentelo más tarde.",
//       });
//   } catch (error) {
//     res.status(400).json({ success: false, error });
//     //res.send(error);
//     //throw new Error(error);
//   }
// }

// // /zLf3PCSWhhvhthE+v0fyMEWzduXHzKzQWfkXuq74OawG5qeZbHA5YHe5H+wrdDXvwAJ7XFAE/HiNi7bXPfwKA==
// // { email: 'nalonsor@outlook.com' }
