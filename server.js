let connect = require('connect');
let serveStatic = require('serve-static');
const port = 8080;
connect().use(serveStatic(__dirname)).listen(port, function(){
    console.log('Server running on port ' + port);
});