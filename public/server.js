const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;

const middleware = (req, res, next) => {
    // ANSI escape code that instructs the terminal to print in yellow
    const yellow = '\x1b[33m%s\x1b[0m';
  
    // Log out the request type and resource
    console.log(yellow, `${req.method} request to ${req.path}`);
  
    // Built-in express method to call the next middleware in the stack.
    next();
  };

app.use(express.static('public'));


app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/sendFile.html'))
);
// HTML route created for notes
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
//API route created for notes
app.get("/api/notes", (req, res) => {      
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));     
    res.json(data);
});
app.post("/api/notes", (req, res) => {     
    const newNote = request.body;    
    newNote.id = uuidv4();    
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));    
    data.push(newNote);    
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    
    console.log("\nSuccessfully added note to file!");

    // Send response
    res.json(data);
});
// middleware
app.use(middleware);


app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/routes.html'))
);

//app.listen(PORT, () =>
//  console.log(`Example app listening at http://localhost:${PORT}! 🏎️`)
//);
app.listen(PORT, function() {
  console.log("App listening on port "+ PORT);
});


