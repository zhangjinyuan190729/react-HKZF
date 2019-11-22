import React from 'react'
//css 样式
import './index.scss'
//轮播图组件导入
import { Carousel,Grid } from "antd-mobile"
// axios 导入
import Axios from "axios"
// 导入图片
import { Request } from "../../utils/Request"
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
//flex 布局导入
import { Flex ,WhiteSpace} from "antd-mobile"
//导入utli 的定位地址函数
import { getCurrentCity } from "../../utils/index"
const menus = [
    { name: '整租', imgSrc: nav1, path: '/home/houselist' },
    { name: '合租', imgSrc: nav2, path: '/home/houselist' },
    { name: '地图找房', imgSrc: nav3, path: '/map' },
    { name: '去出租', imgSrc: nav4, path: '/rent/add' }
  ]
export default class Index extends React.Component{
    state = {
        swiper: [],
        imgHeight: 176,
        isplay:false,
        groups:[],
        news:[],
        cityname:null    
    }
//初始化渲染
    componentDidMount() {
        this.getSwiper()
        this.getGroups()
        this.getNews()
        this.getCurrentSite()
    }
//获取当前定位
   async getCurrentSite(){
        let res = await getCurrentCity()
        // console.log(res.label)
        this.setState({
            cityname:res.label
        })
    }
//获取轮播图数据
    async getSwiper () {
        // let res = await Axios.get("http://localhost:8080/home/swiper")
        let res = await Request.get("/home/swiper")
        this.setState({
            swiper:res.data.body
        },()=>{
            this.setState({
                isplay:true
            })
        })
    }
//获取租房小组结构
 async getGroups(){
    let res = await Axios.get("http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0")
    this.setState({
        groups:res.data.body
    })
  }
// 获取最新资讯
async getNews(){
    let res = await Axios.get("http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0")
    // console.log(res)
    this.setState({
        news:res.data.body
    })
    }

//轮播图结构抽离
    renderSwiper(){
        return this.state.swiper.map(val => (
            <a
            key={val.id}
            href="script:;"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
            <img
                src={`http://localhost:8080${val.imgSrc}`}
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
//导航栏结构抽离
    getNav(){
       return menus.map(item=>(
            <Flex.Item 
            key={item.name}
            className="navitem"
            onClick={()=>{
                this.props.history.push(item.path)
            }}>
                <img src={item.imgSrc} />
                <h2>{item.name}</h2>
            </Flex.Item>
        ))
    }
//资讯列表结构抽离
    getNewsList(){
      return this.state.news.map((item,index)=>{
           return(
            <li 
            className="news-item"
            key={index}
            >
            <img src={`http://localhost:8080${item.imgSrc}`} />
            <div className="list-right">
                <h2>{item.title}</h2>
                <p>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                </p>
            </div>
          </li>
        )
       })
    }
//HTMl结构
    render () {
        return(
        <div className="home-index">
            {/* 搜索栏部分 */}
            <Flex className='searchBox'>
                <Flex className='searchLeft'>
                    <div
                    className='location'
                    onClick={()=>{
                        this.props.history.push('/citylist')
                    }}
                    >
                    <span>{this.state.cityname}</span>
                    <i className="iconfont icon-arrow" />
                    </div>
                    <div
                    className='searchForm'
                    onClick={()=>{
                        this.props.history.push('/search')
                    }}
                    >
                        <i className="iconfont icon-seach" />
                        <span>请输入小区或地址</span>
                    </div>
                </Flex>
                <i className="iconfont icon-map" 
                onClick={()=>{
                    this.props.history.push('/map')
                }} />
            </Flex>
            {/*轮播图 */}
            <Carousel
            autoplay={this.state.isplay}
            infinite
            >
            {this.renderSwiper()}
            </Carousel>
            {/*导航栏 */}
            <Flex className='navigater'>
                {this.getNav()}
            </Flex>
            {/*租房小组 */}
            <div className="groups">
              <div className="groups-title" >
                <h3>租房小组</h3>
                <span>更多</span>
              </div>
              {/*  rendeItem 属性：用来 自定义 每一个单元格中的结构*/}
              <Grid
                data={this.state.groups}
                columnNum={2}
                square={false}
                activeStyle
                hasLine={false}
                renderItem={item => (
                  <Flex className="grid-item" justify="between">
                    <div className="desc">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                    <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                  </Flex>
                )}
          />
        </div>
            {/*最新资讯*/}  
            <div className="news">
                <div className="news-title">
                    最新资讯
                </div>
                <ul className='news-list'>
                  {this.getNewsList()}
                </ul>
            </div>    
        </div>
        ) 
    }
}