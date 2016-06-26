function requestDo(xmlHttp, async, method, url, data, onReady, headers) {
  xmlHttp.onreadystatechange = onReady;
  xmlHttp.open(method, url, async);
  for (var header in headers) {
    var value = headers[header];
    xmlHttp.setRequestHeader(header, value);
  }
  xmlHttp.send(data);
}

function getXmlHttpRequest() {
  try
  {
    // Firefox, Opera 8.0+, Safari
    return new XMLHttpRequest();
  } catch (e)
  {
    // Internet Explorer
    try
    {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e)
    {
      try
      {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e)
      {
        alert("Your browser does not support AJAX!");
        return null;
      }
    }
  }
}

module.exports=requestJSON;

function requestJSON(callback, method, url, json) {
  
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