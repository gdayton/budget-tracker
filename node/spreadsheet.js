var async = require('async');
var bodyParser = require('body-parser');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./Orgpoint-727a3f969956.json');
var doc = new GoogleSpreadsheet('1iAyAi0_URBTSKNphHaCpEteTbhxzoESpE4ZftIGcQLU', creds);

doc.useServiceAccountAuth(creds, function () { });

function getDebtForGlenn(res) {
    var debt = [];

    doc.getRows(1, {
        offset: 1
    }, function (err, rows) {
        for (var i = 0; i < rows.length; i++) {
            debt.push({
                date: rows[i].date,
                category: rows[i].category,
                amount: rows[i].amount,
                description: rows[i].description
            });
        }
        // console.log(debt);
        res(JSON.stringify(debt));
    });
}

function getDebtForJose() {
    var debt = [];

    doc.getRows(1, {
        offset: 1
    }, function (err, rows) {
        for (var i = 0; i < rows.length; i++) {
            debt.push({
                date: rows[i].date,
                category: rows[i].category,
                amount: rows[i].amount,
                description: rows[i].description
            });
        }

        return JSON.stringify(debt);
    });
}

module.exports.getDebtForGlenn = getDebtForGlenn;
module.exports.getDebtForJose  = getDebtForJose;
