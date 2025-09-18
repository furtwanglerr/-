const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`로그인 성공: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  // rmrf
  if (message.content.toLowerCase() === 'rmrf') {
    try {
      // 원래 채널
      const oldName = message.channel.name;
      const oldPosition = message.channel.position;
      const oldParent = message.channel.parentId;

      // 삭제
      await message.channel.delete();

      // 위치
      await message.guild.channels.create({
        name: oldName,
        type: ChannelType.GuildText,
        parent: oldParent,
        position: oldPosition,
      });

      console.log(`채널 '${oldName}' 앙기모띠: ${message.guild.name}`);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }
});

const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

client.login(process.env.TOKEN);


