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
    this.setState({
      titleSelectedStatus:{
        ...titleSelectedStatus,//每一项展开
        [type]:true//[]表示对象里的变量
      },
      openType:type
    })

  }
  //渲染显示选择方式
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
  //判断遮罩是否显示
  renderMask=()=>{
    let {openType} = this.state
    if(openType=="area"||openType=="mode"||openType=="price"){
      return (
        <div className={styles.mask} />
      )
    }
    return null
  }
  // 取消函数
   onCancel=()=>{
     this.setState({
       openType:""
     })
   }
   //保存函数
   onSave=(val,type)=>{
     console.log('保存时选择数据',val)
    this.setState({
      selectedValues:{
        ...this.state.selectedValues,
        [type]:val
      },
      openType:""
    })
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
        </div>
      </div>
    )
  }
}
