import validateCredentials from "@/scripts/validateCredentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   // any secret word like: "i am a stegosaurus"
//   secret: process.env.SECRET,
const db = require("@/lib/db").default;
const authOptions = {
  // enabe JWT
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      // the button text displayed on the sign in form
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Please enter your email...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Please enter your password...",
        },
      },

      // name: "Sign In With Credentials",
      //in credentials we have all the data coming from the user, all the credentials come from the credentials object above
      authorize(credentials, req) {
        const { username, password } = credentials;
        console.log(username);
        console.log(password);

        if (!validateCredentials(username, password)) {
          return null;
        }
        let sql = `SELECT * FROM users WHERE username = ? `;
        db.query(sql, username, (err, result) => {
          if (err) {
            console.log(err);
            result.serverStatus(500).json({ message: "Internal server error" });
            return;
          }
          if (!result.length) {
            sql = `INSERT INTO users SET username= ?, password= ? `;
            db.query(sql, [username, password], (err, insertResult) => {
              if (err) {
                console.log(err);
                result
                  .serverStatus(500)
                  .json({ message: "Internal server error" });
                return;
              }
            });
          }
        });
        return { username, password };
      },
      //here we perform our logic - find user in the db
    }),
  ],
  // if I want to create seperate pages for each of these actions, I can do it this way
  // pages: {
  // signIn: "/auth/signin",
  //error:
  //signOut
  // },
};
// });
export default NextAuth(authOptions);
