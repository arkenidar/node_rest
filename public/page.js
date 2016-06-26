function getMessages()
{
  json_request(myOnReady, "GET", "app/messages/");
}

function getMessage(index)
{
  json_request(myOnReady, "GET", "app/messages/" + index);
}

function deleteMessage(index)
{
  json_request(myOnReady, "DELETE", "app/messages/" + index);
}

function addMessage(message)
{
  json_request(myOnReady, "POST", "app/messages/", {msg: message});
}

function json_request(callback, method, url, json) {
  
  var data = JSON.stringify(json);
  
  var xmlHttp = getXmlHttpRequest();
  var onReady = function () {
    callback(xmlHttp, method, url);
  };
  
  var headers = {};
  headers["Accept"] = "application/json";
  headers["Content-Type"] = "application/json";
  
  var async = true;
  
  requestDo(xmlHttp, async, method, url, data, onReady, headers);
}

function myOnReady(xmlHttp, method, url)
{
  if (xmlHttp.readyState === 4)
  {
    document.getElementById("query").innerHTML = method + " " + url;

    if (xmlHttp.responseText.indexOf("<body>") !== -1) {
      s = xmlHttp.responseText.substring(xmlHttp.responseText.indexOf("<body>") + 6, xmlHttp.responseText.indexOf("</body>"))
      document.getElementById("output").innerHTML = s;
    } else {
      document.getElementById("output").innerHTML = xmlHttp.responseText;
    }

    updateHeaders(xmlHttp);
  }
}

function updateHeaders(xmlHttp) {
  var allResponseHeaders = xmlHttp.getAllResponseHeaders().replace(new RegExp("\n", 'g'), "<br/>");
  document.getElementById("headers").innerHTML = allResponseHeaders;
}
