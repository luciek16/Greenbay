import { resourceLimits } from "worker_threads";
import checkToken from "../../scripts/checkToken";
import databaseQuery from "./../../lib/db";

export default async function addItemHandler(req, res) {
  const token = await checkToken(req);
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { itemName, imageURL, price } = req.body;
    const seller = token.sub;

    try {
      await databaseQuery(
        `INSERT INTO items (itemName, image, price, seller) VALUES (?, ?, ?, ?)`,
        [itemName, imageURL, price, seller]
      );
      return res.status(201).send({ message: "Created" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}
