
// list all messages
function getMessages()
{
  requestJSON(onReady, "GET", "app/messages/");
}

// get a message by id
function getMessage(index)
{
  requestJSON(onReady, "GET", "app/messages/" + index);
}

// delete a message by id
function deleteMessage(index)
{
  requestJSON(onReady, "DELETE", "app/messages/" + index);
}

// add a message
function addMessage(message)
{
  requestJSON(onReady, "POST", "app/messages/", {msg: message});
}

// callback to process HTTP response
function onReady(xhr, method, url)
{
  
  // get the content of the <body> tag, if present
  function getBody(s){
    if (s.indexOf("<body>") !== -1) {
      s = s.substring(s.indexOf("<body>") + 6, s.indexOf("</body>"))
    }  
    return s;
  }

  // on completed request...
  if (xhr.readyState === 4){
    
    // show status code
    document.getElementById("status").innerHTML = xhr.status;
    
    // show query
    document.getElementById("query").innerHTML = method + " " + url;

    // show response body
    document.getElementById("output").innerHTML = getBody(xhr.responseText);

    // show response headers
    var allResponseHeaders = xhr.getAllResponseHeaders().replace(new RegExp("\n", 'g'), "<br/>");
    document.getElementById("headers").innerHTML = allResponseHeaders;
  }
}
