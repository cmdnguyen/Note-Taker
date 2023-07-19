const express = require("express");
const fs = require("fs");
const path = require("path");
// const {nanoid} = require("nanoid")
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    let rawdata = fs.readFileSync('./db/db.json');
    let currentNotes = JSON.parse(rawdata);
    res.json(currentNotes)});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received`);
  console.log(req.body)
  if (!req.body.title) {
    res.json("Request must at least contain a title for the note");
    return;
  }
  let rawdata = fs.readFileSync('./db/db.json');
  let currentNotes = JSON.parse(rawdata);
  console.log(currentNotes);
//   console.log(nanoid())
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: "41234"
  }
  currentNotes.push(newNote)
  console.log(currentNotes);
  var dataToSave = JSON.stringify(currentNotes)
  fs.writeFileSync('./db/db.json', dataToSave);
  res.json("New Note written!")
});

// app.delete("/api/notes/:id",(req,res)=> {
//     const idToDelete = req.params.id
//     let rawdata = fs.readFileSync('./db/db.json');
//     let currentNotes = JSON.parse(rawdata);
// //manipulate the array accordingly

// //be sure to stringify the data correctly once you edit what you'll write
//     var dataToSave = JSON.stringify(currentNotes)
//     fs.writeFileSync('./db/db.json', dataToSave);
//     res.json("New Note written!")
// })

app.listen(PORT, () => {
  console.log(`application succesfully listening to http://localhost:${PORT}`);
});
