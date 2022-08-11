const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teacherSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    telephoneNumber: {
        type: String,
        required: false
    },
    name:{
        type: String,
        required: true
    },
    surname: { 
        type:String,
        required: false
    }
})

teacherSchema
.virtual('url')
.get(function (){
    return '/data/teacher/' + this._id;
});

module.exports = mongoose.model('Teacher', teacherSchema)