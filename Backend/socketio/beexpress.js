const express = require("express");
const app = express();
const fs = require("fs");
const productionData = require("./config/production.js");

const cert = productionData.server.cert;
const key = productionData.server.key;
const redisConfig = productionData.server.redis || {};
const channels = productionData.server.channels || {};

const options = {
    cert: fs.readFileSync(cert),
    key: fs.readFileSync(key),
};

const server = require("https").createServer(options, app);
const io = require("socket.io")(server, {
    cors: {
        methods: ["GET", "PATCH", "POST", "PUT"],
        origin: true,
        credentials: true,
        transports: ["websocket", "polling"],
    },
});

const redis = require("redis");
var redisClient = redis.createClient(redisConfig);
var redisClientNotification = redis.createClient(redisConfig);
var redisClientTracking = redis.createClient(redisConfig);
var redisClientDriverOrders = redis.createClient(redisConfig);

io.on("connection", (socket) => {
    console.log("Client connected");

    redisClient.on("message", function (channel, message) {
        message = JSON.parse(message);
        socket.emit(message.event, message.data);
    });

    redisClientNotification.on("message", function (channel, message) {
        message = JSON.parse(message);
        console.log(message);
        socket.emit(message.event, message.data);
    });

    redisClientTracking.on("message", function (channel, message) {
        message = JSON.parse(message);
        socket.emit(message.event, message);
    });

    redisClientDriverOrders.on("message", function (channel, message) {
        message = JSON.parse(message);
        socket.emit(message.event, message.data);
    });

    redisClient.subscribe(channels.chat || "chat-channel");
    redisClientNotification.subscribe(
        channels.notification || "private-notification"
    );
    redisClientTracking.subscribe(channels.tracking || "tracking-trip");
    redisClientDriverOrders.subscribe(channels.driverOrders || "driver-orders");

    socket.on("disconnect", function () {
        console.log("Client disconnected");
    });
});

const host = productionData.server.host;
const port = productionData.server.port;

server.listen(port, host, () => {
    console.log(`Server running at https://${host}:${port}`);
});
