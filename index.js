const express = require('express');
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Davide')
})



const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});