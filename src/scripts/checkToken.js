import { getToken } from "next-auth/jwt";

const checkToken = async (req) => {
  const secret = process.env.SECRET;
  const token = getToken({ req, secret });
  return token ? token : null;
};

export default checkToken;
