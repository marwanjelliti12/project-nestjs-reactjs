const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/bdmarwan";

function main() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Succesfull");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

module.exports = { main };
