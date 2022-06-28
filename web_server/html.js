var express = require('express')
var app = express();
const path = require('path')

app.use(express.static('public'));

app.listen(8000, () => {
    console.log("Running on port 8000");
    
});

app.get("/", function(req, res) {
    
    res.sendFile(__dirname + '/index.html');
});