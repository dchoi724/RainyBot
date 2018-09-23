const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// TODO: replace with persistent data
let subscribers = new Array(); // global list of subscribers

// message lambda
client.on('message', msg => {
	if(msg.author.bot) return;
	if(msg.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let cmd = msg.content;

	if (cmd === `${prefix} ping`) {
		msg.channel.send("pong");
	}
	if (cmd === `${prefix} subscribe`) {
		msg.channel.send(msg.author.username + " subscribed to PM rain alerts.");
		subscribers.push(msg.author);
	}
	if (cmd === `${prefix} unsubscribe`) {
		msg.channel.send(msg.author.username + " unsubscribed from PM rain alerts.");
		subscribers = subscribers.filter((value, index, arr) => value.id !== msg.author.id);
	}
});

// array methods



// actively PM users in subscribers list about weather


client.login(botconfig.token);