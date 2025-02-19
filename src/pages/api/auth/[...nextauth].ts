import prisma from "../../../../prisma/client";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) return null;
          const token = jwt.sign(
            {
              userId: user.id,
              email: user.email,
            },
            process.env.NEXT_JWT_SECRETE!,
            { expiresIn: "1d" }
          );
          return { user, token };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      try {
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: user.email!,
            },
          });

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "",
                password: "",
                role: "host",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
            user.id = newUser.id;
            user.role = newUser.role;
          } else {
            user.id = existingUser.id;
            user.role = existingUser.role;
          }
          return true;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt(params: any) {
      const { token, user, account }: any = params;

      if (user) {
        if (account?.provider === "google") {
          token.id = user.id;
          token.role = user.role;
          token.email = user.email;
          token.name = user.name;
        } else {
          const customUser = user as unknown as any;
          token.accessToken = customUser?.token;
          token.name = customUser?.user?.name;
          token.id = customUser?.user?.id;
          token.role = customUser?.user?.role;
          token.email = customUser?.user?.email;
        }
      }
      return token;
    },
    async session(params: any) {
      const { session, token } = params;
      const customSession: any = {
        accessToken: token.accessToken,
        id: token?.id,
        role: token?.role,
        user: {
          ...session.user,
          id: token?.id,
          role: token?.role,
        },
      };
      return { ...session, ...customSession };
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
