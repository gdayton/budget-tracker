var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ss = require('./spreadsheet');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 81;        // set our port

// Add headers
app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/debt', function(req, res) {
    var id = req.param("id");
    if(id){
        ss.getDebt(id, function(resl){
            res.status(200).json(resl);
        });
    }else{
        res.status(404).json({message:"ID needs to be passed."});
    }
});

app.get('/conf', function(req, res) {
    var id = req.param("id");
    if(id){
        ss.getConf(id, function(resl){
            res.status(200).json(resl);
        });
    }else{
        res.status(404).json({message:"ID needs to be passed."});
    }   
});

app.get('/values', function(req, res) {
    var id = req.param('id');
    if(id){
        ss.getValues(id, function(resl){
            res.status(200).json(resl);
        });
    }else{
        res.status(404).json({message:"ID needs to be passed."});
    }   
});

app.get('/currentday', function(req, res){
    ss.getCurrentDay(function(resl){
        res.status(200).json(resl);
    });
});

app.post("/li", function(req, res){
    var lineitem = {
        id: req.body.id,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category
    }
    
    ss.postLineItem(lineitem, function(resl){
        res.status(200).json(resl);
    });
});

app.get('/', function(req, res) {
    res.status(200).json({ message: 'works' });   
});

app.listen(port);