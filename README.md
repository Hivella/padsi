# 🚀 LAUNDRY APP API & FRONTEND

Aplikasi autentikasi dan CRUD berbasis Node.js (Express) dan PostgreSQL (Neon).

## Persyaratan (Prerequisites)

1.  Node.js (v18+) dan NPM
2.  PostgreSQL Client (`psql`) terinstal secara global (untuk migrasi Prisma).
3.  Akun Neon.tech (untuk database PostgreSQL).

## Instalasi dan Setup

1.  **Clone Repositori:** (INI ABAIKAN AJA KARENA UDAH DOWNLOAD REPOSITORY DARI GITHUB LANGSUNG)
    ```bash
    git clone [https://www.andarepository.com/](https://www.andarepository.com/)
    cd nama-proyek
    ```

2.  **Instal Dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan Variabel Lingkungan:**
    * Buat salinan file `.env.example` dan ganti namanya menjadi **`.env`**.
    * Edit `.env` dan masukkan `DATABASE_URL` milik Anda dari Neon.

4.  **Siapkan Database (Prisma Migrations):**
    * Perintah ini akan membuat semua tabel (`User`, `Project`) di database Neon Anda.
    ```bash
    npm run migrate dev
    ```

## Menjalankan Aplikasi

1.  **Jalankan Server API (Backend):**
    ```bash
    npm start
    ```
    (Server berjalan di `http://localhost:3000`)

2.  **Akses Frontend (Statik):**
    * Buka *file* **`login.html`** di *browser* Anda.
    * Gunakan Thunder Client/Postman untuk menguji *endpoints* `/users` atau `/projects`.