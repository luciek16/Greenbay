const validateCredentials = (username: string, password: string) => {
  const toUpperCase = (element: any) => element == element.toUpperCase();
  let passwordValidation = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
  const num = (element: any) => {
    typeof parseInt(element) == "number";
  };

  if (!username || !password) {
    return false;
  }
  if (username.length < 5 || password.length < 8) {
    return false;
  }
  //   console.log(password.split("").some(num));
  if (password.split("").some(toUpperCase) == false) {
    return false;
  }
  if (!password.match(passwordValidation)) {
    return false;
  }
  return true;
};

export default validateCredentials;
