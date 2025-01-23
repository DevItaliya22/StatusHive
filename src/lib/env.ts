export interface Env {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
}

export const env: Env = {
    DATABASE_URL: process.env.DATABASE_URL ?? throwMissingEnv("DATABASE_URL"),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? throwMissingEnv("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? throwMissingEnv("GOOGLE_CLIENT_SECRET"),
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? throwMissingEnv("NEXTAUTH_SECRET"),
};

function throwMissingEnv(variable: string): never {
    throw new Error(`Missing environment variable: ${variable}`);
}