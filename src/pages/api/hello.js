// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getToken } from "next-auth/jwt";

export default function handler(req, res) {
  const token = checkToken(req);

  console.log(token);
  res.status(200).json({ name: "John Doe" });
}

const checkToken = async (req) => {
  const secret = process.env.SECRET;
  const token = getToken({ req, secret });
  return token ? token : null;
};

// export default checkToken
