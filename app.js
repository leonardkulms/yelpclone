const   express     = require("express"),
        mongoose    = require("mongoose"),
        bodyParser  = require("body-parser"),
        app         = express();

mongoose.connect('mongodb://localhost/yelp');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// library schema
let librarySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Library = mongoose.model('Library', librarySchema);

// const kitty = new Library({ name: "Medical Library", image:"https://images.unsplash.com/photo-1507738978512-35798112892c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=81010823b449bfb0f874f6c8d71a5df7&auto=format&fit=crop&w=800&q=60" ,
// description: "The Medical Library On Our Campus. People expect you to have sanitized your hands. It's really looking good though. So clean."});
// kitty.save().then(() => console.log('books secure'));


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/libraries", function(req, res){
    Library.find({}, function(err, libraries){
        if(err){
            console.log(err)
        }
        else{
            res.render("index.ejs", {libraries: libraries});
        }
    });
   
});

app.post("/libraries", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newLibrary = {name: name, image: image, description:description};
    // create new library and save to db
    let kitty = new Library(newLibrary);
    kitty.save().then(() => console.log('books secure'));
    res.redirect("/libraries");
});

app.get("/libraries/new", function(req, res){
    res.render("new");
});

app.get("/libraries/:id", function(req, res){
    Library.findById(req.params.id, function(err, foundLibrary){
        if(err){
            console.log(err);
        }else{
            res.render("show",{library:foundLibrary});
        }

    });
});
app.listen(3000, function(){
    console.log("serving the clone on your local 3000");
});

