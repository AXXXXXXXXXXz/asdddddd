const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1213850034056069208/1215171673440002108/back1.gif?ex=65fbc7cf&is=65e952cf&hm=62d98a63853ba01d71831bc822249e2a5744314bdac58a9be1e72e8c3405a6ca&=',
    'https://media.discordapp.net/attachments/1213850034056069208/1215171673133809704/back2.gif?ex=65fbc7cf&is=65e952cf&hm=104755ead3289dfa913924132712e92d037cb4f6c038b5a9ab1a378f19f6f74f&=',
    'https://media.discordapp.net/attachments/1213850034056069208/1215171672793944084/back3.gif?ex=65fbc7cf&is=65e952cf&hm=62d3279d9090aadddb56d018ebc8343222b398d4ba0c79dacbe5ddba5471d779&=',
    'https://media.discordapp.net/attachments/1213850034056069208/1215171672450007040/back4.gif?ex=65fbc7cf&is=65e952cf&hm=f333fc3d4e03826db0c7121b22bdda457624c8f337025930fa3cd0c71ae48702&=',
    'https://media.discordapp.net/attachments/1213850034056069208/1215171671951155250/back5.gif?ex=65fbc7cf&is=65e952cf&hm=8811bf3ebd5619b619d1feffc9dff47def31c9dd87997a4471962233a032c996&=',
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
