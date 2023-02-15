import checkToken from "../../scripts/checkToken";
import databaseQuery from "../../lib/db";

export default async function addItemHandler(req, res) {
  const token = await checkToken(req);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const getItems = await databaseQuery(`SELECT * FROM items`);
      return res.status(200).json({
        data: {
          items: getItems,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    const { itemName, imageURL, price } = req.body;
    const seller = token.sub;

    if (price % 1 !== 0 || price <= 0)
      return res.status(400).json({ error: "Price must be positive integer" });

    try {
      const id = await databaseQuery(
        `INSERT INTO items (itemName, image, price, seller) VALUES (?, ?, ?, ?)`,
        [itemName, imageURL, price, seller]
      );
      return res.status(201).json({
        newItem: {
          itemName,
          imageURL,
          price,
          id: id.insertId,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}
