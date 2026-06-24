import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};
// ถอดรหัสข้อความจาก Env กลับมาเป็นกุญแจ SSL
const sslCert = process.env.DB_SSL_CERT
    ? Buffer.from(process.env.DB_SSL_CERT, 'base64').toString('ascii')
    : undefined;

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true,
    // สำหรับ Prisma Client ดั้งเดิม (ไม่ใช่ Edge/Driver Adapter)
    // ให้แนบ cert เข้าไปตรงๆ แบบนี้ได้เลยครับ
    ...(sslCert && {
        engineOptions: {
            cert: sslCert
        }
    })
});

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: ["error", "warn"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}