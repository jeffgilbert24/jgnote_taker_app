const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();


const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html/'))
);

// required get notes returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
//required get all returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//required get/api/notes reads the db.json
app.get('/api/notes', (req, res) => {
    fs.readFile(__dirname,'/db.json',(err,data)=>{
        var json = JSON.parse(data);
        return res.json(json);
    })
});

//post/api/notes recieves a new note to save
app.post('/api/notes',(req, res)=>{
    newNote = req.body;
fs.readFile(__dirname + "/db/db.json", (err, data)=>{
    var json = JSON.parse(data);
// new note
json.push(newNote);


//create a note and add to JSON file
app.post("/api/notes", async function (req, res) {
    class NewNote {
      constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
      }
    }
    let noteList = [];
    let newNote = new NewNote(uuid.v4(), req.body.title, req.body.text);
    //   console.log("NEWNOTE: ", newNote);
    noteList = readNoteList;
    noteList.push(newNote);
    //   console.log("NOTE ARRAY: ", noteList);
    fs.writeFileSync(dbFile, JSON.stringify(noteList));
    console.log("Successfully added new note...");
    res.send({ message: "added note..." });
  });



    // Send response

app.listen(PORT, function() {
  console.log("App listening on port "+ PORT);
});
