const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express()


const PORT = process.env.PORT || 3001;
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, './public/index.html/'))
});

// required get notes returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
//required get all returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//required get/api/notes reads the db.json
app.get('./api/notes', (req, res) => {
    fs.readFile(__dirname,'./db/db.json',(err,data)=>{
        var json = JSON.parse(data);
        return res.json(json);
    })
});

//post/api/notes recieves a new note to save
app.post("./api/notes/",(req, res) => {
    newNote = req.body;
  
    // Get the JSON file from /db/ and parse it so we can add to it
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
      var json = JSON.parse(data);
      // Push our new note in from our user's request.
      json.push(newNote);
  
      // Write the JSON file over with our new contents.
      fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(json));
    });
  });



    // Send response

app.listen(PORT, function() {
  console.log("App listening on port "+ PORT);
});
