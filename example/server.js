var regio = require('regio'),
    camera = require('regio-camera'),
    app = regio();

app.use('/camera', camera({
  port: 'A'
}));

var server = app.listen(8080, function () {
  console.log('server listening on', server.address().port);
});
