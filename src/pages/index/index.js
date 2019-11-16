import React from 'react'
//css 样式
import './index.scss'
//轮播图组件导入
import { Carousel } from "antd-mobile"
// axios 导入
import Axios from "axios"
export default class Index extends React.Component{
    state = {
        swiper: [],
        imgHeight: 176,
        isplay:false
    }

    componentDidMount() {
        this.getSwiper()
    }
   // axios 获取数据
    async getSwiper () {
        let res = await Axios.get("http://localhost:8080/home/swiper")
        console.log(res)
        this.setState({
            swiper:res.data.body
        },()=>{
            this.setState({
                isplay:true
            })
        })
    }
    //结构抽离
    renderSwiper(){
        return this.state.swiper.map(val => (
            <a
            key={val.id}
            href="script:;"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
            <img
                src={`http://localhost:8080${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
                }}
            />
            </a>
        ))
    }
    render () {
        return(
        <div className="home-index">
            {/*轮播图 */}
            <Carousel
            autoplay={this.state.isplay}
            infinite
            >
            {this.renderSwiper()}
            </Carousel>
            {/*导航栏 */}
            <div className='navigater'></div>
        </div>
        ) 
    }
}