const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

module.exports = createLogger({
  transports: [
    new (transports.Console)({'timestamp':true})
  ],
  format: combine(
    timestamp(),
    prettyPrint()
  )
});
