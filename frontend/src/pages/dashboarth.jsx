import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // State untuk melacak mode edit (menyimpan ID event yang sedang diedit)
  const [editingId, setEditingId] = useState(null);
  
  // State Form Event
  const [formData, setFormData] = useState({
    nama_event: '',
    kategori: 'Seminar',
    tanggal: '',
    waktu: '',
    lokasi: '',
    info_pendaftaran: '',
    gaya_bahasa: 'Formal',
    deskripsi: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchMyEvents();
  }, [token, navigate]);

  // Helper fungsi untuk fetch aman dari respon non-JSON (HTML 404/500)
  const safeFetch = async (url, options = {}) => {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Server Error (${res.status}). Pastikan backend sudah di-restart dan rute API benar.`);
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Terjadi kesalahan pada server');
    }
    return data;
  };

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const data = await safeFetch(`${API_BASE_URL}/api/events/my-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('Data Event dari Backend:', data); // Cek F12 Console jika masih kosong

      // Menyesuaikan berbagai format struktur respons dari backend
      const eventList = data.data || data.events || data.result || data;
      setEvents(Array.isArray(eventList) ? eventList : []);
    } catch (err) {
      console.error('Gagal memuat event:', err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi Generate Deskripsi dengan Gemini AI
  const handleGenerateAI = async () => {
    if (!formData.nama_event || !formData.lokasi) {
      alert('Mohon isi minimal Nama Event dan Lokasi sebelum generate AI!');
      return;
    }

    setGenerating(true);
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      setFormData((prev) => ({ ...prev, deskripsi: data.deskripsi }));
    } catch (err) {
      alert(err.message);
    } finally {
      setGenerating(false);
    }
  };

  // Simpan Event Baru (POST) atau Update Event (PUT)
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `${API_BASE_URL}/api/events/${editingId}`
        : `${API_BASE_URL}/api/events`;
      
      const method = editingId ? 'PUT' : 'POST';

      await safeFetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      alert(editingId ? 'Event berhasil diperbarui!' : 'Event berhasil ditambahkan!');
      
      resetForm();
      fetchMyEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (ev) => {
    setEditingId(ev.id || ev._id);
    setFormData({
      nama_event: ev.nama_event || '',
      kategori: ev.kategori || 'Seminar',
      tanggal: ev.tanggal || '',
      waktu: ev.waktu || '',
      lokasi: ev.lokasi || '',
      info_pendaftaran: ev.info_pendaftaran || '',
      gaya_bahasa: ev.gaya_bahasa || 'Formal',
      deskripsi: ev.deskripsi || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nama_event: '',
      kategori: 'Seminar',
      tanggal: '',
      waktu: '',
      lokasi: '',
      info_pendaftaran: '',
      gaya_bahasa: 'Formal',
      deskripsi: '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus event ini?')) return;
    try {
      await safeFetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar Dashboard */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-blue-600">Dashboard Penyelenggara</h1>
          <p className="text-xs text-gray-500">Halo, {user.nama || 'Admin'}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Form Tambah/Edit Event & AI Generator */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {editingId ? '✏️ Edit Event' : 'Buat Event & Generate AI'}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg font-semibold transition"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmitEvent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Event</label>
                <input
                  type="text"
                  name="nama_event"
                  required
                  value={formData.nama_event}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Seminar Nasional AI 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori</label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Konser">Konser</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal</label>
                <input
                  type="date"
                  name="tanggal"
                  required
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Waktu</label>
                <input
                  type="time"
                  name="waktu"
                  required
                  value={formData.waktu}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Lokasi</label>
                <input
                  type="text"
                  name="lokasi"
                  required
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Auditorium Kampus / Gedung Serbaguna"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Info Pendaftaran</label>
                <input
                  type="text"
                  name="info_pendaftaran"
                  value={formData.info_pendaftaran}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Bit.ly/daftar-seminar atau 08123456789"
                />
              </div>
            </div>

            {/* Pilihan Gaya Bahasa & Tombol AI */}
            <div className="border-t border-gray-100 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Pilih Gaya Bahasa AI</label>
                <select
                  name="gaya_bahasa"
                  value={formData.gaya_bahasa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="Formal">Formal (Resmi & Baku)</option>
                  <option value="Santai">Santai (Akrab & Gaul)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={generating}
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition mt-5 disabled:opacity-50"
              >
                {generating ? 'Menghasilkan Deskripsi AI...' : '✨ Generate Deskripsi AI'}
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Event (Hasil AI / Manual)</label>
              <textarea
                name="deskripsi"
                rows="4"
                value={formData.deskripsi}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Deskripsi akan muncul otomatis lewat Gemini AI atau bisa diketik manual..."
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full text-white text-sm font-semibold py-2.5 rounded-lg shadow-sm transition ${
                editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {editingId ? 'Perbarui Event' : 'Simpan Event Baru'}
            </button>
          </form>
        </div>

        {/* Daftar Event Saya */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Daftar Event Saya</h2>

          {loading ? (
            <p className="text-sm text-gray-500 text-center py-6">Memuat event...</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">Belum ada event yang kamu buat.</p>
          ) : (
            <div className="space-y-4">
              {events.map((ev) => (
                <div key={ev.id || ev._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start gap-4">
                  <div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {ev.kategori}
                    </span>
                    <h3 className="font-bold text-gray-800 mt-1">{ev.nama_event}</h3>
                    <p className="text-xs text-gray-500">📅 {ev.tanggal} | ⏰ {ev.waktu} | 📍 {ev.lokasi}</p>
                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded text-xs">{ev.deskripsi}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEditClick(ev)}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id || ev._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;