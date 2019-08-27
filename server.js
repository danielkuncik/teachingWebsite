const express = require('express');

var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.send("Welcome to Physics! <a href = '//gentle-badlands-17193.herokuapp.com'>Click Here<a>")
});

app.listen(port, () => {
    console.log(`Server is running on port $[port]`);
});