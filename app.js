var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    methodOverride = require("method-override"),
    Phonebook = require("./models/phone");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//MOMENT.JS 
app.locals.moment = require("moment");

//DB CREATED
var url = process.env.DATABASEURL || "mongodb://localhost/phonebook";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

//======================
//ROUTES
//======================
app.get('/', function(req,res){
    res.redirect("/phonebook/page/1");

});
app.get('/phonebook', function(req,res){
    res.redirect("/phonebook/page/1");
});
//INDEX- display all the phonebook contacts from DB
app.get('/phonebook/page/:page', function (req, res) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    var perPage = 4;
    var page = req.params.page || 1;
    Phonebook
        .find({name:regex})
        .sort('name')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, contacts) {
        if (err) {
            console.log(err);
        }
        Phonebook.countDocuments().exec(function (err, count) {
            if (err) {
                console.log(err);
            }
        else {
            res.render('index', { contacts: contacts, current:page, pages: Math.ceil(count / perPage)  })
        }
    });
});
});
function escapeRegex(text) {
    if (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
};

//CREATE- Add new contact to DB
app.post('/phonebook/page/:page', function (req, res) {
    var name=req.body.name;
    var date=req.body.date;
    var number=req.body.number;
    var email= req.body.email;
    var newContact={name:name, date:date, number:number, email,email};
    Phonebook.create(newContact, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/phonebook/page/1");
        }
    });
});

//NEW- display form to make a new contact
app.get('/phonebook/new', function (req, res) {
    res.render('new');
});

//EDIT- Edit a particular contact
app.get("/phonebook/:id/edit", function (req, res) {
    Phonebook.findById(req.params.id, function (err, foundContact) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('edit', { contact: foundContact });
        }
    });
});

//UPDATE- Update a particular contact and redirect it somewhere.
app.put("/phonebook/:id", function (req, res) {
    Phonebook.findByIdAndUpdate(req.params.id, req.body.contact, function (err, updatedContact) {
        if (err) {
            res.redirect("/phonebook");
        }
        else {
            res.redirect("/phonebook/page/1");
        }
    });
});

//DELETE- Destroy a specific contact
app.delete('/phonebook/:_id', function (req, res) {
    Phonebook.findByIdAndRemove(req.params._id, function (err) {
        if (err) {
            res.redirect("/phonebook");
        }
        else {
            res.redirect("/phonebook/page/1");
        }
    });
});


app.listen(process.env.PORT || 3000, function () {
    console.log("PhoneBook Web App is running");
});
