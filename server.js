const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.get("/api/notes",function(req,res){
    fs.readFile("./db/db.json",function(err,data){
    if(err){
        throw err
    } 
    const allnotes = JSON.parse(data)   
    res.json(allnotes)
    })
})
app.post("/api/notes",function(req,res){
    fs.readFile("./db/db.json",function(err,data){
        if(err){
            throw err
        } 
        const allnotes = JSON.parse(data)   
        const newnote = req.body
        //add id using uuid mpm package 
        allnotes.push(newnote)
        //write file with json stringified all notes and then after write file res json all notes
        }) 
})
app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);