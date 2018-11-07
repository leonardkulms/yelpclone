var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    User        = require("./models/user"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds"),
    flash       = require("connect-flash");

var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");
    
//======= APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use("flash");
// seedDB();

//========= PASSPORT CONFIG
app.use(require("express-session")({
    secret: "AUF!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
res.locals.currentUser = req.user;
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");
next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});
