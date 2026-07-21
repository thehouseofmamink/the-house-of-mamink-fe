# The House of Mamink — Frontend

Website customer dan dashboard pemilik untuk mengelola profil, aktivitas, dan galeri.

## Menjalankan di lokal

Frontend membutuhkan backend The House of Mamink yang aktif. Gunakan dua terminal.

### 1. Jalankan backend

```bash
cd ../the-house-of-mamink-be
npm install
npx prisma generate
npm run start:dev
```

Backend berjalan di `http://localhost:4000`. Pastikan file `.env` backend memiliki `DATABASE_URL`, `DIRECT_URL`, dan `JWT_SECRET` yang aktif. Jika muncul error Prisma `P1001`, database tidak dapat dijangkau dan perlu diaktifkan atau diperbarui koneksinya.

### 2. Hubungkan dan jalankan frontend

Salin `.env.example` menjadi `.env.local`, kemudian pastikan nilainya:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Jalankan:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Pemeriksaan koneksi

Ketika frontend dan backend sudah berjalan, jalankan:

```bash
npm run check:local
```

Pemeriksaan ini menguji halaman frontend serta endpoint `/profile`, `/activities`, dan `/gallery` tanpa mengubah data.

## Kontrak data

- Profile: `name`, `region`, `avatar`, `email`, `phone`, `instagram`, `description`.
- Activity: `title`, `description`, `date`, `image`.
- Gallery: `title`, `description`, `image`.
- File activity dan gallery dikirim sebagai `multipart/form-data` pada field `image`.
- Gambar yang disimpan backend tersedia melalui `/uploads/{filename}`.

Catatan: model gallery saat ini belum memiliki field status publikasi seperti `draft` atau `published`. Teks/status cerita menggunakan field `description`.
