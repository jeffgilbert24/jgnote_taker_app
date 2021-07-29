const express = require('express');
const path = require('path');
const fs = require("fs");
const uuid = require('uuid');
const app = express();


const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname + "/public", 'index.html'));
});

// required get notes returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + "/public", 'notes.html'));
});


//required get/api/notes reads the db.json
app.get('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('./db/db.json',"utf8"))
    res.json(note)
      
    })

  //required get all returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "/public", 'index.html'));
});  
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});





    // Send response

app.listen(PORT, function() {
  console.log("App listening on port "+ PORT);
});


app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    newNote["id"] = currentID +1;
    currentID++;
    console.log(newNote);

    notes.push(newNote);

    rewriteNotes();

    return res.status(200).end();
});