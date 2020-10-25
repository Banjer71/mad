const express = require('express');
const app = express();
const fs = require('fs');
const dictionary = require('./dictionary.json')

app.use(express.json());

fs.mkdirSync('database', { recursive: true }, (err) => {
    if (err) throw err;
})

app.get('/', (req, res) => {
    res.send('Hello Davide')
});

app.get('/api/words', (req, res) => {
    res.json(dictionary)
});

app.get('/api/add/abr/', (req, res) => {
    res.json(hello)
})


app.post('/api/add/abr/', (req, res) => {
    const newWords = [
        {
            abr: req.body.abr,
            words: req.body.words
        }
    ]

    fs.appendFile('database/hello.json', `${JSON.stringify(newWords, null, 2)}`, (err) => {
        if (err) {
            console.log(error)
        } else {
            console.log('file created')
        }
    })

    dictionary.data.push(newWords);
    res.json(dictionary);
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});

