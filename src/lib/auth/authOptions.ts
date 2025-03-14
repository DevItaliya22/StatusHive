import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '../env/env';
import prisma from '../db/prisma';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) return false;
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name || '',
              email: user.email,
              image: user.image || '',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }
        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
    async session({ session }) {
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
        name: `${env.NEXTAUTH_URL.startsWith('https://') ? "__Secure-": ""}next-auth.session-token`,
        options: {
            domain: process.env.NODE_ENV === "development" ? ".localhost" : ".statushive.devitaliya.me",
            sameSite: 'lax',
            path: '/',
            secure: env.NEXTAUTH_URL.startsWith('https://'),
        }
    }
}
};
