import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
//导入 axios
import Axios from "axios"

export default class Citylist extends React.Component{
    state = {
        cityList:{}
    }
    componentDidMount(){
        this.getCityList()
    }
//获取城市列表
   async getCityList(){
        const res =await Axios.get("http://localhost:8080/area/city?level=1")
        let obj = {}
        res.data.body.forEach(item => {
           let word =  item.pinyin.substr(0,1)
           if(!obj[word]){
               obj[word] = [item]
           }else{
               obj[word].push(item)
           }
        });
        this.setState({
            cityList:obj
        })
    }
    render () {

        return(
            <div className='city-list'>
            <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
            >城市列表</NavBar>
        </div>
        )
    }
}