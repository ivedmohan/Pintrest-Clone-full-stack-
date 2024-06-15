var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');
const upload = require('./multer');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// upload
router.post('/upload', isLoggedIn, upload.single('file'), async function(req, res, next){
  if(!req.file){
    return res.status(400).send('no files were uploaded');
  }
  const user = await userModel.findOne({username: req.session.passport.user});
  const postdata = await postModel.create({
    image: req.file.filename,
    user: user._id,
  })
  user.posts.push(post._id);
  await user.save();
  res.send('file uploaded');
})
// login page
router.get('/login', function(req, res, next) {
  res.render('login',{error: req.flash('error')});
});
// feed page
router.get('/feed', function(req, res, next) {
  res.render('feed',);
});
// user registration
router.post('/register', function(req, res, next){
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function(){
      res.redirect('/profile')
    })
  })
})
// user login
router.post("/login", passport.authenticate('local',{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
}), function(req, res, next){
})
// logout
router.get("/logout", function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
})
// user profile
router.get("/profile", isLoggedIn, async function(req, res, next){
  const user = await userModel.findOne({username: req.session.passport.user})
  .populate('posts');
  res.render("profile",{user});
})
// loggedIn
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
