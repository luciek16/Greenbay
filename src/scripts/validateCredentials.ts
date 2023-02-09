const validateCredentials = (username: string, password: string) => {
  let passwordValidation = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,30}$/;

  if (!username || !password) {
    return false;
  }
  if (username.length < 5) {
    return false;
  }
  if (!password.match(passwordValidation)) {
    return false;
  }
  return true;
};

export default validateCredentials;
