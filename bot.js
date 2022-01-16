import logjs from 'log4js';
import dotenv from 'dotenv';
import { Client } from 'discord.js';

dotenv.config();

const client = new Client({
  partials: ['CHANNEL'],
  intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'DIRECT_MESSAGE_TYPING'],
});

const token = process.env.TOKEN;

const { configure, getLogger } = logjs;

configure({
  appenders: {
    multi: {
      type: 'multiFile',
      base: 'history/',
      property: 'categoryName',
      extension: '.log'
    },
  },
  categories: {
    default: { appenders: ['multi'], level: 'all' },
  }
});

const createGuildMessageHistory = getLogger('GUILD_HISTORY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'artemis') {
    await interaction.reply('Nobody even knows who I am.');
  }

  return;
});

let authorIdentifier;

const genAuthorIdentifier = (authorName, authorTag) => {
  authorIdentifier = `${authorName}#${authorTag}`;
}

client.on('messageCreate', message => {
  const authorMessage = message.content;
  const authorName = message.author.username;
  const authorTag = message.author.discriminator;
  const taggedMessage = `${authorName}#${authorTag}: ${authorMessage}`;

  if (message.author.bot !== true) {
    genAuthorIdentifier(authorName, authorTag);
  }

  if (message.channel.type === 'GUILD_TEXT') {
    createGuildMessageHistory.all(taggedMessage);

    if (message.content === 'puzzle') {
      message.author.send('?');
      return
    }
  }

  if (message.channel.type === 'DM') {
    getLogger(`${authorIdentifier}`).all(taggedMessage);
  }

  if (message.content === 'Hello Artemis') {
    message.reply(`Hello ${message.member.nickname}`);
    return
  }

  if (message.channel.type === 'DM' && message.content === 'oi') {
    message.author.send('tudo bem?');
    return
  }
});

client.login(token);
