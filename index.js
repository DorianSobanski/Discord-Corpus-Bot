const Discord = require('discord.js');

const client = new Discord.Client({intents: 771});

client.once('ready', () =>
{
    console.log("Corpus Bot jest online");
    
    client.user.setActivity("Szanty", {type: 2});

    let guild = client.guilds.cache.get('353233336405065731');

    function countMembers()
    {
        client.channels.cache.get('1037099570020241439').setName(`👥》Jest ${guild.memberCount} piratów!`);
        client.channels.cache.get('1037099673179127859').setName(`🟢》 ${guild.members.cache.filter(m => m.presence?.status == 'online' || m.presence?.status == 'idle' || m.presence?.status == 'dnd').size}`);
        client.channels.cache.get('1037099702065299476').setName(`🔴》 ${guild.memberCount - guild.members.cache.filter(m => m.presence?.status == 'online' || m.presence?.status == 'idle' || m.presence?.status == 'dnd').size}`);
        
        console.log(`Status przeładowany: ${guild.memberCount} łącznie, ${guild.memberCount - guild.members.cache.filter(m => m.presence?.status == 'online' || m.presence?.status == 'idle' || m.presence?.status == 'dnd').size} offline, ${guild.members.cache.filter(m => m.presence?.status == 'online' || m.presence?.status == 'idle' || m.presence?.status == 'dnd').size} online`);
    } countMembers();

    function countDate(){
        var today = new Date();
        var start = new Date('09/05/2019');
        var diff = ((((Math.abs(today - start) / 1000) / 60) / 60) / 24);
        var days = String(Math.floor(diff)); 

        client.channels.cache.get('771733587962626058').setName(`🌞》To już ${days} dni!`);

        console.log(`Różnica dat przeładowana: ${days} dni`)
    } countDate()

    setInterval(() => 
    {
        countMembers();
        countDate();
    }, 60000);
});

client.login('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
