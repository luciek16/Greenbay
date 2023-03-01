const bcrypt = require("bcrypt");

export default function confirmPassword(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword).then(function (result) {
    return result;
  });
}
