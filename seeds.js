const mongoose = require("mongoose");
const Library = require("./models/library");
const Comment   = require("./models/comment");
 
const data = [
    {
        name: "Stockholm", 
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a53f6ccb2fccd80ae7f6c6af8f289319&auto=format&fit=crop&w=1950&q=80",
        description: "Stadsbiblioteket, Stockholm, Sweden"
    },
    {
        name: "Stuttgart", 
        image: "https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ecd60da4b445ee413d7209af84f49db4&auto=format&fit=crop&w=1950&q=80",
        description: "Stadtbibliothek, Stuttgart, Germany"
    },
    {
        name: "Porto", 
        image: "https://images.unsplash.com/photo-1531674842274-9563aa15686f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=beaa6c2c93de2b0feaf063e84b90c05b&auto=format&fit=crop&w=802&q=80",
        description: "Livraria Lello, Porto, Portugal"
    }
]
 
function seedDB(){
   //Remove all libraries
   Library.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed libraries!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few libraries
            data.forEach(function(seed){
                Library.create(seed, function(err, library){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a library!");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    library.comments.push(comment);
                                    library.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;