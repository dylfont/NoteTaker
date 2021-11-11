const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');




const PORT = process.env.PORT || 3001;

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
        newnote.id=uuidv4();
        allnotes.push(newnote)
    fs.writeFile("./db/db.json",JSON.stringify(allnotes),function(err){
        if(err){
            throw err
        } 
        res.json(allnotes) 
    })     
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