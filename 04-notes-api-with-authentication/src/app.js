const express = require("express")
const notesRoute = require("../src/routes/notes.route")
const cookieParser = require("cookie-parser")
const authRoute = require("../src/routes/auth.route") 

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/note",notesRoute)


module.exports = app