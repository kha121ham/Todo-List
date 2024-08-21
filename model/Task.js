const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    name:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = Task = mongoose.model('task',TaskSchema);