//File: controllers/tvshows.js
var mongoose = require('mongoose');
var userModel  = mongoose.model('userModel');

/* */
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express         = require("express");
var app             = express();
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable
/* */

//GET - Return all tvshows in the DB
exports.findAllUsers = function(req, res) {
	userModel.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users');
		res.status(200).jsonp(users);
	});
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	ActivityModel.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /users/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

//POST - Insert a new TVShow in the DB
exports.addUser = function(req, res) {
	console.log('POST new user, name: ' + req.body.username);
	console.log(req.body);

	var user = new userModel({
		username: req.body.username,
		password: req.body.password,
	    description:   req.body.description,
	    icon:   req.body.icon,
	    mail:   req.body.mail,
		admin: req.body.admin
	});

	user.save(function(err, user) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(user);
	});
};

//PUT - Update a register already exists
exports.updateActivity = function(req, res) {
	ActivityModel.findById(req.params.id, function(err, tvshow) {
		tvshow.title   = req.body.petId;
		tvshow.year    = req.body.year;
		tvshow.country = req.body.country;
		tvshow.poster  = req.body.poster;
		tvshow.seasons = req.body.seasons;
		tvshow.genre   = req.body.genre;
		tvshow.summary = req.body.summary;

		tvshow.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(tvshow);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteActivity = function(req, res) {
	ActivityModel.findById(req.params.id, function(err, activity) {
		activity.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(req.params.id);
		    console.log('DELETE /activities/' + req.params.id);
		})
	});
};


//POST - auth user
exports.login = function(req, res) {
	// find the user
  userModel.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
		  expiresIn: '10m'
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
};
