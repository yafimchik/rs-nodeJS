const fs = require('fs');
const { LOG_MODES, LOG_MODE, LOG_FILE_PATH } = require('./config');

const { toString } = require('./utils');

const LOG_RECORD_TYPES = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  STATUS: 'STATUS',
  ERROR: 'ERROR',
  EXCEPTION: 'UNCAUGHT EXCEPTION',
  REJECTION: 'UNHANDLED REJECTION'
};

const ERROR_RECORD_TYPES = [
  LOG_RECORD_TYPES.ERROR,
  LOG_RECORD_TYPES.EXCEPTION,
  LOG_RECORD_TYPES.REJECTION
];

class Logger {
  constructor(printMode, printModes, logFilePath) {
    this.log = [];
    this.printMode = printMode;
    this.printModes = printModes;
    this.logFilePath = logFilePath;
    this.initMode(printMode);
  }

  get fileReady() {
    return this.printMode === this.printModes.FILE;
  }

  initMode() {
    if (this.fileReady) {
      this.error$ = fs.createWriteStream(this.logFilePath, {
        encoding: 'utf8',
        flags: 'a'
      });
      this.normal$ = this.error$;
    } else {
      this.error$ = process.stderr;
      this.normal$ = process.stdout;
    }
  }

  addOutput(data) {
    const newLogData = {
      body: data
    };
    this.addToLog(newLogData, LOG_RECORD_TYPES.OUTPUT);
  }

  addStatus(message) {
    this.addToLog({ message }, LOG_RECORD_TYPES.STATUS);
  }

  addToLog(logData, eventType = LOG_RECORD_TYPES.INPUT) {
    const newLogData = { ...logData };
    newLogData.type = eventType;
    newLogData.time = Date.now();
    this.log.push(newLogData);
    this.print(newLogData);
  }

  addInput(req) {
    const newLogData = {
      method: req.method,
      url: req.originalUrl,
      queryParams: req.query,
      body: req.body
    };
    this.addToLog(newLogData);
  }

  addError(error, errorType = LOG_RECORD_TYPES.ERROR, origin) {
    const newLogData = {
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      }
    };
    if (origin) {
      newLogData.origin = origin;
    }
    this.addToLog(newLogData, errorType);
  }

  addUncaughtException(error, origin) {
    this.addError(error, LOG_RECORD_TYPES.EXCEPTION, origin);
  }

  addUnhandledRejection(error) {
    this.addError(error, LOG_RECORD_TYPES.REJECTION);
  }

  print(logData) {
    const { type, time, ...dataToPrint } = logData;
    const titleString = `${type} ${new Date(time).toISOString()}`;
    const logDataString = toString(dataToPrint);

    let logStream = this.normal$;
    if (ERROR_RECORD_TYPES.includes(logData.type)) {
      logStream = this.error$;
    }

    logStream.write(`${titleString} : `);
    logStream.write(`${logDataString}\n`);
  }
}

const logger = new Logger(LOG_MODE, LOG_MODES, LOG_FILE_PATH);

module.exports = logger;
