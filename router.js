// non-core packages
var routes = require('routes');

var Router = routes.Router;
var Route = routes.Route;
var router = new Router();

router.addRoute('/', require('./routes/index.js'))

module.exports = router;
