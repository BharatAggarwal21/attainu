const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    }
});

module.exports=Item=mongoose.model('item',ItemSchema);