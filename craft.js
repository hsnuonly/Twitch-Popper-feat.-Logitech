var WebSocketClient = require('websocket').client;
var process = require('process');
const uuidv1 = require('uuid/v1');

const PM_PORT = 10134;

var reconnectThreadVariable = null;
var connectMessage = null;

var clientSock = null;
var reconnectThreadVariable = null;
var wsocket = new WebSocketClient();
wsocket.connect('ws://127.0.0.1:10134');

function reconnectThread() {
    console.log('running reconnectThread for application:');
    runWSPluginManagerClient();
}

function runWSPluginManagerClient() {
    wsocket = new WebSocketClient();
    wsocket.connect('ws://127.0.0.1:10134');
}

const plugin_guid = uuidv1();
// var executableName = "Terminal.app";
// var manifestPath = "";

module.exports.connect = function (executableName, manifestPath) {
   connectMessage = {
        "message_type": "register",
        "plugin_guid": plugin_guid,
        "PID": Number(process.pid),
        "execName": executableName,
        "manifestPath": manifestPath
    };

    wsocket = new WebSocketClient();
    wsocket.connect('ws://127.0.0.1:10134');
    console.log("connected to craft plugin manager");
}

module.exports.disconnect = function () {
  websocket.disconnect();
  console.log("disconnected from craft plugin manager");
}

var eventCallback;

module.exports.onEvent = function(callback) {
  eventCallback = callback;
}

wsocket.on('connectFailed', function(errorDescription) {
    console.log('connect failed');
    if (reconnectThreadVariable == null) {
        console.log('starting reconnectThread');
        reconnectThreadVariable = setInterval(function() {
            reconnectThread();
        }, 5000);
    }
});

wsocket.on('connect', function(connection) {
    var cnx_msg = JSON.stringify(connectMessage);
    if (reconnectThreadVariable != null) {
        console.log('clearing reconnectVariable');
        clearInterval(reconnectThreadVariable);
        reconnectThreadVariable = null;
    }

    // Handle incoming messages from clients.
    connection.on('message', function(obj) {
        data = obj["message_type"];
        var jsonObj = JSON.parse(obj["utf8Data"]);
        eventCallback(jsonObj);
    });

    clientSock = connection;
    clientSock.send(cnx_msg);

    // When Client Connection is Ended.
    connection.on('end', function() {
        console.log('got end');
        wsocket.destroy();
    });

    // When Client Connection is Closed.
    connection.on('close', function() {
        console.log('got close');
        wsocket = null;
        reconnectThreadVariable = setInterval(function() { // ToDo: Verify if we need null check to avoid repeated connection issue
            reconnectThread();
        }, 5000);
    });

    // When Server caught an exception
    connection.on('error', function(ex) {
        // Server will caught an exception if client was disconnected from client side
        // It's appear the server was not expected when client is disconnected.
        if (ex.code == 'ECONNRESET') {
            //wsocket.destroy();
        }
    });
});
