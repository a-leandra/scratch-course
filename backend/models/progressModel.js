const mongoose = require('mongoose')

const Schema = mongoose.Schema

const progressSchema = new Schema({
    excercise: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['inactive', 'inProgress', 'done']
    },
    isHomework: { 
        type: Boolean,
        required: false
    }

})

progressSchema
.virtual('url')
.get(function (){
    return '/data/progress/' + this._id;
});

module.exports = mongoose.model('Progress', progressSchema)