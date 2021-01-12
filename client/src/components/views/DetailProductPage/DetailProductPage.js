import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
<<<<<<< HEAD
import Comments from './Sections/Comments'
=======
import Comment from './Sections/Comment'
import LikeDislike from './Sections/LikeDislike'
>>>>>>> 7950d7c671386bdf69294fdbcf5fd51062878c70
import {Row, Col, List} from 'antd';

function DetailProductPage(props) {

    const productId = props.match.params.productId
    const variable = {productId: productId}
    const [Product, setProduct] = useState({})
<<<<<<< HEAD
    const [CommentLists, setCommentLists] = useState([])
=======
    const [Comments, setComments] = useState([])
>>>>>>> 7950d7c671386bdf69294fdbcf5fd51062878c70

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if(response.data.success){
                    console.log('response.data',response.data)
                    setProduct(response.data.product[0])
                }else{
                    alert('상세 정보 가져오기를 실패했습니다.')
                }
            })
        axios.post('/api/comment/getComments',variable)  
            .then(response=>{
                if(response.data.success){
<<<<<<< HEAD
                    setCommentLists(response.data.comments)
=======
                    setComments(response.data.comments)
>>>>>>> 7950d7c671386bdf69294fdbcf5fd51062878c70
                }else{
                    alert('코멘트 정보를 가져오지 못헀습니다.')
                }
            })
    }, [])
    
    // 댓글이 등록될시 Comments State에 concat으로 붙여져서 추가한 댓글이 보여지게 됨
    // 자식 컴포넌트 (Comment.js, SingleComment)에 props로 주어짐
    const refreshFunction = (newComment) =>{
<<<<<<< HEAD
        setCommentLists(CommentLists.concat(newComment))
=======
        setComments(Comments.concat(newComment))
>>>>>>> 7950d7c671386bdf69294fdbcf5fd51062878c70
    }
    return (
            <div style={{ width: '100%', padding: '3rem 4rem'}}>

                <div style={{ display:'flex', justifyContent: 'center'}}>
                    <h1> {Product.title}</h1>
                </div>
            
            <br />

            <Row gutter={[16, 16]}>
                    <Col lg={12} sm ={24}>
                        {/*Product Image*/}     
                        <ProductImage detail ={Product} />
                    </Col>
                    

                    <Col lg={12} sm ={24}>
                        {/*Product Info*/}    
                        <ProductInfo/> 
                    </Col>
            </Row>
            
        {/* Conments */}
<<<<<<< HEAD
        <Comments refreshFunction={refreshFunction} commentLists={CommentLists} postId={productId} />
=======
        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={productId} />
>>>>>>> 7950d7c671386bdf69294fdbcf5fd51062878c70
            

                
            </div>
        )
    
}

export default DetailProductPage
/*
/<List.Item
          actions={[<LikeDislike product userId={localStorage.getItem('userId')} productId={productId} writerId={productDetail.writer._id}/>]}
          >
            </List.Item>

 */
