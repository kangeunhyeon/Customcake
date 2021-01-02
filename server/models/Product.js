const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength: 50
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
        default:[]
    },
    sold:{//몇개가팔렸는지
        type:Number,
        maxlength:100,
        default:0
    },
    regions:{
        type : Number,
        default : 1
    },
    views:{//사람들이 얼마나 봤는지
        type:Number,
        default:0
    }
},{timestamps:true})

productSchema.index({
    title : 'text',
    description :'text'
},{
    weights:{
        title:5, //타이틀의 중점을 두고 검색
        description:1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }