/////////////////////////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////////////////////////

var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var db = require("./models");
require("dotenv").config();

/////////////////////////////////////////////////////////////////
// Sets up the Express App
/////////////////////////////////////////////////////////////////

var app = express();
var PORT = process.env.PORT || 3000;

// Serve static content (css, js, img, etc.) for the app from
// the "public" directory in the app's directory
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving public directory
app.use(express.static(__dirname + '/public'));
// Routes
require("./controllers/rosteritup_controller.js")(app);

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/////////////////////////////////////////////////////////////////
// Initliazes the db connection & sets the Express App listening
/////////////////////////////////////////////////////////////////
//db.sequelize.sync({ force: true }).then( function () {
 db.sequelize.sync().then( function () {
    db.user.seedDB();
    db.nflteam.seedDB();
    db.nflplayer.seedDB();

    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});