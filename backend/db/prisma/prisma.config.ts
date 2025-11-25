import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import "dotenv/config";
import { env } from "prisma/config";

export default {
  schema: path.join('schemas', 'prisma'),
  migrations: {
    path: path.join(__dirname, 'migrations'),
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
} satisfies PrismaConfig;
