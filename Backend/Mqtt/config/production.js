require("dotenv").config();

module.exports = {
    server: {
        mqttBroker: {
            protocol: "mqtt",
            protocolVersion: 3,
            host: "82.129.198.197",
            port: "1883",
            username: "ABCDE",
            password: "123456",
        },
        database: {
            host: "localhost",
            user: "root",
            password: "",
            database: "scooter",
        },
        redis: {
            host: "localhost",
            port: 6379,
        },
    },
};
