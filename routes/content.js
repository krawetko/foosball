/* The ContentHandler must be constructed with a connected db */

var MatchesDAO = require('../matches').MatchesDAO;

function ContentHandler(db) {
    "use strict";

    var matches = new MatchesDAO(db);

    this.displayMainPage = function (req, res, next) {
        "use strict";

        return res.render('index');
    };

    this.displayAddResultPage = function (req, res, next) {
        "user strict"


        return res.render('addResult');
    };

    this.getMatches = function (req, res, next) {
        "use strict"

        matches.getMatches(function (err, results) {
            "use strict"

            if (err) throw err;

            res.json(results);

        });


    };

    this.addResult = function (req, res, next) {
        "use strict"
        var match = req.body;
        match.date = new Date(Date.parse(match.date));
        matches.addMatch(match, function (err, inserted) {
            if (err) {
                return res.status(500).end();
            } else {
                return res.status(200).end();
            }
        });
    };
}

module.exports = ContentHandler;
