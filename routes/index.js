var express = require('express');
var router = express.Router();
var firebase = require("firebase");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var db = require('./firebaseinit');
db = firebase.firestore();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./accounts/login');
});

router.post('/getlogin',function(req,res,next){
  var postData = req.body;

  firebase.auth().signInWithEmailAndPassword(postData.email, postData.password)
      .then((user) => {
       
        res.render('./accounts/chat');
      })
      .catch((error) => {
        console.log('8t8' + error);
        if(error && error.message) {
          console.log(error.message);
        }
        res.redirect('/');
      })
  
});

router.get('/getlogin', function (req, res, next) {
  var user = firebase.auth().currentUser;

  if (user) {
    res.render('./accounts/chat');
  } else {
    res.render('./accounts/login');
  }
  
});

router.post('/getlogout', function (req, res, next) {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('logout');
    res.render('./accounts/login');
  }).catch((error) => {
    // An error happened.
  });
  


});



module.exports = router;
