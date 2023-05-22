const cloudinary = require('cloudinary').v2;

const uptloadCl = async (img) => {

    cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
    });

    const clImg = await cloudinary.uploader.upload(img)
    return clImg.secure_url;

}

module.exports = { uptloadCl }