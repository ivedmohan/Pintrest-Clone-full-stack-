const mongoose = require('mongoose');
const User = require('./users');

// mongoose.connect("mongodb://127.0.01:27017/pinterest")
// Define the schema for a post
const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  currentDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: [],
  }
});

// Create the model from the schema and export it
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
