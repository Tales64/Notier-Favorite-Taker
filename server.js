const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");


const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// var savedNotes =
  //app.get('/', (req, res) => {
  //    res.sendFile(path.join(__dirname, './public/index.html'));
  //})

  app.get("/api/notes", (req, res) => {
    notes=JSON.parse(fs.readFileSync('./db/db.json','UTF8'))
    res.json(notes);
  });
  
  
  // Create an id to
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    let newNote={
        title: req.body.title,
        text: req.body.text,
    }
    notes.push(newNote)
    fs.writeFile(
    './db/db.json',
    JSON.stringify(notes, null, 4),
  );
  res.json(notes)
});

// app.delete("/api/notes", (req, res) => {
//   const newNote = req.body;
//   writeToFile(destination, newNote);
//   res.json(`${req.method} received`);
// });

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
