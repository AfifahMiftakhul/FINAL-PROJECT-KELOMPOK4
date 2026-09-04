# 🤖 AI Event Description Generator

> **Capstone Project - Mata Kuliah Pengembangan Aplikasi Web (PAW)**  
> **Kelompok 4**

---

## 📌 Tentang Proyek
**AI Event Description Generator** adalah aplikasi web yang dirancang untuk membantu panitia seminar, workshop, maupun organisasi mahasiswa dalam membuat deskripsi acara secara otomatis menggunakan **Gemini AI**. Aplikasi ini menyediakan kustomisasi gaya bahasa (**Formal** atau **Santai**) agar deskripsi yang dihasilkan sesuai dengan karakteristik acara[cite: 1].

Selain pembuatan deskripsi otomatis, sistem ini dilengkapi dengan fitur pengelolaan event berbasis kepemilikan (*single-role user management*) dan halaman publik yang dapat diakses oleh masyarakat umum tanpa perlu login[cite: 1].

---

## 👥 Anggota Kelompok 4
| Nama | NIM | Fokus Tugas |
| :--- | :--- | :--- |
| **Afifah Miftakhul** | `20240140072` | Login & Register (Autentikasi JWT)[cite: 1] |
| **Wulandhika Kurnaliawati** | `20240140064` | CRUD Event Management[cite: 1] |
| **Chintya Nuryaman** | `20240140195` | Integrasi Generate Deskripsi dengan Gemini AI[cite: 1] |
| **Nur Azizah Ulinnuha** | `20240140252` | Pilihan Gaya Bahasa & Penyempurnaan Prompt AI[cite: 1] |

---

## 🛠️ Tech Stack
* **Frontend:** Vite + React + Tailwind CSS[cite: 1]
* **Backend:** Node.js + Express.js (REST API, MVC structure)[cite: 1]
* **Database & Auth:** Supabase PostgreSQL, JWT (JSON Web Token), bcrypt[cite: 1]
* **AI Engine:** Gemini AI API[cite: 1]
* **Deployment:** Vercel (Frontend) / Railway (Backend)[cite: 1]

---

## ✨ Fitur Utama
1. **Autentikasi Pengguna:** Sistem *Register* dan *Login* aman menggunakan enkripsi *bcrypt* dan token *JWT*[cite: 1].
2. **Manajemen Event (CRUD):** Penyelenggara dapat menambah, melihat, mengedit, dan menghapus event miliknya sendiri (dengan proteksi *user_id* di backend)[cite: 1].
3. **AI Description Generator:** Pembuatan deskripsi acara otomatis menggunakan Gemini AI berdasarkan detail acara yang dimasukkan[cite: 1].
4. **Pilihan Gaya Bahasa:** Kustomisasi prompt untuk menghasilkan gaya bahasa **Formal** (baku dan resmi) atau **Santai** (akrab dan ringan)[cite: 1].
5. **Halaman Publik:** Masyarakat umum dapat melihat daftar event aktif tanpa harus memiliki akun atau melakukan login[cite: 1].


<img width="1365" height="684" alt="dashboard" src="https://github.com/user-attachments/assets/38c4b3f2-3770-410d-a91f-a39eb878529f" /> Dashboard Penyelenggara: Tempat penyelenggara yang telah login dapat menambah event baru dengan mengisi nama, kategori, tanggal, waktu, lokasi, dan informasi pendaftaran.

<img width="1365" height="676" alt="Daftar event" src="https://github.com/user-attachments/assets/db312231-a6cb-4863-a0b7-db2389445cd9" /> Fitur AI Generate: Pengguna dapat memilih gaya bahasa (seperti Formal atau Santai) lalu menekan tombol Generate Deskripsi AI agar sistem menyusun deskripsi acara secara otomatis.

<img width="1365" height="685" alt="Diskripsi" src="https://github.com/user-attachments/assets/2c8b8c72-f0df-4d00-b44e-f9cfa767a934" /> Pengelolaan Event (CRUD): Penyelenggara dapat melihat daftar event yang telah dibuat, serta melakukan perubahan atau menghapusnya melalui tombol Edit dan Hapus.

<img width="1365" height="684" alt="Halaman utama" src="https://github.com/user-attachments/assets/0c52a697-abed-4b07-bc48-dfcbe335c97b" /> Halaman Publik: Masyarakat umum dapat mengunjungi halaman utama website untuk melihat daftar event yang tersedia secara lengkap beserta detail waktunya tanpa harus melakukan login.

<img width="1365" height="676" alt="Login" src="https://github.com/user-attachments/assets/d6a1d1df-322c-4414-95ac-78bdeb9fed10" /> Halaman Login Penyelenggara: Menyediakan form email dan password untuk autentikasi masuk ke sistem, lengkap dengan opsi tautan pendaftaran bagi akun baru.

<img width="1365" height="680" alt="register" src="https://github.com/user-attachments/assets/32e4c410-3128-4b81-8a83-cc8f1883ef8e" /> 
Halaman Register Akun Baru: Memungkinkan penyelenggara baru untuk mendaftarkan akun dengan memasukkan nama lengkap/organisasi, email, serta password.

<img width="1365" height="687" alt="data pendaftram event" src="https://github.com/user-attachments/assets/b0968289-c5ce-4e6e-865c-dd2a0c6c340e" /> Daftar Event Saya: Menampilkan daftar card event yang berhasil dibuat oleh penyelenggara yang sedang login, dilengkapi tombol Edit dan Hapus untuk mengelola data acara secara mandiri.

<img width="1280" height="584" alt="image" src="https://github.com/user-attachments/assets/1637b286-ca8c-4a19-8de7-337413b11609" />
Konfirmasi Hapus Event: Menampilkan kotak dialog peringatan (pop-up) bertuliskan "Yakin ingin menghapus event ini?" dengan pilihan tombol Cancel atau OK untuk memastikan tindakan penghapusan data.

<img width="1280" height="680" alt="image" src="https://github.com/user-attachments/assets/caa5191b-cf34-4540-a16d-a23e684067ff" /> : Form Edit Event: Menyediakan antarmuka khusus untuk mengubah rincian acara yang sudah ada, lengkap dengan tombol Batal Edit serta kolom deskripsi yang dapat disesuaikan kembali.

<img width="800" height="447" alt="image" src="https://github.com/user-attachments/assets/9bed0cc9-cc1b-4aa8-b69e-086f2aa80b86" /> : Notifikasi Keberhasilan: Memunculkan jendela pemberitahuan pop-up "Event berhasil diperbarui!" dengan tombol Close setelah proses penyimpanan perubahan data selesai dilakukan.


postman login
<img width="1440" height="900" alt="Screenshot 2026-09-02 at 18 24 13" src="https://github.com/user-attachments/assets/d44ed498-2cdc-4a25-ba1a-5f35926e9a7f" />






PRD
# AI Event Description Generator

AI Event Description Generator adalah aplikasi web yang membantu penyelenggara seminar, workshop, dan organisasi mahasiswa dalam membuat deskripsi event secara lebih cepat dengan memanfaatkan Gemini AI.

Aplikasi menyediakan fitur Login & Register, pengelolaan event (CRUD), pembuatan deskripsi menggunakan Gemini AI, pilihan gaya bahasa Formal atau Santai, serta halaman publik untuk melihat event tanpa perlu login.

## 🎯 Tujuan

- Mempercepat proses pembuatan deskripsi event.
- Memberikan pilihan gaya bahasa Formal atau Santai.
- Menyediakan pengelolaan event melalui fitur CRUD.
- Membatasi pengelolaan event berdasarkan kepemilikan user.
- Menyediakan halaman publik untuk melihat event tanpa login.
- Mengintegrasikan AI generatif melalui Gemini AI.

## 👥 Target Pengguna

### Penyelenggara

Penyelenggara seminar, workshop, dan organisasi mahasiswa yang dapat:

- Register dan Login.
- Membuat event.
- Melihat event miliknya.
- Mengedit event miliknya.
- Menghapus event miliknya.
- Menggunakan Gemini AI untuk membuat deskripsi event.

### Pengunjung Umum

Pengunjung yang dapat melihat daftar event yang tersedia tanpa perlu melakukan login.

## ✨ Fitur Utama

- Register
- Login
- Authentication menggunakan JWT
- Password hashing menggunakan bcrypt
- CRUD Event
- Generate Deskripsi menggunakan Gemini AI
- Pilihan gaya bahasa Formal atau Santai
- Halaman Event Publik
- Pembatasan akses berdasarkan kepemilikan event

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Vite + React + Tailwind CSS |
| Backend | Node.js + Express.js |
| API | REST API |
| Authentication | JWT |
| Password Security | bcrypt |
| Database | Supabase PostgreSQL |
| AI Engine | Gemini AI API |
| Frontend Deployment | Vercel |
| Backend Deployment | Railway |

Frontend dan backend dikembangkan dalam folder terpisah dan berkomunikasi menggunakan REST API.


## 🔐 Security

- Password disimpan dalam bentuk hash menggunakan bcrypt.
- JWT digunakan untuk autentikasi pengguna.
- Kepemilikan event divalidasi pada backend.
- API key Gemini disimpan pada environment variable backend.
- User hanya dapat mengelola event miliknya sendiri.

## 👩‍💻 Struktur Tim

| Anggota | Fokus |
|---|---|
| Afifah Miftakhul | Login & Register |
| Wulandhika Kurnaliawati | CRUD Event |
| Chintya Nuryaman | Generate Deskripsi dengan Gemini AI |
| Nur Azizah Ulinnuha | Pilihan Gaya Bahasa & penyempurnaan prompt AI |

## 📌 User Flow

### Penyelenggara

1. Register/Login.
2. Masuk ke halaman pengelolaan event.
3. Menambah event.
4. Mengisi informasi event.
5. Memilih gaya bahasa Formal atau Santai.
6. Generate deskripsi menggunakan Gemini AI.
7. Melihat hasil deskripsi.
8. Mengedit atau generate ulang deskripsi.
9. Menyimpan event.
10. Event dapat muncul pada halaman publik.

### Pengunjung Umum

1. Membuka website.
2. Melihat daftar event.
3. Tidak perlu login.
4. Tidak memiliki akses untuk mengubah atau menghapus event.

## 📋 Scope

### In-Scope

- Login & Register
- CRUD Event
- Generate Deskripsi dengan Gemini AI
- Pilihan Gaya Bahasa Formal/Santai
- Halaman Event Publik
- Informasi Pendaftaran

### Out-of-Scope

- Pendaftaran peserta event
- Payment gateway
- Aplikasi mobile native
- Gaya bahasa selain Formal dan Santai
- Fitur di luar pengelolaan event dan pembuatan deskripsi AI

## 📄 Project Information

**Mata Kuliah:** PAW (Pengembangan Aplikasi Web) - Final Project  
**Kelompok:** Kelompok 4  
**Project:** AI Event Description Generator
