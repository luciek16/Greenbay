import { resourceLimits } from "worker_threads";
import checkToken from "../../scripts/checkToken";
import databaseQuery from "./../../lib/db";

export default async function addItemHandler(req, res) {
  try {
    const token = await checkToken(req);
    console.log(token);
    res.status(200).json({});

    if (req.method === "POST") {
      const { itemName, imageURL, price } = req.body;
      let seller = token.sub;
      try {
        const addItem = await databaseQuery(
          `INSERT INTO items (itemName, image, price, seller) VALUES (?, ?, ?, ?)`,
          [itemName, imageURL, price, seller]
        );
        console.log(res);
        // result.status(202).send({ message: "Created" });
      } catch (err) {
        console.log(err);
        // result.status(500).send({ message: "Internal server error" });
        // return;
      }
      // return res.status(202).json({ message: "Success" });
    }
  } catch (error) {
    console.log(error);
  }
}
