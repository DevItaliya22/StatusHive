/* eslint-disable no-var */
// import { PrismaClient } from '@prisma/client';

// const prismaClientSingleton = () => {
//   console.log('PRISMA CLIENT INSTANTIATED');
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

// export default prisma;
import {PrismaClient} from '@prisma/client';

const prismaClientSingleton = () => {
  const client = new PrismaClient();
  console.warn('PRISMA CLIENT INSTANTIATED');
  return client;
}

declare const globalThis : {
  prismaGlobal : ReturnType<typeof prismaClientSingleton> 
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;