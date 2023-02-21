const isValidURL = (urlString) => {
  try {
    // URLConstructor (new URL(url)) returns a newly created URL object defined by the URL parameters.
    return Boolean(new URL(urlString));
  } catch (error) {
    return false;
  }
};

export default isValidURL;
