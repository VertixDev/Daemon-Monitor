const express = require("express");
const config = require('./config.json')
const exec = require('child_process').exec;
const app = express();
const server = require("http").createServer(app);
const PORT = "999"

app.get('/wings', function (req, res) {
    if (req.headers.password === config.token) {
        console.log(req.query)
        if (!req.query.action) {
            res.json({ status: "You forgot to send start/restart/stop in the request" })
        } else if (req.query.action === "start") {
            res.json({ status: "Wings started" })
            exec(`systemctl start wings`)
        } else if (req.query.action === "restart") {
            res.json({ status: "Wings restarted" })
            exec(`systemctl restart wings`)
        } else if (req.query.action === "stop") {
            res.json({ status: "Wings stopped" })
            exec(`systemctl stop wings`)
        }
    } else {
        res.send('Invalid or no password provided.')
    }
})

app.get('/status', function (req, res) {
    res.sendStatus(200)
})

server.listen(PORT, function () {
    console.log("Successfully Booted, Awaiting connections...");
});
