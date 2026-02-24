require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    
    ]
});

// 🔴 PEGA AQUÍ TU TOKEN
const TOKEN = process.env.TOKEN;

// 🔵 PON AQUÍ EL ID DEL CANAL WELCOME
const WELCOME_CHANNEL_ID = "1475909897265877103";

const frases = [
    "¡Miren quién llegó",
    "Ya está aquí",
    "Llegó a la fiesta",
    "Nos alegra que hayas venido",
    "¡Qué bueno verte"
];

client.on("guildMemberAdd", (member) => {

    const canal = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!canal) return;

    const fraseRandom = frases[Math.floor(Math.random() * frases.length)];

    canal.send(`➡️ ${fraseRandom}, ${member}!`);
});

client.on("messageCreate", async (message) => {
  // Ignorar mensajes del propio bot
  if (message.author.bot) return;

  // Verificar que esté en el canal de música
  if (message.channel.name === "canciones-del-canal") {

    // Si el mensaje tiene archivos adjuntos
    if (message.attachments.size > 0) {
      await message.react("🎵");
      await message.react("☀️");
    }
  }
});

client.once("clientReady", () => {
    console.log(`Bot listo como ${client.user.tag}`);
});

client.login(TOKEN);