const bcrypt = require("bcrypt");

export default function confirmPassword(userPassword, hashedPassword) {
  return bcrypt
    .compare(userPassword, hashedPassword)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
}
