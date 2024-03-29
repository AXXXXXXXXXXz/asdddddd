const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1175250115221532713/1223271801887391846/furinaxxd.gif?ex=66193fa4&is=6606caa4&hm=de94b2e88d0841b9f96e8da7477903c90463d8a0a20b00bd8952b69ad1b39213&=',
    'https://media.discordapp.net/attachments/1175250115221532713/1223271802449563800/furinaxxxd.gif?ex=66193fa4&is=6606caa4&hm=dbabcfec169a79a4b32b9bc5695ad0f133cf024834933d42faba91a35972963a&=',
    'https://media.discordapp.net/attachments/1175250115221532713/1223271802998886410/furniaxxxxd.gif?ex=66193fa5&is=6606caa5&hm=28807cf2766f6e2fab78a9a5f11ec596e885eebf8c5fc4b3a2e8aa0f87d8b6e2&='
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 รับรันเม็ดม่วงราคาถูก 」',
    '「 รับบูสดิสราคาถูก 」',
    '「 รับรันบอทราคาถูก 」',
    '「 รับรันดักซองราคาถูก 」',
    // Add more state texts as needed
];

let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
    console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
    var startedAt = Date.now();
    console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

    setInterval(() => {
        const currentTime = getCurrentTime();
        const currentDate = getCurrentDate();

        const r = new Discord.RichPresence()
            .setApplicationId('1121867777867788309')
            .setType('STREAMING')
            .setURL('https://www.youtube.com/watch?v=RMo3SR1G1yg&list=RDRMo3SR1G1yg&start_radio=1')
            .setState(stateTexts[currentStateIndex])
            .setName('🌊 เข้ามาดิส')
            .setDetails(` ﹝ ⌚${currentTime} | 🌊 Quarina ﹞ `)
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`﹝ 📅 ${currentDate}  | 🛸 0 m/s ﹞`)
            .setAssetsLargeImage(largeImages[currentLargeImageIndex])
            .setAssetsSmallText('🌊 Quarina')
            .addButton('เข้าดิส', 'https://discord.gg/fakelinkclub');

        // Set the rich presence directly through setPresence
        client.user.setPresence({ activities: [r] });

        currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
        currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
    }, 5000); // Change large image and state text every 1 second
});

function getCurrentDate() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = a.toLocaleDateString("en-US", c);
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
}

function getCurrentTime() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
    return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
