import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import JobRequest from "../../../models/JobRequest";
import Address from "@/models/Address.js";
import mongoose from "mongoose";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {

                let { search } = req.query
                if (!search) {
                    await dbDisconnect();
                    return res.status(400).json({ error: "Please put address" });
                }

                const searchRegex = new RegExp(search, "i");

                const addressFind = await Address.findOne({city: searchRegex});
                if (!addressFind) {
                    await dbDisconnect();
                    return res.status(400).json({ error: "Address is missing" });
                }

                const requestAddress = await JobRequest.find({address: addressFind._id});
                if (requestAddress) {
                    await dbDisconnect();
                    return res.status(200).json(requestAddress);
                }

            } catch (error) {
                await dbDisconnect();
                return res.status(400).json({ error: error.message });
            }

        default:
            await dbDisconnect();
            res.status(404).json({ error: "request do not exist" });
            break;
    }
};