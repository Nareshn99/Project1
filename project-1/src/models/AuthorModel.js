const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname:{
        type:String,
        require:true
    },
    lname: {
        type:String,
        require:true
    },
    title: {
        type:String,
        require:true, 
        enum:["Mr", "Mrs", "Miss"]
    },
    email: {
        type:String,
        require:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,],
        // valid email:trr,
        unique:true
    },
    password: {
        type:String,
        require:true
    } 

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)