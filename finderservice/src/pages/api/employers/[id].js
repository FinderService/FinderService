import { dbConnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
export default async (req, res) => {
  const {
    query: { id },
  } = req;
  switch (req.method) {
    case "GET":
      try {
        const response = await Employer.findById(id);
        if (!response)
          res.status(404).json({ error: "Employer do not exist in the db" });
        res.status(200).json(response);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    default:
      return res.status(404).json({ error: "This method do not exist" });
  }
};
