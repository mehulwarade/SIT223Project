const mongoose = require('mongoose');

module.exports = mongoose.model('Data', new mongoose.Schema({
name: String,
time:String,
temp: String,
hum: String
}));