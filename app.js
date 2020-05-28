var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose= require("mongoose");
    methodOverride = require("method-override"),
    Phonebook= require("./models/phone");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


//DB CREATED
var url=process.env.DATABASEURL || "mongodb://localhost/phonebook";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true });

//======================
//ROUTES
//======================

app.get('/', function(req, res){
    res.render('landing');
});

//INDEX- display all the phonebook contacts from DB
app.get('/phonebook', function(req, res){
    // Phonebook.find({}, function(err, allContacts){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
                 res.render('index');
    //     } 
    // });
});
//, {contacts: allContacts}

//CREATE- Add new contact to DB
app.post('/phonebook', function(req, res){
    Phonebook.create(req.body.contact, function(err,newlycreated){
        if(err){
            console.log(err);
        }
        else{ 
            res.redirect("/phonebook");
        }
    });
});

//NEW- display form to make a new contact
app.get('/phonebook/new', function(req, res){
    res.render('new');
}); 

//EDIT- Edit a particular contact
app.get("/phonebook/:id/edit", function (req, res) {
    // Campground.findById(req.params.id, function (err, foundCampground) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    res.render('edit');
    //     }
    // });
});

//UPDATE- Update a particular contact and redirect it somewhere.
app.put("/phonebook/:id", function(req,res){
    // Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    //     if(err){
    //         res.redirect("/campgrounds");
    //     }
    //     else{
    //         res.redirect("/campgrounds/" + req.params.id) ;
    //     }
    // });
});

//DELETE- Destroy a specific contact
app.delete('/phonebook/:id', function(req,res){
    // Campground.findByIdAndRemove(req.params.id,function(err){
    //     if(err){
    //         res.redirect("/campgrounds");
    //     }
    //     else{
    //         res.redirect("/campgrounds");
    //     }
    // });
});


app.listen(process.env.PORT || 3000 ,function(){
    console.log("Phone Book Web App is running");
});



