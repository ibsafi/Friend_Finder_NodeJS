// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var Friends = require( path.join(__dirname, "app/data/friends.js") );


var app = express();
var apiFriends = new Friends;

// Sets up the Express App
// =============================================================
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require( path.join(__dirname, "app/routing/apiRoutes.js") )(app, apiFriends);
require( path.join(__dirname, "app/routing/htmlRoutes.js") )(app);

var PORT = 3000;

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});