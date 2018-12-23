const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

module.exports = createLogger({
  transports: [
    // new Winston.transports.Console(),
    new (transports.Console)({'timestamp':true})
  ],
  format: combine(
    timestamp(),
    prettyPrint()
  )
});
