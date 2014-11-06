var ContentHandler = require('./content')
    , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function (app, db) {

    var contentHandler = new ContentHandler(db);

    // The main page of the blog
    app.get('/', contentHandler.displayMainPage);


    app.get('/api/matches', contentHandler.getMatches);

    // Error handling middleware
    app.use(ErrorHandler);
}
