import validateCredentials from "../../../scripts/validateCredentials";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import hashedPassword from "../../../lib/hashPassword";
import confirmPassword from "../../../lib/confirmPassword";
// export default NextAuth({
import databaseQuery from "../../../lib/db";

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
          placeholder: "Please enter your username...",
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
        if (!validateCredentials(username, password)) {
          return null;
        }

        const hashPass = await hashedPassword(password);
        try {
          let sql = `SELECT * FROM users WHERE username = ? `;
          const findUser = await databaseQuery(sql, username);

          if (findUser.length) {
            const confirmPass = await confirmPassword(password, hashPass);
            if (confirmPass) {
              return { name: username, id: findUser[0].id };
            } else if (!confirmPass) {
              return null;
            }
          } else {
            sql = `INSERT INTO users SET ? `;
            const addUser = await databaseQuery(sql, {
              username,
              password: hashPass,
              greendollars: 200000,
            });
            return { name: username, id: addUser.insertId };
          }
        } catch (error) {
          console.log(error);
          return null;
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
