import databaseQuery from "../../lib/db";
import checkToken from "../../scripts/checkToken";

export default async function getUserHandler(req, res) {
  const token = await checkToken(req);
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const getUserData = await databaseQuery(
        `SELECT * FROM users WHERE id = ${token.sub}`
      );
      const greenDollars = getUserData[0].greendollars;

      return res.status(200).json({ greenDollars: greenDollars });
    } catch (error) {
      console.log(error);
      return res.send(500).send({ error: "Internal Server Error" });
    }
  }
}
