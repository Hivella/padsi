// db.js (Kode untuk menguji operasi database)

const { PrismaClient } = require('@prisma/client');
// Inisialisasi Prisma Client. Ini akan membaca DATABASE_URL dari .env
const prisma = new PrismaClient();

async function main() {
  console.log('--- Memulai Pengujian Koneksi & Operasi ---');

  // 1. Buat user baru
  const newUser = await prisma.user.create({
    data: {
      email: 'stella.olivia.lover@example.com',
      name: 'Stella Olivia Lover',
    },
  });
  console.log('✅ User Baru Dibuat:', newUser);

  // 2. Buat project untuk user tersebut
  const newProject = await prisma.project.create({
    data: {
        title: "Project Pertama di Neon",
        description: "Pengujian koneksi melalui Prisma",
        ownerId: newUser.id, // Menghubungkan ke user yang baru dibuat
    }
  });
  console.log('✅ Proyek Baru Dibuat:', newProject);

  // 3. Ambil user dan semua project-nya
  const userWithProjects = await prisma.user.findFirst({
    where: { id: newUser.id },
    include: { projects: true } // Mengambil data project yang berelasi
  });
  console.log('✅ User dan Proyeknya Berhasil Diambil:', userWithProjects);
}

main()
  .catch(e => {
    // Tangani error jika terjadi
    console.error("❌ Terjadi error saat menjalankan query:", e);
  })
  .finally(async () => {
    // Putuskan koneksi database setelah selesai
    await prisma.$disconnect();
    console.log('--- Koneksi Selesai ---');
  });

  