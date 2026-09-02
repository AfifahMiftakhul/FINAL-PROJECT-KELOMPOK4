import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchPublicEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_BASE_URL}/api/events/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || 'Gagal mengambil data event.'
        );
      }

      const eventList = data.events || data.data || [];

      setEvents(Array.isArray(eventList) ? eventList : []);
    } catch (err) {
      console.error('Gagal memuat event:', err);
      setError(err.message || 'Gagal memuat event.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-blue-600">
              AI Event Description Generator
            </h1>
            <p className="text-xs text-gray-500">
              Temukan berbagai event menarik
            </p>
          </div>

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Login Admin
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Temukan Event Menarik
          </h2>

          <p className="text-blue-100">
            Lihat berbagai seminar, workshop, dan event lainnya
            yang tersedia.
          </p>
        </div>
      </section>

      {/* Event List */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Event Tersedia
          </h2>

          <button
            onClick={fetchPublicEvents}
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">
              Memuat event...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-red-600 text-sm mb-3">
              {error}
            </p>

            <button
              onClick={fetchPublicEvents}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">
              Belum ada event yang tersedia.
            </p>
          </div>
        )}

        {/* Events */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {event.kategori}
                </span>

                <h3 className="text-lg font-bold text-gray-800 mt-3">
                  {event.nama_event}
                </h3>

                <div className="mt-3 space-y-1 text-sm text-gray-500">
                  <p>📅 {event.tanggal}</p>
                  <p>⏰ {event.waktu}</p>
                  <p>📍 {event.lokasi}</p>
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full mt-5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2 rounded-lg transition"
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {selectedEvent.kategori}
                </span>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {selectedEvent.nama_event}
                </h2>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
                aria-label="Tutup detail event"
              >
                ×
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-600 border-b border-gray-100 pb-4">
              <p>
                <strong>Tanggal:</strong>{' '}
                {selectedEvent.tanggal}
              </p>

              <p>
                <strong>Waktu:</strong>{' '}
                {selectedEvent.waktu}
              </p>

              <p>
                <strong>Lokasi:</strong>{' '}
                {selectedEvent.lokasi}
              </p>

              {selectedEvent.info_pendaftaran && (
                <p>
                  <strong>Pendaftaran:</strong>{' '}
                  {selectedEvent.info_pendaftaran}
                </p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Deskripsi Event
              </h3>

              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                {selectedEvent.deskripsi ||
                  'Deskripsi event belum tersedia.'}
              </p>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;