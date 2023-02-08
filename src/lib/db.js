import { createConnection } from "mysql2";

// let db = createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER1,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

let db = createConnection({
  host: "localhost",
  user: "root",
  password: "william.27",
  database: "greenbuy",
});
db.connect((err) => {
  if (err) {
    console.error("Cannot connect to the database", err);
    return;
  }
  console.log("Connection established");
});

export default db;
