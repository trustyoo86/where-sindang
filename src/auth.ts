import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Google from "next-auth/providers/google";

// JWT session, no DB adapter. Identity = "provider:accountId" carried in the token.
// ponytail: user_key lives only in the JWT; the DB stores nothing but saved rows.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Kakao, Google],
  callbacks: {
    jwt({ token, account }) {
      if (account) token.uk = `${account.provider}:${account.providerAccountId}`;
      return token;
    },
    session({ session, token }) {
      session.user.uk = token.uk as string;
      return session;
    },
  },
});
