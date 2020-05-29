//~~MONGOOSE/MODEL CONFIG 
var mongoose= require("mongoose");
var phoneSchema = new mongoose.Schema({
    name: String,
    date: Date,
    number:[
        {
            type: Number, 
            required:true,
        }
    ],
    email:[
        {
            type:String
        }
    ]
});
module.exports= mongoose.model("Contact", phoneSchema); //collection name="contacts"