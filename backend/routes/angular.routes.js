const path = require('path');

module.exports = app => {

  app.all("*", (req, res) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"));
  });

};
