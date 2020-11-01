const express = require('express');
const {v4: uudv4, parse} = require("uuid")
const app = express();
const fs = require('fs');

app.use(express.json());


fs.mkdirSync('serverOne', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('folder created')
});

app.get('/', (req, res) => {
    res.send('<h1>Mad</h1>')
})

app.get('/api/database', (req, res) => {
    const database = require('./serverOne/myMad.json')
    res.send(database)
})

app.post('/api/add/shortcut', (req, res) => {
    let myData = { data: [] };
    const newShortCut = {
        id: parse(uudv4())[0],
        abr: req.body.abr,
        words: req.body.words
    }

    if (fs.existsSync('serverOne/myMad.json')) {
        let data = fs.readFileSync('serverOne/myMad.json');
        myData = JSON.parse(data)
        console.log(myData)
    }

    myData.data.push(newShortCut);

    fs.writeFile('serverOne/myMad.json', JSON.stringify(myData, null, 2), (err) => {
        if (err) throw err;
        console.log("file myMad.json has been written")
    });

    res.json(myData);
})


const PORT = 4001;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});