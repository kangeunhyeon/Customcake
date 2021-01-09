router.get('/login/naver', passport.authenticate('naver'));

router.get('/login/naver/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    console.log('passport.authenticate(naver)실행');
    if (!user) { return res.redirect('http://localhost:3000/login'); }
    req.logIn(user, function (err) { 
       console.log('naver/callback user : ', user);
       return res.redirect('http://localhost:3000/');        
    });
  })(req, res);
});