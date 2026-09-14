const mqtt = require("mqtt");
const mysql = require("mysql2/promise");
const redis = require("redis");

const productionData = require("./config/production.js");

// MQTT Configuration
const protocol = productionData.server.mqttBroker.protocol;
const protocolVersion = productionData.server.mqttBroker.protocolVersion;
const mqttBrokerHost = productionData.server.mqttBroker.host; // MQTT broker host
const mqttBrokerPort = productionData.server.mqttBroker.port; // MQTT broker port
const username = productionData.server.mqttBroker.username; // MQTT broker username
const password = productionData.server.mqttBroker.password; // MQTT broker password
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `${protocol}://${mqttBrokerHost}:${mqttBrokerPort}`;

// Redis Configuration
const redisClient = redis.createClient({
    host: "localhost", // Replace with your Redis server host
    port: 6379, // Replace with your Redis server port
});

// Connect to Redis
redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

const databaseHost = productionData.server.database.host;
const databaseUser = productionData.server.database.user;
const databasePassword = productionData.server.database.password;
const databaseName = productionData.server.database.database;

// Database Configuration
const dbConfig = {
    host: databaseHost, // Replace with your DB host
    user: databaseUser, // Replace with your DB user
    password: databasePassword, // Replace with your DB password
    database: databaseName, // Replace with your DB name
};

// Function to get identifiers from the database
async function getIdentifiersFromDatabase() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            "SELECT serial_number FROM scooters"
        );
        return rows.map((row) => row.serial_number); // Return an array of serial numbers
    } catch (err) {
        console.error("Database Error:", err);
        return [];
    } finally {
        if (connection) await connection.end();
    }
}

// Function to update the database with location (latitude and longitude) as POINT with SRID 4326
async function updateLocationInDatabase(identifier, latitude, longitude) {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            "UPDATE scooters SET location = ST_GeomFromText(?, 4326) WHERE serial_number = ?",
            [`POINT(${longitude} ${latitude})`, identifier]
        );
        console.log(
            `Location updated for identifier ${identifier}: ${result.affectedRows} rows affected`
        );
    } catch (err) {
        console.error("Database Update Error:", err);
    } finally {
        if (connection) await connection.end();
    }
}

// Connect to MQTT Broker
const mqttClient = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    protocolVersion: protocolVersion, // Use MQTT v3.1.1
    connectTimeout: 4000,
    username: username, // Replace with your MQTT username
    password: password, // Replace with your MQTT password
    reconnectPeriod: 1000,
});

mqttClient.on("connect", async () => {
    console.log("Connected to MQTT broker");

    // Get devices from the database
    const devices = await getIdentifiersFromDatabase();
    if (devices.length === 0) {
        console.error("No devices found in the database");
        mqttClient.end(); // Disconnect if no devices are found
        return;
    }

    // Construct topics and subscribe
    const topics = devices.map(
        (serialNumber) => `fgt3/${mqttBrokerHost}/${serialNumber}/post`
    );

    mqttClient.subscribe(topics, (err) => {
        if (err) {
            console.error("Subscription Error:", err);
        } else {
            console.log(`Subscribed to topics: ${topics.join(", ")}`);
        }
    });
});

// Updated message handler to process latitude, longitude, and battery percentage
mqttClient.on("message", (topic, payload) => {
    console.log(`Received Message: ${topic} -> ${payload.toString()}`);

    let data;
    try {
        // Sanitize and parse the payload
        const sanitizedPayload = payload.toString().replace(/,\s*}/g, "}");
        data = JSON.parse(sanitizedPayload);
    } catch (err) {
        console.error("Invalid payload format:", payload.toString());
        return;
    }

    // Extract serial number from the topic
    const match = topic.match(/fgt3\/.+?\/(.+?)\/post/);
    if (match) {
        const identifier = match[1];
        const latitude = data.la; // Latitude
        const longitude = data.lo; // Longitude

        if (latitude !== undefined && longitude !== undefined) {
            // Update the location in the database
            updateLocationInDatabase(identifier, latitude, longitude);
        } else {
            console.error("Latitude or Longitude not found in payload:", data);
        }

        const batteryPercentage = data.soc; // Battery percentage
        if (batteryPercentage !== undefined) {
            // Send received data to Redis on channel mqtt:scooter
            redisClient.publish(
                "mqtt:scooter",
                JSON.stringify({ topic, identifier, data }),
                (err, reply) => {
                    if (err) {
                        console.error("Redis Publish Error:", err);
                    } else {
                        console.log(`Data published to Redis channel 'mqtt:scooter': ${reply}`);
                    }
                }
            );
        } else {
            console.error("SOC (battery percentage) not found in payload:", data);
        }
    } else {
        console.error("Topic does not match expected format:", topic);
    }
});

mqttClient.on("error", (err) => {
    console.error("MQTT Error:", err);
});

mqttClient.on("reconnect", () => {
    console.log("Reconnecting to MQTT broker...");
});

mqttClient.on("close", () => {
    console.log("MQTT connection closed");
});
