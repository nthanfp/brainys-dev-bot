import 'dotenv/config';
import qrcode from 'qrcode-terminal';
import whatsappWeb from 'whatsapp-web.js';
import { setRepoVisibility, checkResponseTime, getHelp } from './commands/index.js';

const { Client } = whatsappWeb;

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client udah siap! 🎉');
});

client.on('message', async (message) => {
    const body = message.body.trim();

    // Cek apakah pesan dimulai dengan command
    if (body.startsWith('!')) {
        const [command, ...args] = body.split(' ');

        let responseMessage = '';

        switch (command) {
            case '!setRepoVisibility':
                const [owner, repo, visibility] = args;
                if (!owner || !repo || !visibility) {
                    responseMessage = 'Cara pakai: !setRepoVisibility <owner> <repo> <public|private>';
                } else if (visibility !== 'public' && visibility !== 'private') {
                    responseMessage = 'Visibilitas salah. Pakai "public" atau "private".';
                } else {
                    responseMessage = await setRepoVisibility(owner, repo, visibility);
                }
                break;

            case '!checkResponseTime':
                const [url] = args;
                if (!url) {
                    responseMessage = 'Cara pakai: !checkResponseTime <url>';
                } else {
                    responseMessage = await checkResponseTime(url);
                }
                break;

            case '!help':
                responseMessage = getHelp();
                break;

            default:
                responseMessage = 'Command nggak dikenal. Coba lagi!';
                break;
        }

        if (responseMessage) {
            await message.reply(responseMessage);
        }
    }
});

client.initialize();
