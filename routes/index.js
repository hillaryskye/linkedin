var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('token', req.user.token)
  if(req.isAuthenticated()) {
    unirest.get('https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url)')
      .header('Authorization', 'Bearer ' + req.user.token)
      .header('x-li-format', 'json')
      .end(function (response) {
        // console.log(response);
        res.render('index', { profile: response.body });
      })
  } else {
    res.render('index', {  });
  }
});

router.get('/logout', function(req, res, next) {
  req.session = null
  res.redirect('/')
})

module.exports = router;
