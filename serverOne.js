const express = require('express');
const { v4: uudv4, parse } = require("uuid")
const app = express();
const fs = require('fs');

app.use(express.json());


fs.mkdirSync('serverOne', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('folder created')
});

let myData = []
if (fs.existsSync('serverOne/myMad.json')) {
    let data = fs.readFileSync('serverOne/myMad.json');
    myData = JSON.parse(data)
    console.log(myData)
} else {
    fs.writeFileSync('./serverOne/myMad.json', JSON.stringify(myData, null, 2), (err) => {
        if (err) {
            throw err
        }

    })
}

const database = require('./serverOne/myMad.json')

app.get('/', (req, res) => {
    res.send('<h1>Mad</h1>')
})

app.get('/api/database', (req, res) => {

    res.send(myData)
})

app.get('/api/database/:abr/:words', (req, res) => {
    let usr = req.params
    let abr = usr.abr
    let words = usr.words
    // let abr = usr.find(user => user.id === parseInt(req.params.id))
    // if(abr) {
    //     res.json({id: `${req.params.id}`, abr: `${req.params.abr}`, words: `${req.params.words}`})
    // }
    res.send(`${abr} ${words}`)
})

app.post('/api/add/shortcut/:id', (req, res) => {

    const newShortCut = {
        id: parse(uudv4())[0],
        abr: req.body.abr,
        words: req.body.words
    }

    myData.push(newShortCut);

    fs.writeFile('serverOne/myMad.json', JSON.stringify(myData, null, 2), (err) => {
        if (err) throw err;
        console.log("file myMad.json has been written")
    });

    res.json(myData);
});

app.delete('/api/del/:id', (req, res) => {
    const found = myData.find(user => user.id === parseInt(req.params.id));

    myData = myData.filter(user => user.id !== parseInt(req.params.id))
    console.log(myData)

    fs.writeFile('serverOne/myMad.json', JSON.stringify(myData, null, 2), (err) => {
        if (err) throw err;
        console.log("file myMad.json has been written")
    });

    if (found) {
        res.json({
            removed: `Member ${req.params.id} deleted`,
            users: myData
        })
    } else {
        res.status(400).json({ message: `user id ${req.params.id} has not been found` })
    }
})


const PORT = 4001;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});