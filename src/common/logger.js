const LOG_RECORD_TYPES = {
  INPUT: 'INPUT',
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
  constructor() {
    this.log = [];
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
      url: req.url,
      queryParams: req.query,
      body: req.body
    };
    this.addToLog(newLogData);
  }

  addError(error) {
    this.addToLog({ error }, LOG_RECORD_TYPES.ERROR);
  }

  addUncaughtException(error, origin) {
    const newLogData = {
      error,
      origin
    };
    this.addToLog(newLogData, LOG_RECORD_TYPES.EXCEPTION);
  }

  addUnhandledRejection(error) {
    this.addToLog({ error }, LOG_RECORD_TYPES.REJECTION);
  }

  print(logData) {
    const dateString = new Date(logData.time).toISOString();
    const logDataString = JSON.stringify(logData);

    let logStream = process.stdout;
    if (ERROR_RECORD_TYPES.includes(logData.type)) {
      logStream = process.stderr;
    }

    logStream.write(`\n${dateString} :\n`);
    logStream.write(`\n${logDataString}\n`);
  }
}

const logger = new Logger();

module.exports = logger;
