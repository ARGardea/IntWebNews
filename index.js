var express = require('express'),
    jade = require('jade'),
    path = require('path');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));


app.get('/', function (req, res) {
    res.render('Home');
});

app.listen(3000);