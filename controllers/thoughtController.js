//File: controllers/tvshows.js
var mongoose = require('mongoose');
var thoughtModel  = mongoose.model('thoughtModel');

var userModel  = mongoose.model('userModel');

//GET - Return all tvshows in the DB
exports.findAllThoughts = function(req, res) {

	thoughtModel.find(function(err, thoughts) {
	    if(err) res.send(500, err.message);

		res.status(200).jsonp(thoughts);
	});


};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	thoughtModel.findById(req.params.id, function(err, thought) {
    if(err) return res.send(500, err.message);

    console.log('GET /thought/' + req.params.id);
		res.status(200).jsonp(thought);
	});
};

exports.findAllThoughtsFromUsername = function(req, res) {
    thoughtModel.find({
      authorname: req.params.userid
  }, function(err, thoughts) {

      if (err) throw err;

      if (!thoughts) {
        res.json({ success: false, message: 'no thoughts for user' });
    } else if (thoughts) {
        console.log(thoughts);
          // return the information including token as JSON
          res.jsonp(thoughts);


      }

    });
};

//POST - Insert a new TVShow in the DB
exports.addThought = function(req, res) {
	console.log('POST new thought, content: ' + req.body.content);
	console.log(req.body);

	var thought = new thoughtModel({
		time: req.body.time,
	    content:   req.body.content,
	    user_id:   req.body.user_id
	});

	thought.save(function(err, thought) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(thought);
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
