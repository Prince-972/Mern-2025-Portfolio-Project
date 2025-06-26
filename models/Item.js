const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  name: String,
  role: String,
  profilePicUrl: String,
  education: Array,
  skills: Array,
  contact: Object,
  social: Object,
  about: String,
  resumeName: String
});
module.exports = mongoose.model('Item', itemSchema); 