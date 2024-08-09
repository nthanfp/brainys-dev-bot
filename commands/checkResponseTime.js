import axios from 'axios';

// Fungsi buat cek waktu respons
export async function checkResponseTime(url) {
    const start = Date.now();
    try {
        await axios.get(url);
        const end = Date.now();
        return `Waktu respons buat ${url}: ${end - start} ms 🚀`;
    } catch (error) {
        return `Gagal dapetin waktu respons: ${error.message}`;
    }
}
