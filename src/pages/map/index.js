import React from 'react'
import "./map.scss"

//定义变量
let BMap = window.BMap
export default class Map extends React.Component{
    state = {

    }
    componentDidMount(){
        this.initMap()
    }
    //初始化map地图
    initMap(){
        var map = new BMap.Map("container"); 
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 11);  
    }
    render () {

        return (
        <div className='map'>
            <div id="container">

            </div>
        </div>
        )
    }
}