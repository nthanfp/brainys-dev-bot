import axios from 'axios';

// Fungsi untuk dapetin token GitHub berdasarkan username
export function getGitHubToken(username) {
    const token = process.env[`GITHUB_TOKEN_${username.toUpperCase()}`];
    if (!token) {
        throw new Error(`Token buat ${username} nggak ketemu, kak.`);
    }
    return token;
}

// Fungsi buat ngubah visibilitas repo
export async function setRepoVisibility(owner, repo, visibility) {
    const token = getGitHubToken(owner);
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const data = { visibility };

    try {
        const response = await axios.patch(url, data, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': 'MyGitHubApp',
            },
        });

        return `Repo ${repo} udah diubah jadi ${visibility}. 👍`;
    } catch (error) {
        if (error.response) {
            return `Gagal ubah visibilitas repo: ${error.response.status} ${error.response.statusText}. Data respons: ${error.response.data}`;
        } else if (error.request) {
            return 'Gagal dapetin respons: Nggak ada respons.';
        } else {
            return `Gagal ubah visibilitas repo: ${error.message}`;
        }
    }
}
