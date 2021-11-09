const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const notes = require("./db/db.json");
const app = express();
let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    let newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const deleteNote = notes.filter((removeNote) => {
        removeNote.id !== req.params.id;
    });
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`Application Is Listening On Port: ${PORT}`);
});