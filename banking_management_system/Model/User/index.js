const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:  { type: String,
        required: true,},

    userName: { type: String,
        unique: true,
        required: true,},

    address: { type: String,
        required: true,},

    mobile: { type: String,
        unique: true,
        required: true,},

    pan: { type: String,
        unique: true,
        required: true,},

    email: { type: String,
        unique: true,
        required: true,},

    password: { type: String,
        required: true,},

    dob: { type: Date,
        required: true,},

    accountType: { type: String,
        required: true,},

    country: { type: String,
        required: true,},

    state: { type: String,
        required: true,},
    loan:{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }    
    
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);