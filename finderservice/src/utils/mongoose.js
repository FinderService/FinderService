const mongoose = require("mongoose");

export async function dbConnect() {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    const db = mongoose.connection;
    db.on('error',err=>{
      console.error('Connection error', err)
    })
    db.once('open',()=> {
      console.log('Connection established')
    })
}