var log4js = require('log4js');
var logsConfig = require('../config/logs.js');
// 加载配置文件
log4js.configure(logsConfig);
// 调用预先定义的日志名称
var resLogger = log4js.getLogger("resLogger");
var errorLogger = log4js.getLogger("errorLogger");
var handleLogger = log4js.getLogger("handleLogger");
var consoleLogger = log4js.getLogger();

// 各种日志格式： 普通日志、请求日志、响应日志、操作日志、错误日志
var formatText = {
    info: function(info) {
        var logText = new String();
        logText += "\n" + "****************info log start*****************" + "\n";
        logText += "info detail:" + "\n" + JSON.stringify(info) + "\n";
        logText += "****************info log end*****************" + "\n";
        return logText;
    },
    request: function (req, resTime) {
        var logText = new String();
        var method = req.method;
        logText += "request method: " + method + "\n";
        logText += "request originalUrl: " + req.originalUrl + "\n";
        logText += "request client ip: " + req.ip + "\n";
        var startTime;
        if (method === "GET") {
            logText += "request query: " + JSON.stringify(req.query) + "\n";
        } else {
            logText += "request body: "+ "\n" + JSON.stringify(req.body) + "\n";
        }
        logText += "response time:" + resTime + "\n";
        return logText;
    },
    response: function (ctx, resTime) {
        var logText = new String();
        logText += "\n" + "****************response log start*****************" + "\n";
        logText += formatText.request(ctx.request, resTime);
        logText += "response status:" + ctx.status + "\n";
        logText += "response body:" + "\n" + JSON.stringify(ctx.body) + "\n";
        logText += "****************response log end*****************" + "\n";
        return logText;
    },
    handle: function (info) {
        var logText = new String();
        logText += "\n" + "****************info log start*****************" + "\n";
        logText += "handle info detail:" + "\n" + JSON.stringify(info) + "\n";
        logText += "****************info log end*****************" + "\n";
        return logText;
    },
    error: function (ctx, err, resTime) {
        var logText = new String();
        logText += "\n" + "****************error log start*****************" + "\n";
        logText += formatText.request(ctx.request, resTime);
        logText += "err name:" + err.name + "\n";
        logText += "err message:" + err.message + "\n";
        logText += "err stack:" + err.stack + "\n";
        logText += "****************response log end*****************" + "\n";
        return logText;
    }

}


module.exports = {
    //普通日志
    logInfo: function (info) {
        if (info) {
            consoleLogger.info(formatText.info(info));
        }
    },
    //响应日志
    logResponse: function (ctx, resTime) {
        if (ctx) {
            resLogger.info(formatText.response(ctx, resTime));
        }
    },
    //操作日志
    logHandle: function (res) {
        if (res) {
            handleLogger.info(formatText.handle(res));
        }
    },
    //错误日志
    logError: function (ctx, error, resTime) {
        if (ctx && error) {
            errorLogger.error(formatText.error(ctx, error, resTime));
        }
    }
}