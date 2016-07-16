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

// API routes ------------------------------------------------------
var apiRoutes = express.Router();

apiRoutes.route('/users')
  .get(userCtrl.findAllUsers)
  .post(userCtrl.addUser);
apiRoutes.route('/thoughts/user/:userid')
    .get(thoughtCtrl.findAllThoughtsFromUsername);

apiRoutes.route('/auth')
    .post(userCtrl.login);

apiRoutes.route('/thoughts')
  .get(thoughtCtrl.findAllThoughts);

apiRoutes.route('/thoughts/:id')
.get(thoughtCtrl.findById)

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

apiRoutes.route('/users/:id')
  .get(userCtrl.findById)
  .put(userCtrl.updateActivity)
  .delete(userCtrl.deleteActivity);

apiRoutes.route('/thoughts')
  .post(thoughtCtrl.addThought);

apiRoutes.route('/thoughts/:id')
  .put(thoughtCtrl.updateActivity)
  .delete(thoughtCtrl.deleteActivity);

app.use('/api', apiRoutes);
// end of API routes -------------------------------------

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
