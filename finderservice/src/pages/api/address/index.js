// import { dbConnect, dbDisconnect } from "@/utils/mongoose";
// import Address from "@/models/Address.js";
// import mongoose from "mongoose";

// export default async function handler(req, res) {
//   await dbConnect();
//   switch (req.method) {
//     case "GET":
//       try {
//         let {name} = query;
//         const response = name ? await Address.find({name}) :
//         const addresses = await Address.find();
//         if (addresses.length !== 0) {
//           return res.status(200).json(addresses);
//         } else {
//           await dbDisconnect();
//           return res
//             .status(404)
//             .json({ error: "No se encuentran las direcciones" });
//         }
//       } catch (error) {
//         dbDisconnect();
//         return res.status(400).json({ error: error.message });
//       }
//     default:
//       await dbDisconnect();
//       res.status(404).json({ error: "No se encuentra el http request" });
//   }
// }
