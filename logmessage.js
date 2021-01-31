const log4js = require('log4js');
log4js.configure({
    appenders: { 
        info: { 
            type: "file", 
            filename: "./logs/logs.log",
            maxLogSize: 20480,
            backups: 5
        }
    },
    categories: { 
        default: { appenders: ["info"], level: "info" } ,
        info: { appenders: ["info"], level: "info" } ,
    }
});

const logger= log4js.getLogger();

module.exports = logger;