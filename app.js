const path = require("path")
require('dotenv').config();
const express = require("express");
const app = express();
const router = require("./routes/routes")
const connect = require('./db/connect');
const notFound = require("./middlewears/notfound");
const errorHandler = require("./middlewears/err");


// middlewears
// app.use(express.static(path.join(__dirname, 'Public')));
// app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

// routes
app.use("/api/v1/tasks", router)

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"))
// })
// errH
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const makeConnection = async () => {
    try {
        await connect(process.env.Bamz_URI)
        app.listen(PORT, ()=>{
            console.log(`Listening to port ${PORT}`)
        })

    } catch (error) {
        console.log(error);
    }
}

makeConnection();
