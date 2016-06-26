var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var messages = ["line 1", "line 2", "line 3"];

app.get("/app/messages/", function (req, res) {
  res.json({"messages": messages});
});

function found(found, res){
  if(!found){
    res.status(404);
    res.end();
  }
  return found;
}

app.get("/app/messages/:id", function (req, res) {
  if(found(req.params.id in messages, res))
    res.json({messages: [messages[req.params.id]]});
});

app.delete("/app/messages/:id", function (req, res) {
  if(found(req.params.id in messages, res)){
    messages.splice(req.params.id, 1);
    res.status(204);
    res.end();
  }
});

app.post("/app/messages/", function (req, res) {
  messages.push(req.body.msg);
  res.status(201);
  res.setHeader("Location", "/app/messages/"+(messages.length-1));
  res.end();
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
