const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
let notes = require('./db/db.json');

function makeId() {
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    return (letters[Math.floor(Math.random() * letters.length)] + Date.now());

}
//api routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});


app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(notes);
    })
})

app.post('/api/notes', (req, req) => {
    let id = makeId();
    let newNote = {
        id: id,
        title: req.body.title,
        text: req.body.text
    }
    notes.push(newNote);
    res.json(notes);
})

app.delete('api/notes:id', (req, res) => {
    let dnote = req.params.id;
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        let updateNotes = JSON.parse(data).filet((note) => {
            return note.id !== dnote;
        })
        notes = updateNotes;
        let stingifyNote = JSON.stringify(updateNotes);
        fs.writeFile('db/db.json', stingifyNote, (err) => {
            if (err) console.log(err);
        })
        res.json(stingifyNote);
    })

})

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => {
    console.log('API server now on port ${PORT}!');
});