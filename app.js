const express = require("express");
bodyParser = require("body-parser");
app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

let libraries = [
    { name: "Book Tower", image:"https://images.unsplash.com/photo-1497796742626-fe30f204ec54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=404ef54e001d6c5b6fcc726cca25f6ff&auto=format&fit=crop&w=800&q=60"},
    { name: "Philosopher's Home ", image:"https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=42a10871f610c84a108afd8c3750fbae&auto=format&fit=crop&w=800&q=60"},
    { name: "Medical Library", image:"https://images.unsplash.com/photo-1507738978512-35798112892c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=81010823b449bfb0f874f6c8d71a5df7&auto=format&fit=crop&w=800&q=60"},
    { name: "Orchard Lib", image:"https://images.unsplash.com/photo-1520387294843-fd994fd872e7?ixlib=rb-0.3.5&s=caf83b034284ac4e891db7f0b08f4242&auto=format&fit=crop&w=750&q=80"}
];

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/libraries", function(req, res){
    res.render("libraries", {libraries: libraries});
});

app.post("/libraries", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let newLibrary = {name: name, image: image};
    libraries.push(newLibrary);
    res.redirect("/libraries");
});

app.get("/libraries/new", function(req, res){
    res.render("new");
})

app.listen(3000, function(){
    console.log("serving the clone on your local 3000");
});

