const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://KawamaH:CZaROzJzJGF99Ifq@finderservicedb.kucjfkg.mongodb.net/findedservicedb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });
