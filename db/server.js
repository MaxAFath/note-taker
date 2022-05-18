const express = require('express');

const PORT = process.env.PORT || 3002;

const app = express();

app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

app.get('/public/api/notes:id', (req,res) =>{
    const result = findById(req.params.id, db)
    res.json(result);
});

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'./public/notes.html'));
});

app.post('/public/api/notes', (req,res) => {
    
    res.json(req.body);
});

app.listen(PORT, () => {
    
});
