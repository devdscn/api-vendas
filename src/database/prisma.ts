import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  //log: ['query', 'error'],
  log: ['info', 'warn', 'error'],
});
