/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  console.log('PRISMA CLIENT INSTANTIATED');
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;