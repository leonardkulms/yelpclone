const mongoose = require("mongoose");


// library schema
let librarySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"   
        }
    ]
});

module.exports = mongoose.model('Library', librarySchema);
