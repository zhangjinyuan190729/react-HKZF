import React from 'react'
import SearchHeader  from "../../components/SearchHeader"
import { Icon } from "antd-mobile"
import Filter from "./components/Filter"
import "./houselist.scss"
import { getCurrentCity } from '../../utils/index'
import {Request} from "../../utils/Request"
import {List,AutoSizer,WindowScroller,InfiniteLoader} from "react-virtualized"
import styles from "./houselist.module.css"
import { resolve } from 'dns'
import Sticky from './components/Sticky'
import NoHouse from './components/NoHouse'
import {Toast} from "antd-mobile"
import {Spring} from "react-spring/renderprops"
export default class Houselist extends React.Component{
    state = {
        cityname :null,
        cityId : null,
        list:[]  ,
        count:0,
        isloading:false//没有数据
      }
    fuilters={}//初始化参数
    async componentDidMount(){
        let res = await getCurrentCity()
        this.setState({
            cityname:res.label,
            cityId:res.value
        },()=>{
            this.gethouselist()
        }) 
    }
    //获取筛选数据
    onFuilter=(val)=>{
        // console.log(val)
        window.scrollTo(0,0)
        this.fuilters = val
        this.gethouselist()
    }
    //获取满足条件的数据
    gethouselist= async ()=>{
        Toast.loading("数据加载中...",0)
        let res= await Request.get('/houses',{
           params:{
            cityId:this.state.cityId,
            ...this.fuilters,
            start:1,
            end:20
           }
        })
        Toast.hide()
        // console.log("请求数据",res)
        let { list , count } = res.data.body
        if(count!==0){
            Toast.info(`总共有${count}套房屋`,1,null,false)
        }
        this.setState({
            list:list,
            count:count,
            isloading:true
        })
        
    }
    //列表中每一项渲染
    rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        style, // Style object to be applied to row (to position it)
      })=> {
        let item = this.state.list[index]
        if(!item){
          return<div 
            key={key} 
            style={style}
            >拼命加载中.....</div>
        }
        return (
        <div 
        key={key} 
        style={style}
        className={styles.house}
        onClick={()=>{
            this.props.history.push("/detail/"+item.houseCode)
        }}
        >
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
                                    return (
                                        <span 
                                        key={index}
                                        className={[styles.tag,styles[color]].join(' ')}
                                         >
                                        {item}
                                        </span>
                                    )
                                })
                            }
                </div>
                <div className={styles.price}>
                    <span className={styles.priceNum}>{item.price}</span> 元/月
                </div>
            </div>
        </div>
        );
      }
    isRowLoaded=({index})=>{
        // console.log(index)
        return !!this.state.list[index]
    }
    //加载更多
    loadMoreRows=({ startIndex , stopIndex })=>{
        // console.log(startIndex,stopIndex)
        return new Promise(()=>{
          Request.get('/houses',{
            params:{
             cityId:this.state.cityId,
             ...this.fuilters,
             start:startIndex,
             end:stopIndex
            }
         }).then(res=>{
        //    console.log("加载更多",res)
           this.setState({
             list:[...this.state.list,...res.data.body.list]
           })
           resolve()
         })
        })
    }
    //房屋列表
    renderHouselist(){
        if(this.state.isloading&&this.state.count==0){
            // 无数据显示 
            return(   
             <NoHouse>暂无房源....</NoHouse>
            )
        }else{
            //   有数据 房屋列表 
            return(             
            <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={this.state.count}
            >
            {({onRowsRendered,registerChild})=>(
                    <WindowScroller>
                        {({height, isScrolling, onChildScroll, scrollTop})=>(
                        <AutoSizer>
                            {({width}) => (
                                    <List
                                    isScrolling={isScrolling}
                                    onScroll={onChildScroll}
                                    scrollTop={scrollTop}
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}//获取节点
                                    autoHeight//自动调节高度
                                    width={width}
                                    height={height}
                                    rowCount={this.state.count}//总条数
                                    rowHeight={120}//每一行的高度
                                    rowRenderer={this.rowRenderer}//列表每一项
                                    />
                                )}
                        </AutoSizer>
                        )}
                    </WindowScroller>
            )}
            </InfiniteLoader>               
            )
        }
    }
    render () {

        return (
            <div className="houselist">
                <div className="search">
                    <Icon 
                    type="left"
                    onClick={
                        ()=>{
                            this.props.history.go(-1)
                        }
                    }
                    >
                    </Icon>
                    <SearchHeader>
                        {this.state.cityname}
                    </SearchHeader>
                </div>
                {/* 标题栏 */}
                <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                {props => (
                    <div style={props}>
                        <Sticky height={40}> 
                            <Filter onFuilter={this.onFuilter}></Filter>
                        </Sticky>
                    </div>
                )}
                </Spring>
               
                    {this.renderHouselist()}
            </div>
        )
    }
}