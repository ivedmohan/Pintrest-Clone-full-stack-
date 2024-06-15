// const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');


mongoose.connect("mongodb://127.0.01:27017/pinterest")
// Define the schema for a user
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp: {
    type: String, // Assuming this will be a URL or a path to the image
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the model from the schema and export it
userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);


