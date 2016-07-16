var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');


var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file


// Connection to DB
mongoose.connect(config.database, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});
app.set('superSecret', config.secret); // secret variable

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Import Models and controllers
var userMdl     = require('./models/userModel')(app, mongoose);
var userCtrl = require('./controllers/userController');

var thoughtMdl     = require('./models/thoughtModel')(app, mongoose);
var thoughtCtrl = require('./controllers/thoughtController');

/*// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);*/
app.use(express.static(__dirname + '/web'));

// API routes
var apiRoutes = express.Router();

apiRoutes.route('/users')
  .get(userCtrl.findAllUsers)
  .post(userCtrl.addUser);

apiRoutes.route('/users/:id')
  .get(userCtrl.findById)
  .put(userCtrl.updateActivity)
  .delete(userCtrl.deleteActivity);

apiRoutes.route('/auth')
    .post(userCtrl.login);

apiRoutes.route('/thoughts')
  .get(thoughtCtrl.findAllThoughts)
  .post(thoughtCtrl.addThought);

apiRoutes.route('/thoughts/:id')
  .get(thoughtCtrl.findById)
  .put(thoughtCtrl.updateActivity)
  .delete(thoughtCtrl.deleteActivity);

app.use('/api', apiRoutes);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
