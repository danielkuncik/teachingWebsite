const express = require('express');

var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.send("Welcome to Physics! <a href = '/basicPage.html'>Click Here<a>")
});

app.listen(port, () => {
    console.log(`Server is running on port $[port]`);
});