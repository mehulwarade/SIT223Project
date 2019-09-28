const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
name: String,
username:String,
email: String,
password: String,
ID: String,
Unit1: String,
Unit2: String,
Unit3: String,
Unit4: String,
attunit1: String,
attunit2: String,
attunit3: String,
attunit4: String,
graunit1: String,
graunit2: String,
graunit3: String,
graunit4: String
}));