var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var dateFormat = require('dateformat');
var alert = require('alert');
var crypto = require('crypto');


var db = require('./firebaseinit');
db = firebase.firestore();



/*
router.get('/',function(req, res, next) {
    res.redirect('login');
});
*/




router.get('/signup', function (req, res, next) {
  res.render('./accounts/signup');
});


router.post('/accountSave', function (req, res, next) {
  var postData = req.body;
  var tsid = "2015136140";


  if (!postData.password) {
    alert("비밀번호를 입력하세요.");
    return false;
  }
  if (!postData.password2) {
    alert("비밀번호 확인을 입력하세요.");
    return false;
  }

  if (!postData.sid) {
    alert("학번을 입력하세요.");
    return false;
  }
  if (!postData.email) {
    alert("학교 E-Mail을 입력하세요.");
    return false;
  }


  if (postData.password != postData.password2) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }
  if (postData.sid.length != tsid.length) {
    alert("학번을 올바르게 입력해주세요.");
    return false;
  }

  var emailSplit = postData.email.split('@');

  if (emailSplit[1] != 'koreatech.ac.kr') {
    alert("학교 이메일을 입력해주세요.");
    return false;
  }

  console.log(postData);
  var firebaseEmailAuth = firebase.auth();

  firebaseEmailAuth.createUserWithEmailAndPassword(postData.email, postData.password)
    .then(userCredential => {
      const currentUser = {
        id: userCredential.user.uid,
        email: postData.email,
        emailVerified: userCredential.user.emailVerified
      }

      //DB 저장

      postData.brddate = Date.now();
      var doc = db.collection("users").doc(postData.email);
      postData.accountno = doc.id;
      let data = {
        password: postData.password,
        sid: postData.sid,
        name: postData.name,
        email: postData.email,
        cdate: postData.brddate
      }
      doc.set(data);
    }).then(() => {
      //이메일인증
      let user = firebaseEmailAuth.currentUser;

      user.sendEmailVerification()
        .then(function () {
          console.log('Email message send~~~');
        })
        .catch('Email not sent!!!');
      //이메일 인증 끝

      //const modal = document.querySelector('#singupModal');
      //M.Modal.getInstance(modal).close();
      //signUpForm.reset();
    }).catch(error => {
      console.log("error code : " + error.message);
      return false;
    }) /**/;





  res.redirect('/');
});

router.get('/getlogout', function (req, res, next) {
  firebase.auth().signOut().then(() => {
    res.render('login');
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });


});


module.exports = router;