import NextAuth from "next-auth";
//import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Worker from "@/models/Worker";
import Employer from "@/models/Employer";
import Admin from "@/models/Admin";
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
        if (!username || !password) {
          throw new Error("Todos los campos son obligatorios");
        }
        await dbConnect();

        let email = username;
        let user = await Employer.findOne({ email });

        if (!user) {
          user = await Worker.findOne({ email });

          if (!user) {
            user = await Admin.findOne({ email });
          }
        }

        console.log(user);

        if (!user) {
          await dbDisconnect();
          throw new Error("Usuario y/o password incorrectos.");
        }
        // if (!user.active && user.profile !== 'admin') {
        if (!user.active) {
          throw new Error("El usuario no ha sido activado");
        }
        if (user.deleted) {
          throw new Error(
            "El usuario ha sido borrado por incumplimiento de las normas, si lo considera un error, envíe un mail a finderservice2023@gmail.com"
          );
        }

        let isValid;

        isValid = await verifyPassword(password, user.password, user.salt);

        if (!isValid) {
          await dbDisconnect();
          throw new Error("Usuario y/o password incorrectos.");
        }

        let logedUser = {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.profilepic,
        };
        await dbDisconnect();
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
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        //console.log('google profile: ', profile);
        let logedUser = {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'google',
        };

        return logedUser;
        //return '/User/profile';
      }

      if (account.provider === "credentials") {
        console.log('credentials profile: ', profile);
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
};

export default NextAuth(authOptions);
