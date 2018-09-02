const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Physics!')
});

app.listen(3000);