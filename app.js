require('dotenv').config();
const express = require("express");
const app = express();
const router = require("./routes/routes")
const connect = require('./db/connect');
const notFound = require("./middlewears/notfound");
const errorHandler = require("./middlewears/err");


// middlewears
app.use(express.static("./public"))
// app.use(express.json())

// routes
app.use("/api/v1/tasks", router)

// errH
app.use(notFound)
app.use(errorHandler)

const makeConnection = async () => {
    try {
        await connect(process.env.Bamz_URI)
        app.listen("8080", ()=>{
            console.log("Listening to port 8080")
        })

    } catch (error) {
        console.log(error);
    }
}

makeConnection();
