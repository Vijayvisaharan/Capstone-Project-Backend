//import the donenv packge
require("dotenv").config();

//create all the neccesary configuration variables
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

//export all configuration variables
module.exports = {
  MONGODB_URI,
  PORT,
};
