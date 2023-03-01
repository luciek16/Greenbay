import validateCredentials from "@/scripts/validateCredentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import hashedPassword from "@/lib/hash";
// export default NextAuth({
import databaseQuery from "@/lib/db";

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
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const hashPass = await hashedPassword(password);
        console.log(hashPass);

        let sql = `SELECT * FROM users WHERE username = ? `;
        const result = await databaseQuery(sql, username).catch((e) =>
          console.log(e)
        );
        if (result.length) {
          const confirmPass = await confirmPassword(password, hashPass);
          console.log(confirmPass);
          // if(hashPass === result[0].password) {
          if (confirmPass) {
            return { name: username, id: result[0].id };
          } else if (!confirmPass) {
            return null;
          } else {
            if (!validateCredentials(username, password)) {
              return null;
            }
          }
        } else {
          // (result.length && password != result[0].password)

          console.log(result);
          sql = `INSERT INTO users SET ? `;
          const add = await databaseQuery(sql, { username, hashPass });

          return { name: username, id: add.insertId };
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.name) {
        token.userName = user.name;
        token.userId = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.userId;
      return session;
    },
  },
};
export default NextAuth(authOptions);
