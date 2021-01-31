var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/getlogin", function(req,res,next){
  let postData = req.body;

  console.log(postData.id);
  console.log(postData.password);
});

module.exports = router;
