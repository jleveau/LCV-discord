
const Discord = require('discord.js');
const express = require("express")

const client = new Discord.Client();
const bodyParser = require('body-parser')
const config = require("config")
process.env.TZ = 'Europe/Paris' 


client.login(config.DiscordConfig.discord_token).catch((err) => {
    process.exit()
})
let channel = null

client.on('ready', () => {
    channel = client.channels.find("id", config.DiscordConfig.organisation_channel)
});

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())

app.post('/discord/message', function (req, res) {
    if (req.body && req.body.message) {
        channel
            .send(req.body.message)
            .then(() => {
                res.status(200).send({ status: 200 })
            })
            .catch((err) => {
                res.status(500).send({status: 500, message: err.message})
            })
    } else {
        res.sendStatus(400)
    }
})

const port = config.ServerConfig.port
app.listen(port, function () {
  console.log('discord bot server running on port ' + port)
})

