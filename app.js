const express = require("express");
bodyParser = require("body-parser");
app = express();


app.set("view engine", "ejs");


app.get("/", function(req,res){
    res.render("home");
});

app.listen(3000, function(){
    console.log("serving the clone on your local 3000");
});
