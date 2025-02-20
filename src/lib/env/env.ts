export interface Env {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    TINYBIRD_TOKEN: string;
    TINYBIRD_URL: string;
    VERCEL_AUTH_BEARER_TOKEN: string;
    PROJECT_ID_VERCEL: string;
    TEAM_ID_VERCEL?: string;
    BASE_DOMAIN: string;
    NEXTAUTH_URL: string;
    RESEND_API_KEY:string;
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
}

export const env: Env = {
    DATABASE_URL: process.env.DATABASE_URL ?? throwMissingEnv("DATABASE_URL"),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? throwMissingEnv("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? throwMissingEnv("GOOGLE_CLIENT_SECRET"),
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? throwMissingEnv("NEXTAUTH_SECRET"),
    TINYBIRD_TOKEN: process.env.TINYBIRD_TOKEN ?? throwMissingEnv("TINYBIRD_TOKEN"),
    TINYBIRD_URL: process.env.TINYBIRD_URL ?? throwMissingEnv("TINYBIRD_URL"),
    VERCEL_AUTH_BEARER_TOKEN: process.env.VERCEL_AUTH_BEARER_TOKEN ?? throwMissingEnv("VERCEL_AUTH_BEARER_TOKEN"),
    PROJECT_ID_VERCEL: process.env.PROJECT_ID_VERCEL ?? throwMissingEnv("PROJECT_ID_VERCEL"),
    TEAM_ID_VERCEL: process.env.TEAM_ID_VERCEL,
    BASE_DOMAIN: process.env.BASE_DOMAIN ?? throwMissingEnv("BASE_DOMAIN"),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? throwMissingEnv("NEXTAUTH_URL"),
    RESEND_API_KEY: process.env.RESEND_API_KEY ?? throwMissingEnv("RESEND_API_KEY"),
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ?? throwMissingEnv("UPSTASH_REDIS_REST_URL"),
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ?? throwMissingEnv("UPSTASH_REDIS_REST_TOKEN"),
};

function throwMissingEnv(variable: string): never {
    throw new Error(`Missing environment variable: ${variable}`);
}