const mongoose = require("mongoose");

const connectDB = () => {

  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => console.log("Mongodb connection error: ", err));
};
module.exports = { connectDB };
