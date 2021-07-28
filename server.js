const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();


const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html/'))
);

// required get notes returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'));
});
//required get all returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

//required get/api/notes reads the db.json
app.get('/api/notes', (req, res) => {
    res.readFile(path.join(__dirname,'/db.json'))
});

//post/api/notes recieves a new note to save
app.post('/api/notes', (req, res) =>{
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});




    // Send response

app.listen(PORT, function() {
  console.log("App listening on port "+ PORT);
});


