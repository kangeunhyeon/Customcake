const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {Product} = require('../models/Product');
//=================================
//             Product
//=================================
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') //어디에 파일이 저장되는지 
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}_${file.originalname}`)
    }
  })
   
var upload = multer({ storage: storage }).single("file")

router.post('/image',(req,res)=>{
    upload(req,res,err=>{
        //가져온 이미지를 저장을 해주면 된다.
        if(err){
            return req.json({success:false,err})
        }
        return res.json({success:true,filePath:res.req.file.path,filaName:res.req.filename})
    })
   
})

router.post('/', (req, res) => {
    //받아온 정보들을 DB에 넣어준다.
    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    });
})

router.post('/products', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  //product collection에 들어 있는 모든 상품 정보를 가져오기
  //product컬랙션 안에있는 데이터를 찾는다
  Product.find()
    .populate("writer") //로그인한 사람에 대한 정보를 가져옴
    .skip(skip)
    .limit(limit)
    .exec((err,productInfo)=>{
      if(err) return res.status(400).json({success:false,err})
      return res.status(200).json({
          success:true,productInfo,
          PostSize:productInfo.length
        })
    })
})


module.exports = router;
