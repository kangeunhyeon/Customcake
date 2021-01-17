import React,{useEffect, useState} from 'react'
import axios from "axios";
import {Icon,Col,Card,Row,Collapse} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import {regions} from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature'
import '../../../index.css';
// import imgA from './1.jpg';


function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip,setSkip] = useState(0)
    const [Limit,setLimit] = useState(19)
    const [PostSize,setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        regions : []
    })
    const [SerchTerm, setSerchTerm] = useState("")
    
    useEffect(()=>{
        let body = {
            skip : Skip,
            limit : Limit
        }
        getProducts(body)
    },[])

    const getProducts = (body)=>{
        axios.post('/api/product/products',body)
        .then(response=>{
            if(response.data.success){
               //console.log(response.data)
                if(body.loadMore){
                    setProducts([...Products,...response.data.productInfo])
                }else{
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.PostSize)
            }else{
                alert('상품들을 가져오는데 실패 했습니다.')
            }
        })
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            skip : skip,
            limit : Limit,
            loadMore : true
        }
        getProducts(body)
        setSkip(skip)
    }
    const renderCards = Products.map((product,index)=>{
        if(product.writer.authcheck==2){
            
                return <Col lg={6} md={8} xs={24} key={index}>
                    <Card 
                        cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
                        >
                        <Meta
                        title={product.title}
                        description={`$${product.price}`}/>
                        <Meta
                        title={product.writer.name}
                        />
                    </Card>
                </Col>
            
        }
    })
   
    const showFilteredResults =(filters) => {
        let body = {
            skip : 0,
            limit : Limit,
            filters : filters
        }
        getProducts(body)
        setSkip(0)
    }
    const handleFilters = (filter, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filter

        showFilteredResults(newFilters)
    }
    //newSerchTerm은 자식컴포넌트의 event.currentTarget.value
    const updateSearchTerm = (newSerchTerm) =>{

        let body = {
            skip :0,
            limit : Limit,
            filters : Filters,
            searchTerm : newSerchTerm
        }
        setSkip(0)
        setSerchTerm(newSerchTerm)
        getProducts(body)
    }
    
    return (
       <div style={{width:'75%',margin:'3rem auto'}}>
            <div style={{textAlign:'center'}}>
                    <h2 className ="title"><Icon type="smile"/>&nbsp;&nbsp;고객 맞춤 주문 제작 케이크&nbsp;&nbsp;
                <Icon type="smile"/>
                </h2>
            </div>
        
            <div style={{display:'flex', justifyContent:'flex-end',margin:'1rem auto'}}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                /> 
            </div>
            <div className="container">
                 {/* <img src="imgA" /> */}
            </div>
            <br/>
            <CheckBox list = {regions} handleFilters={filters => handleFilters(filters,"regions")} /><br/>

                <Row gutter={[16,16]}>
                    {renderCards}
                </Row>
               
            <br/>
            {PostSize >= Limit &&   
            <div style={{display:'flex',justifyContent:'center'}}>
                <button onClick={loadMoreHandler}>
                    더보기
                </button>
            </div>
            }
             
         
        
       </div>
    )
}
export default LandingPage