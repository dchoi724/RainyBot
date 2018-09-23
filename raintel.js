const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let subscribers = new Array(); // global list of subscribers

// message lambda
client.on('message', msg => {
  if (msg.content === /^weather subscribe$/) {
    msg.reply(msg.author.username + " subscribed to PM rain alerts.");
    subscribers.push(msg.author);
  }
  if (msg.content === /^weather unsubscribe$/) {
  	msg.reply(msg.author.username + " unsubscribed from PM rain alerts.");
    subscribers = subscribers.filter((value, index, arr) => value.id === msg.author.id);
  }
});

// array methods



// actively PM users in subscribers list about weather


client.login(config.token);