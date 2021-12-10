require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.listen(3000, () => {
    console.log(`[Server]: App is listening on Port 3000`)
});