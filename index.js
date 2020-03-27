var express = require('express');
var app = express();
app.use('/',express.static('static_files'));
app.listen(3000, function () {
  console.log('app listening');
});