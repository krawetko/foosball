/**
 * Created by krawetko on 05/11/14.
 */

var bcrypt = require('bcrypt-nodejs');


function MatchesDAO(db) {
    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof MatchesDAO)) {
        console.log('Warning: UsersDAO constructor called without "new" operator');
        return new UsersDAO(db);
    }

    var matches = db.collection("matches");


    this.getMatches = function (callback) {
        matches.find().sort({"date": -1}).toArray(callback);
    };
}


module.exports.MatchesDAO = MatchesDAO;