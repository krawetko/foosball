/* The ContentHandler must be constructed with a connected db */

var MatchesDAO = require('../matches').MatchesDAO;

function ContentHandler(db) {
    "use strict";

    var matches = new MatchesDAO(db);

    this.displayMainPage = function (req, res, next) {
        "use strict";

        return res.render('index');
    };

    this.getMatches = function (req, res, next) {
        "use strict"

        matches.getMatches(function (err, results) {
            "use strict"

            if (err) throw err;

            res.json(results);

        });


    };
}

module.exports = ContentHandler;
