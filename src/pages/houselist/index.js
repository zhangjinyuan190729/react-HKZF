import React from 'react'
import SearchHeader  from "../../components/SearchHeader"
import { Icon } from "antd-mobile"
import Filter from "./components/Filter"
import "./houselist.scss"
import { getCurrentCity } from '../../utils/index'
import {Request} from "../../utils/Request"
import {List,AutoSizer} from "react-virtualized"
import styles from "./houselist.module.css"
export default class Houselist extends React.Component{
    state = {
        cityname :null,
        cityId : null,
        list:[]  ,
        count:0
      }
    async componentDidMount(){
        let res = await getCurrentCity()
        this.setState({
            cityname:res.label,
            cityId:res.value
        })
    }
    onFuilter=(val)=>{
        console.log(val)
        this.fuilters = val
        this.gethouselist()
    }
    //获取满足条件的数据
    gethouselist= async ()=>{
        let res= await Request.get('/houses',{
           params:{
            cityId:this.state.cityId,
            ...this.fuilters,
            start:1,
            end:20
           }
        })
        console.log("请求数据",res)
        let { list , count } = res.data.body
        this.setState({
            list:list,
            count:count
        })
    }
    //列表中每一项渲染
    rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        style, // Style object to be applied to row (to position it)
      })=> {
        let item = this.state.list[index]
        return (
        <div 
        key={key} 
        style={style}
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
                                    return (
                                        <span className={[styles.tag,styles[color]].join(' ')} >
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
                    <SearchHeader>{this.state.cityname}</SearchHeader>
                </div>
                {/* 标题栏 */}
                <Filter 
                onFuilter={this.onFuilter}
                >
                </Filter>
                {/* 房屋列表 */}
                 <AutoSizer>
                    {({height, width}) => (
                    <List
                    width={width}
                    height={height}
                    rowCount={this.state.count}
                    rowHeight={120}
                    rowRenderer={this.rowRenderer}
                />
                    )}
                </AutoSizer>
            </div>
        )
    }
}