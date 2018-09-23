# RainyBot

**RainyBot direct messages all of its subscribers for rain alerts.**

## State:

- Currently only works with zipcodes in the United States.
- Currently messages users at 7:00AM Eastern Time (only if there is rain in their city)

## Instructions:

Simply add my bot to your Discord server: https://discordapp.com/oauth2/authorize?client_id=493450487941693455&permissions=8&scope=bot

If you'd like to host this code on your own discord bot, you will need to supply your own botconfig.json file that specifies Discord app token, command prefix, and OpenWeatherApp API key.

Note: the oauth link gives the bot admin permissions for ease of testing. Consider changing the permissions in the url to do as you see fit.

## Commands:

1. r> ping 
   - Obligatory ping command -> returns "pong"
2. r> subscribe [zipcode]
   - Adds the user to a list of subscribers
3. r> unsubscribe
   - Removes the user from the list of subscribers


