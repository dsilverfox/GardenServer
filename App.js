require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
app.use(Express.json());
app.use(require('./middleware/headers'));


app.listen(3000, () => {
    console.log(`[Server]: App is listening on Port 3000`)
});
