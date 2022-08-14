const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    surname: { 
        type:String,
        required: false
    },
    group: {
        type: Schema.Types.ObjectId,  
        ref: 'Group',
        required: true
     }

})

studentSchema
.virtual('url')
.get(function (){
    return '/data/student/' + this._id;
});

module.exports = mongoose.model('Student', studentSchema)