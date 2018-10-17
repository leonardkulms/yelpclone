const   express     = require("express"),
        mongoose    = require("mongoose"),
        bodyParser  = require("body-parser"),
        Library     = require("./models/library"),
        Comment     = require("./models/library"),
        seedDB      = require("./seeds"),
        app         = express();
        
// APP CONFIG
mongoose.connect('mongodb://localhost/yelp');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// SEED DATABASE

seedDB();

//ROUTES

// LANDING ROUTE
app.get("/", function(req,res){
    res.render("landing");
});

// INDEX ROUTE
app.get("/libraries", function(req, res){
    Library.find({}, function(err, libraries){
        if(err){
            console.log(err)
        }
        else{
            res.render("libraries/index.ejs", {libraries: libraries});
        }
    });
   
});

// CREATE ROUTE
app.post("/libraries", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newLibrary = {name: name, image: image, description:description};
    // create new library and save to db
    let lib = new Library(newLibrary);
    lib.save().then(() => console.log('books secure'));
    res.redirect("/libraries");
});

// NEW ROUTE
app.get("/libraries/new", function(req, res){
    res.render("libraries/new");
});


//SHOW ROUTE- shows more info about one library
app.get("/libraries/:id", function(req, res){
    Library.findById(req.params.id).populate("comments").exec(function(err, foundLibrary){
        if(err){
            console.log(err);
        }else{
            res.render("libraries/show",{library:foundLibrary});
        }

    });
});

//=============
//COMMENTS

app.get("/libraries/:id/comments/new", function(req, res){
    Library.findById(req.params.id, function(err, library){
        if(err){
            res.redirect("/libraries/:id");
        }else{
            res.render("comments/new", {library:library});
        }
    });
    
});

app.post("/libraries/:id/comments", function(req, res){
    Library.findById(req.params.id, function(err, library){
        if(err){
            res.redirect("/libraries");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    console.log(req.body.comment);
                    console.log(library.comments);
                    console.log(comment);
                    library.comments.push(comment);
                    library.save();
                    console.log("Created new comment");
                    res.redirect("/libraries/" + library._id);
                }
            });
        }
    });
});

// LISTENING
app.listen(3000, function(){
    console.log("serving the clone on your local 3000");
});

