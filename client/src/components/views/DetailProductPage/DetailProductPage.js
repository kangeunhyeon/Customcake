import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import Comment from './Sections/Comments'
import LikeDislike from './Sections/LikeDislike'
import {Row, Col, List} from 'antd';

function DetailProductPage(props) {

    const productId = props.match.params.productId
    const variable = {productId: productId}
    const [Product, setProduct] = useState({})
    const [Comments, setComments] = useState([])
    

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
                    setComments(response.data.comments)
                }else{
                    alert('코멘트 정보를 가져오지 못헀습니다.')
                }
            })
    }, [])

    // 댓글이 등록될시 Comments State에 concat으로 붙여져서 추가한 댓글이 보여지게 됨
    // 자식 컴포넌트 (Comment.js, SingleComment)에 props로 주어짐
    const refreshFunction = (newComment) =>{
        setComments(Comments.concat(newComment))
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
        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={productId} />
                    
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
