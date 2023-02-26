import checkToken from "../../scripts/checkToken";
import databaseQuery from "../../lib/db";
import isValidURL from "../../scripts/validateURL";
import { data } from "autoprefixer";

export default async function addItemHandler(req, res) {
  const token = await checkToken(req);
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
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
      return res.status(500).send({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { itemName, imageURL, price } = req.body;
    const seller = token.sub;

    if (price % 1 !== 0 || price <= 0) {
      return res.status(400).json({ error: "Price must be positive integer" });
    }
    if (!isValidURL(imageURL)) {
      return res.status(400).json({ error: "Image URL must a valid URL" });
    }

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
      return res.status(500).send({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { itemId, itemPrice, itemSeller } = req.body.data;
      const getUserGRD = await databaseQuery(
        `SELECT greendollars FROM users WHERE id = ?`,
        token.sub
      );
      const userGRD = getUserGRD[0].greendollars;
      if (userGRD > itemPrice) {
        console.log(itemSeller);

        const deductDollars = await databaseQuery(
          `UPDATE users, items SET users.greendollars = users.greendollars - ?, users.greendollars = users.greendollars + ?, items.sellable = ?, items.buyer = ? WHERE users.id = ? AND users.username = ? AND items.id = ? AND items.id = ?`,
          [
            itemPrice,
            itemPrice,
            "1",
            token.username,
            token.sub,
            itemSeller,
            itemId,
            itemId,
          ]
        );
        console.log(deductDollars);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
}
