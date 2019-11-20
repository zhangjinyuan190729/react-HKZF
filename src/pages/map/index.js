import React from 'react'
import "./map.scss"
import styles from"./map.module.css"
import NavHeader from "../../components/NavHeader"
import { getCurrentCity } from "../../utils/index"
import Axios from 'axios'

//定义变量
let BMap = window.BMap
export default class Map extends React.Component{
    state = {

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
        myGeo.getPoint(city.label,async (point)=>{      
            if (point) {      
                this.map.centerAndZoom(point, 11);      
                // map.addOverlay(new BMap.Marker(point));  当前位置小箭头
                this.map.addControl(new BMap.NavigationControl())  //缩放  
                this.map.addControl(new BMap.ScaleControl())     //比例尺
                this.getCityData(city.value)
               
            }   
        }, 
        city.lable);
    }
//地区房子获取数据
  async getCityData(item){
    //发送请求
    let res = await Axios.get(`http://localhost:8080/area/map?id=${item}`)
    //创建覆盖物
    res.data.body.forEach(item => {
        let{
            coord:{latitude,longitude},
            label:cityName,
            value,
            count
        }=item
        let point =new BMap.Point(longitude,latitude)
        var opts = {
            position : point,    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(0, 0)    //设置文本偏移量
            }
            var label = new BMap.Label(`
            <div class="${styles.bubble}">
                <p class="${styles.name}">${cityName}</p>
                <p>${count}套</p>
            </div>
            `, opts);  // 创建文本标注对象
            label.addEventListener('click',(e)=>{
            setTimeout(() => {
                this.map.clearOverlays()
            }, 0);
            this.map.centerAndZoom(point, 13);  
            this.getCityData(value)
            })
            //添加覆盖物
            this.map.addOverlay(label);   
    });
    }   
    render () {

        return (
        <div className='map'>
            <NavHeader>地图找房</NavHeader>
            <div id="container"></div>
        </div>
        )
    }
}