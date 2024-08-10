import GoogleProvider from "next-auth/providers/google";
import db from "@/db";
import { Keypair } from "@solana/web3.js";

// export interface session extends Session {
//   user: {
//     email: string;
//     name: string;
//     id: string;
//   };
// }

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }

        const userDb = await db.user.findFirst({
          where: {
            username: email,
          },
        });

        if (userDb) {
          return true;
        }

        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = keypair.secretKey;

        //ED25519 Keypair [any lib which lets u ceate a keypair in tiis algo]

        console.log("publicKey", publicKey);
        console.log("privateKey", privateKey);

        const newUser = await db.user.create({
          data: {
            username: email,
            name: profile?.name,
            provider: "GOOGLE",
            solWallet: {
              create: {
                publicKey: publicKey,
                privateKey: privateKey.toString(),
              },
            },
            InrWallet: {
              create: {
                balance: 0,
              },
            },
          },
        });
        if (newUser) {
          return true;
        }
      }
      return false;
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id?.toString();
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        if (session.user) {
          session.user.id = token.id;
        }
      }
      return session;
    },
  },
};
