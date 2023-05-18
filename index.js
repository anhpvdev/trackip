var express = require('express');
var app = express();
var PORT = 8080
// app.get('/', function (req, res) {
//    res.send('Hello World');
// })

const home = require("./controller/home.js")
home(app)


app.listen(PORT, function () {

  console.log(`server is running on port http://localhost:${PORT}`)

})