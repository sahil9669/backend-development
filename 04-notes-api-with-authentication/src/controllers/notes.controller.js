const noteModel = require("../models/note.model")
const userModel = require("../models/user.model")

const createNote = async (req,res)=>{
    // console.log(req.user)

    const {title,description}=req.body
    // const user = req.user._id

    const note = await noteModel.create({
        title,description,
        user:req.user._id
    })

    res.status(201).json({
        message:"note created",
        note
    })

}

const getNotes=async (req,res)=>{

    const MyNotes = await noteModel.find({
        user:req.user._id
    })

    res.status(200).json({
        message:"Noted fetched",
        MyNotes
    })

}

// Get Single Note
const getNoteById = async (req, res) => {

    const { id } = req.params

    const note = await noteModel.findOne({
        _id: id,
        user: req.user._id
    })

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        })
    }

    res.status(200).json({
        message: "Note fetched successfully",
        note
    })
}

// Update Note
const updateNote = async (req, res) => {

    const { id } = req.params
    const { title, description } = req.body

    const updatedNote = await noteModel.findOneAndUpdate(
        {
            _id: id,
            user: req.user._id
        },
        {
            title,
            description
        },
        {
            returnDocument: "after"
        }
    )

    if (!updatedNote) {
        return res.status(404).json({
            message: "Note not found"
        })
    }

    res.status(200).json({
        message: "Note updated successfully",
        updatedNote
    })
}

// Delete Note
const deleteNote = async (req, res) => {

    const { id } = req.params

    const deletedNote = await noteModel.findOneAndDelete({
        _id: id,
        user: req.user._id
    })

    if (!deletedNote) {
        return res.status(404).json({
            message: "Note not found"
        })
    }

    res.status(200).json({
        message: "Note deleted successfully",
        deletedNote
    })
}

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
}