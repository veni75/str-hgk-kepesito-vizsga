/**
 * Exercise: make School mongoose model
 */

 const mongoose = require('mongoose');

 const SchoolSchema = mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     city: {
         type: String,
         required: true
     },
     street: {
         type: String,
         required: true
     },
     zipcode: {
        type: Number,
        required: true
    },
     classroom: {
         type: Array,
         
     }
 }, {
     timestamps: true
 });
 
 module.exports = new mongoose.model('School', SchoolSchema);