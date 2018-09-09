var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000; // finding heroku port or using local
// folder to serve
app.use(function (req, resp, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    resp.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});
app.use(express.static('dist'));
// run server
app.listen(PORT, function() {
  console.log(`Express server is up on port ${PORT}`)
});