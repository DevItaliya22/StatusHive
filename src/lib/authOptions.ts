import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from './env';
import db from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user }) {
            try {
              if (!user.email) return false;
              const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.email, user.email))
                .execute();
              if (existingUser.length === 0) {
                const newUser = await db
                  .insert(users)
                  .values({
                    name: user.name || '',
                    email: user.email,
                    image: user.image || '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  })
                  .returning()
                  .execute();
              }
      
              return true;
            } catch (error) {
              console.error('SignIn error:', error);
              return false;
            }
          },
          async session({ session }) {
            return session;
          }
    },
    secret: env.NEXTAUTH_SECRET
}
