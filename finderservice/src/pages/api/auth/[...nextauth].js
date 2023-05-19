import NextAuth from "next-auth";
//import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import { dbConnect, dbDisconnect } from "@/utils/mongoose";
import { verifyPassword } from "@/utils/lib";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        await dbConnect();
        const user = await Worker.findOne({ email: username }).exec();
        console.log(user);

        if (!user) {
          await Employer.findOne({ email: username }).exec();
        } else if (!user) {
          dbDisconnect();
          console.log("usuario no encontrado...");
          //throw new Error("Usuario no encontrado.");
          throw new Error("Usuario y/o password incorrectos.");
        }

        let isValid;
        await verifyPassword(password, user.password, user.salt)
          .then((response) => {
            isValid = response;
          })
          .catch((error) => {
            console.log(error);
          });

        if (!isValid) {
          console.log("El pass no es valido...");
          throw new Error("Usuario y/o password incorrectos.");
        }

          let logedUser = { name: user.name, last_name: user.last, email: user.email, image: user.profilepic }

          return logedUser;

      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/User/login",
  },

  /*
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
  */
};

export default NextAuth(authOptions);
