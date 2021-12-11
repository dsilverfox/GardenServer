require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const controllers = require('./controllers')


app.use(Express.json());
app.use(require('./middleware/validate-jwt'));
dbConnection.authenticate()
    .then(()=> dbConnection.sync())
    //.then(()=> dbConnection.sync())
    .then(()=> {
        app.listen(3000, () => {
            console.log(`[Server]: Server is authenticated and App is running on port 3000.`)
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

//test route - Verified

app.use('/test', (req, res) => {
    res.send("This is a message from the test endpoint of the Garden App Server's app.js")
})

//Actual Routes
app.use('/user', controllers.usercontroller);