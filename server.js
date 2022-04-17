/**
 *
 * This application is dedicated for running a fully IoT devices connected to this server
 * For now, it is built to handle 4 microships which are ESP32
 * This application can handle more than 20 ESP32 devices connected simultaneously
 *
 * ABOUT: React.js Node.js STACK
 *
 */

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "lib")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "lib", "index.html"));
});

app.listen(port, () => console.log(`App is live on port ${port}!`));
