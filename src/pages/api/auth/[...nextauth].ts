import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   // any secret word like: "i am a stegosaurus"
//   secret: process.env.SECRET,
const authOptions: NextAuthOptions = {
  // enabe JWT
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      // the button text displayed on the sign in form
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== "john@email.com" && password !== "1234") {
          return null;
        }

        return { id: "1234", name: "John Doe", email: "john@gmail.com" };
      },
      //here we perform our logic - find user in the db
    }),
  ],
  //if I want to create seperate pages for each of these actions, I can do it this way
  //pages: {
  // signIn: 'auth/signin'
  //error:
  //signOut
  // }
};
// });
export default NextAuth(authOptions);
