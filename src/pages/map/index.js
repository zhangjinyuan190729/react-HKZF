import React from 'react'
import "./map.scss"
import styles from"./map.module.css"
import NavHeader from "../../components/NavHeader"
import { getCurrentCity } from "../../utils/index"
import Axios from 'axios'
import {Toast} from "antd-mobile"

let BMap = window.BMap
export default class Map extends React.Component{
    state = {
        count:0,
        HouseList:[],
        isShowList:false
        
    }
    componentDidMount(){
        this.initMap()
    }

    //初始化map地图
   async initMap(){
        this.map = new BMap.Map("container"); //map挂载全局
        let city = await getCurrentCity()
            // 创建地址解析器实例     
        var myGeo = new BMap.Geocoder();      
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(city.label,(point)=>{      
            if (point) {      
                // console.log(point)
                this.map.centerAndZoom(point, 11);      
                // map.addOverlay(new BMap.Marker(point));  当前位置小箭头
                this.map.addControl(new BMap.NavigationControl())  //缩放  
                this.map.addControl(new BMap.ScaleControl())     //比例尺
                this.getCityData(city.value,"circle")
            }   
        }, 
        city.label);//好惨呀
    }
//地区房子获取数据
  async getCityData(item,state){
    //发送请求
    Toast.loading("数据加载中...",0)
    let res = await Axios.get(`http://localhost:8080/area/map?id=${item}`)
    //创建覆盖物
    res.data.body.forEach(item => {
        let{
            coord:{latitude,longitude},
            label:cityName,
            value,
            count
        }=item
        // console.log(item)
        let point =new BMap.Point(longitude,latitude)
        var opts = {
            position : point,    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(0, 0)    //设置文本偏移量
            }
        
        // 创建文本标注对象
        var label;
        if(state === "circle"){
            label = new BMap.Label(`
        <div class="${styles.bubble}">
            <p class="${styles.name}">${cityName}</p>
            <p>${count}套</p>
        </div>
        `, opts)  
        }else{
            label = new BMap.Label(`
            <div class="${styles.rect}">
              <span class="${styles.housename}">${cityName}</span>
              <span class="${styles.housenum}">${count}套</span>
              <i class="${styles.arrow}"></i>
            </div>
          `, opts)  
        }
        //去圆点
            label.setStyle({border:"0px",padding:'0'})
            label.addEventListener('click',(e)=>{
                let zoom = this.map.getZoom() //获取缩放值
                if(zoom == 11){
                    setTimeout(() => {
                        this.map.clearOverlays()
                    }, 0);
                    this.map.centerAndZoom(point, 13);  
                    this.getCityData(value,"circle")
                }else if(zoom == 13){
                    setTimeout(() => {
                        this.map.clearOverlays()
                    }, 0);
                    this.map.centerAndZoom(point, 15);  
                    this.getCityData(value,"rect")
                }else if(zoom == 15){
                    this.getCityList(value)
                    // console.log("这里要发送ajax 去获取街道小区的 房子列表")
                    // 点击的时候 的坐标
                    // console.log('e',e)
                    let clickX=e.changedTouches[0].clientX 
                    let clickY=e.changedTouches[0].clientY 
                    // 中心点的y=(屏幕高度-房子列表高)/2
                    // 中心点x=屏幕宽度/2
                    let zhongxinX=window.innerWidth/2;
                    let zhongxinY=(window.innerHeight-330)/2
                    // 移动的距离
                    let juliX=zhongxinX-clickX
                    let juliY=zhongxinY-clickY
                    // console.log(juliX,juliY)
                    this.map.panBy(juliX,juliY);//移动地图
                }
            })
            //添加覆盖物
            this.map.addOverlay(label);   
            // console.log(111)
    });
    Toast.hide()
    //移动隐藏房子列表
    this.map.addEventListener("movestart",()=>{
        this.setState({
            isShowList:false
        })
    })
    } 
   async getCityList(id){
        Toast.loading("数据加载中...",0)
        let res = await Axios.get(`http://localhost:8080/houses?cityId=${id}`)
        this.setState({
            count:res.data.body.count,
            HouseList:res.data.body.list,
            isShowList:true
        })
        Toast.hide()
    }
    //渲染列表
    renderHouseList=()=>{
        return this.state.HouseList.map(item=>{
            return(
                <div 
                 key={item.houseCode}
                className={styles.house}>
                    <div className={styles.imgWrap}>
                        <img className={styles.img} src={`http://localhost:8080${item.houseImg}`} alt="" />
                    </div>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={styles.desc}>{item.desc}</div>
                        <div>
                            {/* ['近地铁', '随时看房'] */}
                                   {item.tags.map((item,index)=>{
                                       let color = `tag${index+1}`
                                       return(
                                        <span 
                                        key = {index}
                                        className={[styles.tag,styles[color] ].join(' ')} >
                                          {item}  
                                        </span>
                                       )
                                   })}
                        </div>
                        <div className={styles.price}>
                            <span className={styles.priceNum}>{item.price}</span> 元/月
                        </div>
                    </div>
                </div>
            )
        })
    }
    render () {

        return (
        <div className='map'>
            <NavHeader>地图找房</NavHeader>
            <div id="container"></div>
            <div
            className={[styles.houseList,this.state.isShowList?styles.show:"" ].join(' ')}
            >
                <div className={styles.titleWrap}>
                    <h1 className={styles.listTitle}>房屋列表</h1>
                    <a className={styles.titleMore} href="/house/list">
                        更多房源
                    </a>
                </div> 
                <div className={styles.houseItems}>
                    {this.renderHouseList()}
                </div>
            </div>
        </div>
        )
    }
}