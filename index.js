const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1201079123251044402/1201079208672231485/asdad.gif?ex=65c8832e&is=65b60e2e&hm=5dd596430d801f799446c92de44e658dcb85c8cad019cdd946a9d133029beed0&=',
    'https://media.discordapp.net/attachments/1201079123251044402/1201079209070702612/ay.gif?ex=65c8832e&is=65b60e2e&hm=ec2f80677d1f7438c1e63fe53780a53d84050854c6e41dd7d00837f6f3e9fe7b&=',
    'https://media.discordapp.net/attachments/1201079123251044402/1201079209599180850/gasfagasgassvc.gif?ex=65c8832e&is=65b60e2e&hm=bc6911a493772787d8bd4cb4feb19ddecdf94d70c8fad63070b4e548a72ef1e0&=',
    'https://media.discordapp.net/attachments/1201079123251044402/1201079210115072070/asdasdasdasd.gif?ex=65c8832e&is=65b60e2e&hm=b942aa27f9e9019bc44281f05c57a464d5f5ec0dc15573caefca0d0c98e0816b&=',
    'https://media.discordapp.net/attachments/1201079123251044402/1201079211004272810/furina.gif?ex=65c8832e&is=65b60e2e&hm=6b151cad6ecea50530a1e379ca188a8e4661db13761097c521bd474ca1ccdb15&=',
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
    }, 1000); // Change large image and state text every 1 second
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
