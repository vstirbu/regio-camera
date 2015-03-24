module.exports = middleware;

var states = {
  STANDBY: 0,
  BUSY: 1
};

function middleware(options) {
  var regio = require('regio'),
      tessel = require('tessel'),
      camera = require('camera-vc0706').use(tessel.port[options.port]),
      app = regio.router(),
      hwReady = false,
      current;

  camera.on('ready', function() {
    hwReady = true;
    current = states.STANDBY;
  });

  app.get('/', handler);

  function handler(req, res) {
    if (hwReady) {
      if (current === states.STANDBY) {
        current = states.BUSY;
        camera.takePicture(function (err, image) {
          res.set('Content-Type', 'image/jpeg');
          res.set('Content-Length', image.length);
          res.status(200).end(image);
          current = states.STANDBY;
        });
      } else {
        res.set('Retry-After', 100);
        res.status(503).end();
      }
    } else {
      res.status(503).end();
    }
  }

  return app;
}
