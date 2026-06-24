const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Testing connection to admin_user table...");
    const user = await prisma.admin_user.findFirst();
    console.log("Success! Found user:", user);
  } catch (error) {
    console.error("Prisma Error (Possible 500 cause):", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
