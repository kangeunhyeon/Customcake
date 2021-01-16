const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================


var client_id = 'qTbOqBYovcn5ShbkqgHR';
var client_secret = 'zmPr1cwKh2';
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/api/users/naver");
var api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;


router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        authcheck: req.user.authcheck,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});
router.get("/usersindex",(req,res)=>{
    User.find({authcheck : ['1','2','3']})
    .exec((err,userindex)=>{
      //console.log(userindex)
      if(err) return res.status(400).send(err);
      res.status(200).json({success:true,userindex})
    })
 })

<<<<<<< HEAD

 router.get('/naver', (req, res) =>{
   console.log('naver서버 접속')
   api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
 });
 router.get('/naver/callback', (req, res) => {
   console.log('naver/callback서버접속')
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    
     var request = require('request');
     var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };  
   

     request.get(options, function (error, response, body) {
     
      if (!error && response.statusCode == 200) {
       
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
       
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });
//   router.listen(3000, function () {
//    console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');
//  });



module.exports = router;

=======
 

module.exports = router;
>>>>>>> a3db11a93004069e26574799ef608aa654ffdfb5
