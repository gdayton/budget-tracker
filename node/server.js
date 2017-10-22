var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ss = require('./spreadsheet');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 81;        // set our port

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