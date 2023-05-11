import { dbConnect } from "@/utils/mongoose";
import Worker from "@/models/Worker";
import mongoose from "mongoose";

dbConnect();
let workerexample = new Worker({
  name: "Juan Camilo Henao",
  password: "12345",
  age: "21",
  email: "juanhenao1234@gmail.com",
  rating: "4.2",
});

workerexample
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
export default function handler(req, res) {
  res.status(200).json("Index db");
}
