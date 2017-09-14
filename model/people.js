'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var PeopleSchema = new Schema({
 author: String,
 text: String,
 profile_img_url: String
});
//export our module to use in server.js
var Person = mongoose.model('Person', PeopleSchema);

module.exports =  Person
