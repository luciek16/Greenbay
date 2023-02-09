const validateCredentials = (username: string, password: string): boolean => {
  if (!username || !password || username.length < 5 || password.length < 6) {
    return false;
  }

  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  return hasNumber && hasUpperCase && hasLowerCase;
};

export default validateCredentials;
