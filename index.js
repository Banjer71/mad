const express = require('express');
const app = express();
const dictionary = require('./dictionary.json')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Davide')
});

app.get('/api/words', (req, res) => {
    res.json(dictionary)
});

app.post('/api/add/abr', (req, res) => {
    const newWords = {
        abr: req.body.abr,
        words: req.body.words
    }

    dictionary.data.push(newWords);
    res.send(dictionary);
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});

