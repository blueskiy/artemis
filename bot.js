require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ partials: ["CHANNEL"], intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES", "DIRECT_MESSAGE_TYPING"] });
const token = process.env.TOKEN;

//On ready action
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'Artêmis') {
    await interaction.reply('Nobody even knows who I am.');
  }

  return;
});

client.on('messageCreate', message => {
  //message.channel.type => DM || GUILD_TEXT
  //CRIAR FORMA DE ARMAZENAR CONVERSAS TIPO HISTÓRICO DO MSN
  console.log(`${message.author.username}: ${message.content}`)
  if (message.content === 'Hello Artemis') {
    message.reply(`Hello ${message.member.nickname}`)

    return
  }

  if (message.content === 'puzzle') {
    //envia mensagem privada
    message.author.send('?')
  }

  if (message.channel.type === 'DM' && message.content === 'oi') {
    message.author.send('tudo bem?')
  }
});

//Put Artemis online
client.login(token);