import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import JobRequest from "../../../models/JobRequest";
import JobPostulation from "../../../models/JobPostulation";
import Address from "../../../models/Address";
import Type from "../../../models/Type";
import { uptloadCl } from "@/utils/cloudinary";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      try {
        const { idEmployer, idRequest } = query;

        let response = [];
        if (idRequest) {
          response = await JobPostulation.find({
            jobrequest: idRequest,
          }).populate("worker", "name email profilepic");
        } else if (idEmployer) {
          response = await JobRequest.find({ employer: idEmployer })
            .populate("employer", "name email")
            .populate("address", "-_id name street state country zipCode city")
            .populate("type", "name");
        } else {
          response = await JobRequest.find({})
            .populate("employer", "name email")
            .populate("address", "-_id name street state country zipCode city")
            .populate("type", "name");
        }

        if (response.length === 0) {
          await dbDisconnect();
          return res.status(404).json({
            error: "No se encontraron peticiones de trabajo activas",
          });
        } else {
          await dbDisconnect();
          return res.status(200).json(response);
        }
      } catch (error) {
        await dbDisconnect();
        return res.status(400).json({ error: error.message });
      }
      break;
    case "POST":
      await dbConnect();

      try {
        const { employerEmail: email, description, title, type } = body;
        console.log(body);
        let dateNow = new Date();
        let dateNowSlice = dateNow.toISOString().split("T")[0];

        // const newAddress = new Address({
        //   name: address[0].name,
        //   street: address[0].street,
        //   city: address[0].city,
        //   state: address[0].state,
        //   country: address[0].country,
        //   zipCode: address[0].zipCode
        // });

        // const clImg = await uptloadCl(photo);

        const employerDb = await Employer.findOne({ email });

        // const validationAddress = await newAddress.validateSync();
        // if (validationAddress) {
        //   dbDisconnect();
        //   return res.status(400).json({
        //     error:
        //       validationAddress.errors[Object.keys(validationAddress.errors)[0]]
        //         .message,
        //   });
        // }

        const typeJob = await Type.findById(type[0]._id);

        if (!typeJob) {
          dbDisconnect();
          return res.status(404).json({
            error: "No se encontró el tipo de trabajo en la base de datos",
          });
        }
        console.log(title, description, typeJob._id, dateNowSlice);

        const newJobRequest = new JobRequest({
          title,
          date: dateNow,
          description,
          employer: employerDb._id,
          type: typeJob._id,
          address: employerDb.address,
        });
        console.log(newJobRequest);

        //   const savedAddress = await newAddress.save();
        //   newJobRequest.address = [savedAddress._id];
        const savedJobRequest = await newJobRequest.save();

        const jobRequestComplete = await JobRequest.findById(
          savedJobRequest._id
        )
          .populate("employer", "-_id name email")
          .populate("address", "-_id name city")
          .populate("type", "-_id name");
        await dbDisconnect();
        return res.status(201).json(jobRequestComplete);
      } catch (error) {
        console.log(error);
        await dbDisconnect();
        return res.status(400).json({ success: false, error: error });
      }
  }
}
