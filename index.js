var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

class Messages {
  constructor(messages) {
    this.messages = messages;
  }

  getMessages() {
    return this.messages;
  }

  validId(id) {
    return id in this.messages;
  }
  
  getMessageById(id) {
    return this.messages[id];
  }
  
  deleteMessageById(id) {
    this.messages.splice(id,1);
  }
  
  addMessage(message) {
    this.messages.push(message);
  }
}

var messages = new Messages(["line 1", "line 2", "line 3"]);

app.get("/app/messages/", function (req, res) {
  res.json({"messages": messages.getMessages()});
});

function found(found, res){
  if(!found){
    res.status(404);
    res.end();
  }
  return found;
}

app.get("/app/messages/:id", function (req, res) {
  var messageId = req.params.id;
  if(found(messages.validId(messageId), res))
    res.json({messages: [messages.getMessageById(messageId)]});
});

app.delete("/app/messages/:id", function (req, res) {
  var messageId = req.params.id;
  if(found(messages.validId(messageId), res)){
    messages.deleteMessageById(messageId);
    res.status(204);
    res.end();
  }
});

app.post("/app/messages/", function (req, res) {
  messages.addMessage(req.body.msg);
  res.status(201);
  res.setHeader("Location", "/app/messages/"+(messages.length-1));
  res.end();
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
