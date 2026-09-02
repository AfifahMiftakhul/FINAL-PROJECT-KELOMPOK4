# Fullstack Template

Starter template sederhana: `backend` (Express) + `frontend` (Vite + React +
Tailwind). Backend cuma punya 1 endpoint (`/health`) sebagai contoh, frontend
nampilin status koneksi ke backend itu di halaman utama.

## Struktur
```
fullstack-template/
├── backend/     # Express API (app.js, config/, routes/, controllers/, utils/) - lihat backend/README.md
└── frontend/    # Vite + React + Tailwind - lihat frontend/README.md
```

Tiap folder (termasuk sub-folder di `frontend/src/`) punya README sendiri
yang jelasin isi & fungsinya masing-masing.

## Cara jalanin semuanya

Butuh 2 terminal terpisah (backend & frontend jalan bareng):

**Terminal 1 - Backend:**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Jalan di `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Jalan di `http://localhost:5173`

Buka `http://localhost:5173` di browser - kalo backend-nya juga jalan,
halaman utama bakal nunjukin badge hijau "Backend Aktif" beserta respons
JSON dari `/health`.

## Cara pake template ini buat project baru

1. Backend: tambah model/route/controller baru ngikutin pola `health.*`
   yang udah ada (`routes/<nama>.routes.js` + `controllers/<nama>.controller.js`)
2. Frontend: tambah halaman baru di `pages/`, daftarin di `routes/index.jsx`,
   pisahin logic data-nya ke `hooks/`, potongan UI reusable ke `components/`

<img width="1365" height="684" alt="dashboard" src="https://github.com/user-attachments/assets/38c4b3f2-3770-410d-a91f-a39eb878529f" />Dashboard Penyelenggara: Tempat penyelenggara yang telah login dapat menambah event baru dengan mengisi nama, kategori, tanggal, waktu, lokasi, dan informasi pendaftaran.

<img width="1365" height="676" alt="Daftar event" src="https://github.com/user-attachments/assets/db312231-a6cb-4863-a0b7-db2389445cd9" /> Fitur AI Generate: Pengguna dapat memilih gaya bahasa (seperti Formal atau Santai) lalu menekan tombol Generate Deskripsi AI agar sistem menyusun deskripsi acara secara otomatis.

<img width="1365" height="685" alt="Diskripsi" src="https://github.com/user-attachments/assets/2c8b8c72-f0df-4d00-b44e-f9cfa767a934" /> Pengelolaan Event (CRUD): Penyelenggara dapat melihat daftar event yang telah dibuat, serta melakukan perubahan atau menghapusnya melalui tombol Edit dan Hapus.

<img width="1365" height="684" alt="Halaman utama" src="https://github.com/user-attachments/assets/0c52a697-abed-4b07-bc48-dfcbe335c97b" /> Halaman Publik: Masyarakat umum dapat mengunjungi halaman utama website untuk melihat daftar event yang tersedia secara lengkap beserta detail waktunya tanpa harus melakukan login.

<img width="1365" height="676" alt="Login" src="https://github.com/user-attachments/assets/d6a1d1df-322c-4414-95ac-78bdeb9fed10" /> Halaman Login Penyelenggara: Menyediakan form email dan password untuk autentikasi masuk ke sistem, lengkap dengan opsi tautan pendaftaran bagi akun baru.

<img width="1365" height="680" alt="register" src="https://github.com/user-attachments/assets/32e4c410-3128-4b81-8a83-cc8f1883ef8e" /> 
Halaman Register Akun Baru: Memungkinkan penyelenggara baru untuk mendaftarkan akun dengan memasukkan nama lengkap/organisasi, email, serta password.

<img width="1365" height="687" alt="data pendaftram event" src="https://github.com/user-attachments/assets/b0968289-c5ce-4e6e-865c-dd2a0c6c340e" /> Daftar Event Saya: Menampilkan daftar card event yang berhasil dibuat oleh penyelenggara yang sedang login, dilengkapi tombol Edit dan Hapus untuk mengelola data acara secara mandiri.




