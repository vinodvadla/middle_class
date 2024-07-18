const bcrypt = require("bcrypt");

const hashpassword = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

const isValid = async (pass, hash) => {
  return await bcrypt.compare(pass, hash);
};

module.exports = { hashpassword, isValid };
