const mongoose = require("mongoose");

export async function dbConnect() {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      const db = mongoose.connection;
      db.on("error", (err) => {
        console.error("Connection error", err);
      });
      db.once("open", () => {
        console.log("Connection established");
      });
    })
    .catch((error) => {
      console.error("Error connecting to FinderService Database", error);
    });
}

export async function dbDisconnect(){
  await mongoose.connection.close()
  console.log('Connection shutdown')
}
