var ContentHandler = require('./content')
    , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function (app, db) {

    var contentHandler = new ContentHandler(db);

    // The main page of the blog
    app.get('/', contentHandler.displayMainPage);

    app.get('/addResult', contentHandler.displayAddResultPage);


    app.get('/api/matches', contentHandler.getMatches);

    app.post("/api/addResult", contentHandler.addResult);



    // Error handling middleware
    app.use(ErrorHandler);
}
