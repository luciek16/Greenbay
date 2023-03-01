const bcrypt = require("bcrypt");

export default function hashedPassword(userPassword) {
  return bcrypt.hash(userPassword, 10).then(function (hash) {
    return hash;
  });
}
