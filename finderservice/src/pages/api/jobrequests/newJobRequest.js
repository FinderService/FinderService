import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import Employer from "../../../models/Employer";
import JobRequest from "../../../models/JobRequest";
import Address from "../../../models/Address";
import Type from "../../../models/Type";
import { uptloadCl } from "@/utils/cloudinary";

export default async function newJobRHandler(req, res) {
  await dbConnect();
  console.log('ola')
  try {
    const { email, description, photo, type, address } = body;

    // const newAddress = new Address({
    //   name: address[0].name,
    //   street: address[0].street,
    //   city: address[0].city,
    //   state: address[0].state,
    //   country: address[0].country,
    //   zipCode: address[0].zipCode
    // });

    const clImg = await uptloadCl(photo);

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

    const typeJob = await Type.findOne({ name: type });
    if (!typeJob) {
      dbDisconnect();
      return res.status(404).json({
        error: "No se encontró el tipo de trabajo en la base de datos",
      });
    }
    const newJobRequest = new JobRequest({
      date: new Date(),
      description,
      photo: clImg,
      employer: employerDb._id,
      type: typeJob._id,
      address: employerDb.Address,
    });

    if (!validationAddress) {
      //   const savedAddress = await newAddress.save();
      newJobRequest.address = [savedAddress._id];
      const savedJobRequest = await newJobRequest.save();

      const jobRequestComplete = await JobRequest.findById(savedJobRequest._id)
        .populate("employer", "-_id name email")
        .populate("address", "-_id name city")
        .populate("type", "-_id name");
      await dbDisconnect();
      return res.status(201).json(jobRequestComplete);
    }
  } catch (error) {
    await dbDisconnect();
    return res.status(400).json({ success: false, error: error });
  }
}
