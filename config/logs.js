var path = require('path')

// 日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

// 报错日志
var errorPath = "/error";
var errorFileName = "error";
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

// 请求数据时的响应日志
var responsePath = "/response";
var responseFileName = "response";
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

// 操作数据库进行增删改等操作记录日志
var handlePath = "/handle";
var handleFileName = "handle";
var handleLogPath = baseLogPath + handlePath + "/" + handleFileName;

module.exports = {
    // 日志格式等设置
    appenders:
    {
        "rule-console": {"type": "console"},
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": errorPath
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncudePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": responsePath
        },
        "handleLogger": {
            "type": "dateFile",
            "filename": handleLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncudePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": handlePath
        },
    },
    // 供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "handleLogger": {"appenders": ["handleLogger"], "level":"all"},
        "http": {"appenders": ['resLogger'], "level": "info"}
    },
    "baseLogPath": baseLogPath
}
