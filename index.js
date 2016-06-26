var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var messages = 
  [
    'first line',
    'second line',
    'third line',
  ];

app.get('/app/messages/', function (req, res) {
  res.json(messages);
});

app.get('/app/messages/:id', function (req, res) {
  res.json(messages[req.params.id]);
});

app.delete('/app/messages/:id', function (req, res) {
  messages.splice(req.params.id, 1);
  res.json('deleted');
});

app.post('/app/messages/', function (req, res) {
  console.log(req.body);
  messages.push(req.body.msg);
  res.json('added');
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
