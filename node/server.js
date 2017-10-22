var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ss = require('./spreadsheet');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 81;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    // console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/glenn', function(req, res) {
    ss.getDebtForGlenn(function(resl){
        res.status(200).json(resl);
    });
});

app.get('/jose', function(req, res) {
    ss.getDebtForJose(function(resl){
        res.status(200).json(resl);
    });   
});

app.get('/', function(req, res) {
    res.status(200).json({ message: 'works' });   
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);



/*
GET
========
app.get('/api/users', function(req, res) {
    var user_id = req.param('id');
    var token = req.param('token');
    var geo = req.param('geo');  
  
    res.send(user_id + ' ' + token + ' ' + geo);
  });
*/


/*
POST
========
app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});
*/