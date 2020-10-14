class InputLogger {
  constructor() {
    this.log = [];
  }

  addInput(req, res, next) {
    const newLogData = {
      url: req.url,
      queryParams: req.query,
      body: req.body,
      time: Date.now()
    };
    this.log.push(newLogData);
    this.print(newLogData);
    next();
  }

  print(logData) {
    const dateString = new Date(logData.time).toISOString();
    const logDataString = JSON.stringify(logData);
    console.log(`${dateString} :`);
    console.log(`${logDataString} :`);
  }
}

const inputLogger = new InputLogger();

module.exports = { inputLog: inputLogger.addInput.bind(inputLogger) };
