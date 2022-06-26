import mongoose from "mongoose";

export const connectDB = async () =>{
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(con => console.log(`Database Connected: ${con.connection.host}`))
    .catch(() => {
        console.log("Error While Connecting To Database");
        process.exit(1);
    })
}