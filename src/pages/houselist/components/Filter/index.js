import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
//自己封装的api
import {Request} from "../../../../utils/Request"
//获取默认地区
import { getCurrentCity } from "../../../../utils/index"
const titleSelectedStatus={
area:false,
mode:false,
price:false, 
more:false}
// 默认选中的状态
const selectedValues = {
  area: ["area", null],
  mode: ["null"],
  price: ["null"],
  more: []
};

         
export default class Filter extends Component {
  state={
    titleSelectedStatus,
    openType:"",
    filterData:{},
    selectedValues
  }
  componentDidMount(){
    this.getFilterData()
  }
  //获取筛选数据
  async getFilterData(){
    let city = await getCurrentCity()
    let res =await Request("/houses/condition?id="+city.value)
    // console.log(res)
    this.setState({
      filterData:res.data.body
    })
  }
  //是否选中标题高亮函数
  onTitleClick=(type)=>{
    let {titleSelectedStatus,selectedValues} = this.state
    let newtitleSelectedStatus = {...titleSelectedStatus}
    for( let key in newtitleSelectedStatus){
        if(key == type){
          newtitleSelectedStatus[key]=true
          continue//跳出循环
        }
        let selectedVal = selectedValues[key]
        if(key =="area"&&(selectedVal.length!==2 || selectedVal[0] !== 'area')){
          newtitleSelectedStatus[key]=true
        }else if(key == "mode"&&selectedVal[0] !== "null"){
          newtitleSelectedStatus[key]=true
        }else if(key == "price"&&selectedVal[0] !== "null"){
          newtitleSelectedStatus[key]=true
        }else if(key == "more"&&selectedVal.length !==0){
          newtitleSelectedStatus[key]=true
        }else{
          newtitleSelectedStatus[key]=false
        }
    }
    this.setState({
      titleSelectedStatus:newtitleSelectedStatus,
      openType:type
    })
    /* 初始样式
     this.setState({
      titleSelectedStatus:{
        ...titleSelectedStatus,//每一项展开
        [type]:true//[]表示对象里的变量
      },
      openType:type
    })
    */
   
  }
    // 取消函数
  onCancel=(type)=>{
    let {titleSelectedStatus,selectedValues} = this.state
    let newtitleSelectedStatus = {...titleSelectedStatus}
    
        let selectedVal = selectedValues[type]
        if(type =="area"&&(selectedVal.length!==2 || selectedVal[0] !== 'area')){
          newtitleSelectedStatus[type]=true
        }else if(type == "mode"&&selectedVal[0] !== "null"){
          newtitleSelectedStatus[type]=true
        }else if(type == "price"&&selectedVal[0] !== "null"){
          newtitleSelectedStatus[type]=true
        }else if(type == "more"&&selectedVal.length !==0){
          newtitleSelectedStatus[type]=true
        }else{
          newtitleSelectedStatus[type]=false
        }
      this.setState({
      titleSelectedStatus:newtitleSelectedStatus,
        openType:""
      })
  }
    //保存函数
  onSave=(val,type)=>{
    console.log('保存时选择数据',val)
    let {titleSelectedStatus,selectedValues} = this.state
  let newtitleSelectedStatus = {...titleSelectedStatus}
  
      let selectedVal = val
      if(type =="area"&&(selectedVal.length!==2 || selectedVal[0] !== 'area')){
        newtitleSelectedStatus[type]=true
      }else if(type == "mode"&&selectedVal[0] !== "null"){
        newtitleSelectedStatus[type]=true
      }else if(type == "price"&&selectedVal[0] !== "null"){
        newtitleSelectedStatus[type]=true
      }else if(type == "more"&&selectedVal.length !==0){
        newtitleSelectedStatus[type]=true
      }else{
        newtitleSelectedStatus[type]=false
      }
  console.log(23243)
  this.setState({
    titleSelectedStatus:newtitleSelectedStatus,
    selectedValues:{
      ...this.state.selectedValues,
      [type]:val
    },
    openType:""
  },()=>{
    let newsselectedValues={...this.state.selectedValues}
    let area = newsselectedValues["area"][0]
    let areaValue = 'null'
    if(newtitleSelectedStatus['area'].length == 3){
      areaValue =newsselectedValues["area"][2]!='null'?newsselectedValues["area"][2]:newsselectedValues["area"][1]
    }
    let mode =  newsselectedValues["mode"][0]
    let price =  newsselectedValues["price"][0]
    let more =  newsselectedValues["more"].join(",")
    let filters={
      [area]:areaValue,
      mode,
      price,
      more
    }
    console.log("hahahah",filters)
    console.log("hhah",this)
    this.props.onFuilter(filters)
  })
  }
  // <---------------------------------------------------元素渲染--------------------------------------------------->
  //显示筛选方式
  renderFilterPicker=()=>{
    let {openType ,selectedValues} = this.state
    if(openType=="area"||openType=="mode"||openType=="price"){
      let {area,
        characteristic,
        floor,
        oriented,
        price,
        rentType,
        roomType,
        subway
      }=this.state.filterData
      let Data = null
      let cols = 0
      switch (openType) {
        case "area":
          Data = [area,subway]
          cols=3
          break;
        case "mode":
          Data = rentType
          cols=1
          break;
        case "price":
          Data = price
          cols=1
          break;
      }
      let defaultvalue = selectedValues[openType]
      return (
        <FilterPicker 
        key={openType}//key值改变组件必定重新渲染
        type={openType}
        defaultvalue={defaultvalue}
        Data={Data}
        cols={cols}
        onCancel={this.onCancel}
        onSave={this.onSave}
        />
      )
    }
    return null
  }
  //显示遮罩
  renderMask=()=>{
    let {openType} = this.state
    if(openType=="area"||openType=="mode"||openType=="price"){
      return (
        <div className={styles.mask} />
      )
    }
    return null
  }
  //显示侧栏筛选方式
  renderMore=()=>{
    let {characteristic, floor, oriented,roomType}=this.state.filterData
    let data = {characteristic, floor, oriented,roomType}
    let {openType} = this.state
    if(openType=="more"){
      return (
        <FilterMore
        onCancel={this.onCancel}
        onSave={this.onSave}
        defaultvalue={this.state.selectedValues.more}
        type={this.state.openType} 
        data={data}
        />
      )
    }
    return null
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}
        {this.renderMask()}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle 
          titleSelectedStatus={this.state.titleSelectedStatus}
          onTitleClick={this.onTitleClick}
           />

          {/* 前三个菜单对应的内容： */}
          {/*  <FilterPicker /> */}
          {this.renderFilterPicker()}
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
          {this.renderMore()}
        </div>
      </div>
    )
  }
}
