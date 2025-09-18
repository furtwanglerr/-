const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

// Discord 클라이언트 초기화
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// 봇이 준비되었을 때 실행
client.once('ready', () => {
  console.log(`로그인 성공: ${client.user.tag}`);
});

// 메시지 이벤트 처리
client.on('messageCreate', async (message) => {
  // 봇 자신의 메시지 무시
  if (message.author.bot) return;

  // rmrf 명령어 감지
  if (message.content.toLowerCase() === 'rmrf') {
    try {
      // 원래 채널 정보 저장
      const oldName = message.channel.name;
      const oldPosition = message.channel.position;
      const oldParent = message.channel.parentId;

      // 현재 채널 삭제
      await message.channel.delete();

      // 같은 서버에 원래 이름과 위치로 새 채널 생성
      await message.guild.channels.create({
        name: oldName,
        type: ChannelType.GuildText,
        parent: oldParent,
        position: oldPosition,
      });

      console.log(`채널 '${oldName}' 삭제 후 동일 이름과 위치로 재생성 완료: ${message.guild.name}`);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }
});


client.login(process.env.TOKEN);