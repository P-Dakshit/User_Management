const { createLogger, format, transports} = require('winston');
const fs = require('fs');
const path = require('path');

const LogDiv = path.join(__dirname, '../Logs')
if(!fs.existsSync(LogDiv)){fs.mkdirSync(LogDiv)};

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({format: `YYYY-MM-DD HH:mm:ss`}),
        format.printf(({timestamp, level, message}) => `${timestamp} [${level.toUpperCase()}] : ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'Logs/app.log' }),
        new transports.File({ filename: 'Logs/error.log', level: 'error'})
    ]
});

module.exports = logger;