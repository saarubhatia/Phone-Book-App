//~~MONGOOSE/MODEL CONFIG 
var mongoose= require("mongoose");
var phoneSchema = new mongoose.Schema({
    name: {type:String, required: true},
    date: {type:Date},
    number:[{
        type: Number, unique: true, required: true 
    }],
    email:[{
        type:String, required: true 
    }]
});
module.exports= mongoose.model("Contact", phoneSchema); //collection name="contacts"