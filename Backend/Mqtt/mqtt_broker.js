const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const port = 1883;

aedes.authenticate = (client, username, password, callback) => {
    const validUsername = "ABCDE";
    const validPassword = "123456";

    if (username === validUsername && password?.toString() === validPassword) {
        console.log(`Client connected: ${client.id}`);
        return callback(null, true);
    }

    console.log(`Authentication failed for client: ${client.id}`);
    return callback(new Error("Authentication Failed"), false);
};

aedes.on("client", (client) => {
    console.log(`New client connected: ${client.id}`);
});

aedes.on("clientDisconnect", (client) => {
    console.log(`Client disconnected: ${client.id}`);
});

aedes.on("publish", (packet, client) => {
    if (client) {
        console.log(
            `Message published by ${client.id}: ${
                packet.topic
            } -> ${packet.payload.toString()}`
        );
    }
});

server.listen(port, () => {
    console.log(`Aedes MQTT broker started on port ${port}`);
});
