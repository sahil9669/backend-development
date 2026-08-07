const express = require("express")
const { auth } = require("../middleware/auth.middleware")
const notesController = require("../controllers/notes.controller")

const router = express.Router()

router.post("/notes", auth, notesController.createNote)

router.get("/notes", auth,  notesController.getNotes)

router.get("/notes/:id", auth,  notesController.getNoteById)

router.put("/notes/:id", auth,  notesController.updateNote)

router.delete("/notes/:id", auth,  notesController.deleteNote)

module.exports = router