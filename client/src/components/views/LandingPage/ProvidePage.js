import React,{useEffect, useState}  from 'react'
import axios from "axios";
import {Icon,Col,Card,Row,Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import {regions} from './Sections/Datas';

function ProvidePage() {
        const [Products, setProducts] = useState([])
        const [Skip,setSkip] = useState(0)
        const [Limit,setLimit] = useState(0)
        const [PostSize,setPostSize] = useState(0)
        const [Filters, setFilters] = useState({
            regions : []
        })
        const [SerchTerm, setSerchTerm] = useState("")
        const userId =  window.localStorage.getItem('userId');
        
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
        const [UsersAuth, setUsersAuth] = useState([])
   
        useEffect(() => {
            axios.get(`/api/users/usersindex`)
                .then(response => {
                    if(response.data.success){
                        for(let i=0;i<response.data.userindex.length;i++){
                            if(response.data.userindex[i]._id === userId){
                                console.log(response.data.userindex[i]._id);
                            }
                        }
                        //console.log('response.data',response.data)
                        setUsersAuth(response.data.userindex)
                    }else{
                        alert('상세 정보 가져오기를 실패했습니다.')
                    }
                })
        }, [])
        const loadMoreHandler = () => {
            let skip = Skip + Limit
            let body = {
                skip : skip,
                limit : Limit,
                loadMore : true
            }
            console.log(skip)
            console.log(body)
            getProducts(body)
            setSkip(skip)
        }
    
        const renderCards = Products.map((product,index)=>{
            //console.log('product',product.writer._id)
            if(product.writer._id==userId){
                return <Col lg={6} md={8} xs={24} key={index}>
                <Card 
                    cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
                    >
                    <Meta
                    title={product.title}
                    description={`$${product.price}`}/>
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
      
        
        return (
           <div style={{width:'75%',margin:'3rem auto'}}>
               <CheckBox list = {regions} handleFilters={filters => handleFilters(filters,"regions")} />
                <div style={{textAlign:'center'}}>
                    <h2>고객 맞춤 주문 제작 케이크
                        <Icon type="rocket"/>
                    </h2>
                    <Button type="primary" ghost> <a href="/product/upload">업로드</a></Button>
                </div>
    
                <div style={{display:'flex', justifyContent:'flex-end',margin:'1rem auto'}}>
                  
                </div>
    
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

export default ProvidePage