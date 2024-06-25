import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/db";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "arpit@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Ad@123%sa",
        },
      },
      async authorize(credentials): Promise<any> {
        console.log(credentials);
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        console.log("authorize", email, password);
        try {
          const res = await prisma.user.findFirst({
            where: {
              email: email,
            },
          });
          console.log("user found or not", res);
          if (await bcrypt.compare(password, res?.password as string)) {
            try {
              const token = jwt.sign(
                { user: { id: res?.id, email: res?.email } },
                "ASasdf@#11EFSF",
                {
                  expiresIn: "365d",
                }
              );
              return {
                id: res?.id,
                email: res?.email,
                name: res?.name,
                token,
                image: res?.image,
              };
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log(err);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.jwtToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      console.log("session function called", token);
      if (session?.user) {
        session.user.id = token.uid;
        session.user.jwtToken = token.jwtToken;
      }

      return session;
    },
  },
  page: {
    signIn: "/login",
  },
};
