const express = require('express');

const {getAllnotes, getNote, createNote} = require("./database.js");
const app = express()
app.get("/notes", async (req, res)=> {
    const notes = await getAllnotes();
    res.send( notes);
})

app.get("/notes/:id", async (req, res)=> {
    const id = req.params.id;
    const notes = await getNote(id);

    res.send( notes);
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})
app.listen(8080, () =>{
    console.log('Server is running on port 8080');
})