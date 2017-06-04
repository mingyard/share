var middleware = require('./routes/middleware.js')
var express = require('express');
var app = express();
var config = require('./config.js');
var api = require("./routes/api.js");

process.on('uncaughtException', function (err) {
    console.log('[Inside \'uncaughtException\' event]' + err.stack || err.message);
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,apptvmid,apptoken");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === "OPTIONS") {
        return res.send(200);
    }
    next();
});

app.use(middleware.midSend())
app.use('/api', api);
app.use(app.router)

exports.server = require('http').createServer(app)
exports.server.listen(config.port, function () {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});