const express = require("express")
const noteModel = require("./models/node.model")

const app=express()
app.use(express.json())

/*
 POST /notes => Create a note
 GET /notes => Get all notes
 DELETE /notes/:id => Delete a note
 PATCH /notes/:id => Update a note
*/

app.post("/notes",async (req,res)=>{

    const data = req.body /* { title,description } */
    await noteModel.create({
        title:data.title,
        description:data.description
    })

    res.status(201).json({
        message: "Note created"
    })
})

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.get("/notes", async (req, res) => {
    console.log("GET /notes was called");

    const notes = await noteModel.findOne({
        title:"new_title"
    });

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    });
});

module.exports=app