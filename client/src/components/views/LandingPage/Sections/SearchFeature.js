import React,{useState} from 'react'
import {Input} from 'antd';
const {Search} = Input;
function SearchFeature(props) {
    const [SearchTerm, setSearchTerm] = useState("")
    const SearchHandler =(event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }
    return (
        <div>
           <Search
            placeholder="검색내용을 입력해주세요"
            allowClear
            enterButton="검색"
            size="large"
            style={{width:400}}
            onChange={SearchHandler}
            value={SearchTerm}
            />
        </div>
    )
}

export default SearchFeature
