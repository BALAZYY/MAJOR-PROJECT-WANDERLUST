const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const Monogo_Url = "mongodb://127.0.0.1:27017/Major_WanderLust";
main()
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(() => {
    console.log("error connecting to mongo");
  });
async function main() {
  await mongoose.connect(Monogo_Url);
}
const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data=initdata.data.map((obj) => ({...obj,owner:"66a45d0b4467f52e875c8dfa"}));
  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};
initDB();
