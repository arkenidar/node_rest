// request with XmlHttpRequest
function requestXHR(xhr, async, method, url, data, onReady, headers) {
  // set callback
  xhr.onreadystatechange = onReady;
  // open url
  xhr.open(method, url, async);
  // set request headers
  for (var header in headers) {
    var value = headers[header];
    xhr.setRequestHeader(header, value);
  }
  // send request
  xhr.send(data);
}

// get XmlHttpRequest for current browser
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

// HTTP request/response with JSON
function requestJSON(callback, method, url, json) {
  // JSON to string
  var data = JSON.stringify(json);
  // get XHR object
  var xhr = getXmlHttpRequest();
  // prepare the callback
  var onReady = function () {
    callback(xhr, method, url);
  };
  // set request headers
  var headers = {};
  // response is of JSON type
  headers["Accept"] = "application/json";
  // request is of JSON type
  headers["Content-Type"] = "application/json";
  // async usage
  var async = true;
  // do the request
  requestXHR(xhr, async, method, url, data, onReady, headers);
}
