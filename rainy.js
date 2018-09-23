const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const schedule = require('node-schedule-tz');
const request = require("request");
const client = new Discord.Client();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


client.login(botconfig.token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// TODO: replace with persistent data
var subscribers = new Array(); // global list of subscribers (User -> int)

// message lambda
client.on('message', msg => {
	if(msg.author.bot) return;
	if(msg.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let args = msg.content.split(" ");

	if (args[0] === prefix) {
		// obligatory ping test
		let cmd = args[1];
		if (cmd === `ping` && args.length == 2) {
			msg.channel.send("pong");
		}

		// adds users to subscribers list
		if (cmd === `subscribe` && !isNaN(args[2]) && args.length == 3) {
			// TODO: add check for existing author (or use different structure)
			msg.channel.send(msg.author.username + " subscribed to PM rain alerts. You will receive alerts at 7:00AM EST if there is rain.");
			msg.author.zip = args[2];
			subscribers.push(msg.author);
		}
		// filters user out from the subscribers array
		if (cmd === `unsubscribe`) {
			msg.channel.send(msg.author.username + " unsubscribed from PM rain alerts.");
			subscribers = subscribers.filter((value, index, arr) => value.id !== msg.author.id);
		}
	}
});

// actively PM users in subscribers list about weather
function checkWeather() {
	let wkey = botconfig.weather;
	let dailyCall = new schedule.RecurrenceRule();
	dailyCall.hour = 16;
	dailyCall.minute = 34;
	dailyCall.tz = 'ET';

	// call this once a day at 7:00AM ET
	let r = schedule.scheduleJob(dailyCall, () => { 
		// for each subscriber, make an API call for current weather
	    for (let s of subscribers) {
	    	let url = `http://api.openweathermap.org/data/2.5/weather?zip=${s.zip},us&APPID=${wkey}`;
	    	// TODO: perform ajax request outside
	    	let xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, true);
			xhttp.send();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					let resp = JSON.parse(xhttp.responseText);
					let hasRained = false;

					for (let entry in resp.weather) {
						let weatherInfo = resp.weather[entry];
						if (weatherInfo.description.includes("rain") || weatherInfo.description.includes("drizzle")) {
							hasRained = true;
							break;
						}
					}

					// write direct message to subscriber
					if (hasRained) {
						s.send(`Be sure to bring an umbrella! :umbrella:\nIt's raining in ${resp.name}! :cloud_rain: `);
					}
				}
			};
	    }
	})
}
checkWeather();
