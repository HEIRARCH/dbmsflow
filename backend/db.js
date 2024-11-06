const mongoose = require("mongoose");

const url =
  "mongodb+srv://HEIRARCH:Aditya7083@dbmscluster.zr01x.mongodb.net/myDB?retryWrites=true&w=majority&appName=dbmsCluster";
module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};