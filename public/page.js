var requestJSON = require("./ajax-hxr.js");

function getMessages()
{
  requestJSON(onReady, "GET", "app/messages/");
}

function getMessage(index)
{
  requestJSON(onReady, "GET", "app/messages/" + index);
}

function deleteMessage(index)
{
  requestJSON(onReady, "DELETE", "app/messages/" + index);
}

function addMessage(message)
{
  requestJSON(onReady, "POST", "app/messages/", {msg: message});
}

function onReady(xhr, method, url)
{
  
  function getBody(s){
    if (s.indexOf("<body>") !== -1) {
      s = s.substring(s.indexOf("<body>") + 6, s.indexOf("</body>"))
    }  
    return s;
  }

  if (xhr.readyState === 4){
    
    document.getElementById("status").innerHTML = xhr.status;
    
    document.getElementById("query").innerHTML = method + " " + url;

    document.getElementById("output").innerHTML = getBody(xhr.responseText);

    var allResponseHeaders = xhr.getAllResponseHeaders().replace(new RegExp("\n", 'g'), "<br/>");
    document.getElementById("headers").innerHTML = allResponseHeaders;
  }
}
