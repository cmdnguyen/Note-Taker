const notes = require('express').Router()
const fs = require("fs");
const uuid = require('../helpers/uuid')

//reads the current data and parses it
notes.get("/", (req, res) => {
    let rawdata = fs.readFileSync('./db/db.json');
    let currentNotes = JSON.parse(rawdata);
    res.json(currentNotes)});

//add new data
notes.post("/", (req, res) => {
  console.info(`${req.method} request received`);
  //logs the new data
  console.log(req.body)
  if (!req.body.title) {
    res.json("Request must at least contain a title for the note");
    return;
  }
  let rawdata = fs.readFileSync('./db/db.json');
  let currentNotes = JSON.parse(rawdata);
  
  //creates a new note from the body
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid(),
  }

  //pushes the newNote
  currentNotes.push(newNote)
  //logs the currentNotes after the new note has been pushed
  console.log(currentNotes);

  //stringify the current notes to write in the database
  var dataToSave = JSON.stringify(currentNotes)
  fs.writeFileSync('./db/db.json', dataToSave);
  res.json("New Note written!")
});

notes.delete("/:id",(req,res)=> {
    const idToDelete = req.params.id

    let rawdata = fs.readFileSync('./db/db.json');
    let currentNotes = JSON.parse(rawdata);
    console.info(`${req.method} request received`)

//deletes the note from the database
    currentNotes.splice(idToDelete)

    var dataToSave = JSON.stringify(currentNotes)
    fs.writeFileSync('./db/db.json', dataToSave);
    res.json("Note deleted!")
})

module.exports = notes;