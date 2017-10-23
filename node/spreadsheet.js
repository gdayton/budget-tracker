var async = require('async');
var bodyParser = require('body-parser');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./Orgpoint-727a3f969956.json');
var doc = new GoogleSpreadsheet('1iAyAi0_URBTSKNphHaCpEteTbhxzoESpE4ZftIGcQLU', creds);

doc.useServiceAccountAuth(creds, function () { });

function getDebt(person, res) {
    var debt = [];
    var sheet = ((person == "glenn") ? 1 : 2)

    doc.getRows(sheet, {
        offset: 1,
        limit: 1,
        orderby: "date",
        reverse: true
    }, function (err, rows) {
        for (var i = 0; i < rows.length; i++) {
            debt.push({
                date: rows[i].date,
                category: rows[i].category,
                amount: rows[i].amount,
                description: rows[i].description
            });
        }
        
        res(debt);
    });
}

function getConf(person, res){
    var sheet = ((person == "glenn") ? 3 : 4)

    doc.getRows(sheet, {
        offset: 1
    }, function(err, rows){
        res({
            studentloans: rows[0].studentloans,
            income: rows[0].income,
            investments: rows[0].investments,
            savings: rows[0].savings,
            bigpurchases: rows[0].bigpurchases,
            budget: rows[0].budget,
            budgetpercent: rows[0].budgetpercent
        });
    });
}

function getValues(person, res){
    var sheet = ((person == "glenn") ? 5 : 6)

    doc.getRows(sheet, {
        offset: 1
    }, function(err, rows){
        res({
            studentloans: rows[0].studentloans,
            investments: rows[0].investments,
            savings: rows[0].savings,
            bigpurchases: rows[0].bigpurchases,
            expense: rows[0].expense,
            budgetpercent: rows[0].budgetpercent,
            remaining: rows[0].remaining,
            dailybudgetpercent: rows[0].dailybudgetpercent
        });
    });
}

function getCurrentDay(res){
    doc.getRows(7, {
        offset: 1
    }, function(err, rows){
        res({
            currentday: rows[0].currentday
        });
    });
}

function postLineItem(lineitem, res){
    var sheet = ((lineitem.id == "glenn") ? 1 : 2)
    var dated = new Date()
    var format_date = (dated.getMonth()+1)+"/"+dated.getDate()+"/"+dated.getFullYear();

    doc.addRow(sheet, {
        date: format_date,
        amount: lineitem.amount,
        description: lineitem.description,
        category: lineitem.category
    }, function(err, row) {
        res({
            date: row.date,
            amount: row.amount,
            description: row.description,
            category: row.category
        });
    })
}

module.exports.getDebt = getDebt;
module.exports.getConf = getConf;
module.exports.getValues = getValues;
module.exports.getCurrentDay = getCurrentDay;
module.exports.postLineItem = postLineItem;
