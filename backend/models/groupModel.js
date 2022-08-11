const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({//numer ->a automatycznie dodawane _id (można wymusić)
    name: {
        type: String,
        required: true,
        unique: true
    },
    teacher: {
        type: Schema.Types.ObjectId,  // populate() ->  może się przydać
        ref: 'Teacher',
        required: true
    }
})

groupSchema
.virtual('url')
.get(function (){
    return '/data/group/' + this._id;
});

module.exports = mongoose.model('Group', groupSchema)