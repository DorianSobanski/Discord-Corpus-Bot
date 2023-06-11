const Discord = require('discord.js');

const client = new Discord.Client({ intents: 771 });

client.once('ready', () => {
  console.log("Corpus Bot is online");

  client.user.setActivity("Sea Shanties", { type: 'LISTENING' });

  let guild;
  let membersChannel;
  let onlineChannel;
  let offlineChannel;
  let dateChannel;

  client.on('guildCreate', (guild) => {
    // Assign channels when joining a guild
    fetchChannels(guild);
  });

  client.on('guildDelete', (guild) => {
    // Clear assigned channels when leaving a guild
    membersChannel = null;
    onlineChannel = null;
    offlineChannel = null;
    dateChannel = null;
  });

  function fetchChannels(guild) {
    membersChannel = guild.channels.cache.get('1037099570020241439');
    onlineChannel = guild.channels.cache.get('1037099673179127859');
    offlineChannel = guild.channels.cache.get('1037099702065299476');
    dateChannel = guild.channels.cache.get('771733587962626058');
  }

  function countMembers() {
    if (!guild) return; // If the guild is not fetched, exit the function

    membersChannel.setName(`👥》There are ${guild.memberCount} pirates!`);
    
    const onlineMembers = guild.members.cache.filter(
      m => m.presence?.status === 'online' ||
      m.presence?.status === 'idle' ||
      m.presence?.status === 'dnd'
    );

    onlineChannel.setName(`🟢》 ${onlineMembers.size}`);
    offlineChannel.setName(`🔴》 ${guild.memberCount - onlineMembers.size}`);
    
    console.log(`Status updated: ${guild.memberCount} total, ${guild.memberCount - onlineMembers.size} offline, ${onlineMembers.size} online`);
  }

  function countDate(){
    const today = new Date();
    const start = new Date('09/05/2019');
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const days = String(diff);

    dateChannel.setName(`🌞》It's been ${days} days!`);

    console.log(`Date difference updated: ${days} days`);
  }

  setInterval(() => {
    countMembers();
    countDate();
  }, 60000);
});

client.login('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
