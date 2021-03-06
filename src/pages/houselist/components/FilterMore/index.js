import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state={
    selectedValues:this.props.defaultvalue
  }
  onClick(id){
    let newValues =[...this.state.selectedValues]
    let index =newValues.indexOf(id)
    if(index == -1){
      newValues.push(id)
    }else{
      //findindex (funtion)item每一项  返回满足条件的索引
      newValues.splice(index,1)
    }
    this.setState({
      selectedValues:newValues
    })
  }
  // <-------------------------------渲染数据------------------------------------->
  // 渲染标签
  renderFilters(arr) {
    // 高亮类名： styles.tagActive
    return arr.map(item =>{
      // console.log(this)
      let isSelected = this.state.selectedValues.indexOf(item.value)!=-1
        return(
          <span 
          key={item.value}
          className={[styles.tag,isSelected? styles.tagActive:""].join(' ')}
          onClick={()=>{
            this.onClick(item.value)
          }}
          >
          {item.label}
          </span>
        )
    })
  }
  render() {
    let {characteristic, floor, oriented,roomType } = this.props.data
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div 
        className={styles.mask} 
        onClick={()=>{
          this.props.onCancel()//不传值默认事件对象even
        }}
        />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter 
        onCancel={()=>{
            this.setState({
              selectedValues:[]
            })
          }
        } 
        onSave={()=>{
          this.props.onSave(this.state.selectedValues,this.props.type)
        }}
        cancelText={"清空"}
        className={styles.footer} 
        />
      </div>
    )
  }
}
