import { PrismaClient } from "@prisma/client";


declare global {
  let prisma: typeof PrismaClient | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = (globalThis as any).prisma || new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = client;

export default client;