var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/users', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

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
//users routes
var usersRoute = express.Router();

usersRoute.route('/users')
  .get(userCtrl.findAllUsers)
  .post(userCtrl.addUser);

usersRoute.route('/users/:id')
  .get(userCtrl.findById)
  .put(userCtrl.updateActivity)
  .delete(userCtrl.deleteActivity);

app.use('/api', usersRoute);

//thoughts routes
var thoughtsRoute = express.Router();

thoughtsRoute.route('/thoughts')
  .get(thoughtCtrl.findAllThoughts)
  .post(thoughtCtrl.addThought);

thoughtsRoute.route('/thoughts/:id')
  .get(thoughtCtrl.findById)
  .put(thoughtCtrl.updateActivity)
  .delete(thoughtCtrl.deleteActivity);

app.use('/api', thoughtsRoute);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
