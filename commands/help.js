// Fungsi untuk ngasih tau daftar command
export function getHelp() {
    return `
Berikut daftar command yang bisa kamu gunakan:

1. **!setRepoVisibility <owner> <repo> <public|private>**: 
   Ubah visibilitas repositori GitHub. 
   - <owner>: Pemilik repositori.
   - <repo>: Nama repositori.
   - <public|private>: Set visibilitas repositori ke public atau private.

2. **!checkResponseTime <url>**: 
   Cek waktu respons dari URL yang diberikan. 
   - <url>: URL yang mau dicek.

3. **!help**: 
   Tampilkan daftar command yang tersedia.
    `;
}
