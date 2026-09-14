require("dotenv").config();

module.exports = {
    server: {
        port: 3000,
        cert: "/home/kibo37ve/crt.txt",
        key: "/home/kibo37ve/key.txt",
        host: "api.beexpress.app",
        redis: {
            host: "127.0.0.1",
            port: 6379,
        },
        channels: {
            chat: "chat-channel",
            notification: "private-notification",
            tracking: "tracking-trip",
            driverOrders: "driver-orders",
        },
    },
};
