Regio middleware for Tessel camera module.

# Installation

```
npm install regio-camera
```

# Usage

```javascript
var regio = require('regio'),
    camera = require('regio-camera'),
    app = regio();

app.use('/camera', camera({
  // provide the port where the cammera module is attached on tessel board
  port: 'A'
}));

var server = app.listen(8080, function () {
  console.log('server listening on', server.address().port);
});

```

# License

MIT
