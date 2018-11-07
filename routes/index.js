const express   = require("express");
const router    = express.Router();
const passport  = require("passport");
const User      = require("../models/user");

// LANDING
router.get("/", function(req, res){
    res.render("landing");
});

// AUTH ROUTES

// show register form
router.get("/register", function(req, res){
    res.render("register");
});


// handle signing up
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req,res){
    res.render("login");
});


//handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){  
});

//log out
router.get("/logout", function(req, res){
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return(next());
    }
    res.redirect("/login");
    }
module.exports = router;