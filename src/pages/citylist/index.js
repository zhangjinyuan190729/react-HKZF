import React from 'react'
//引入sass文件
import './citylist.scss'
//引入antd-mobile
import { NavBar, Icon , Toast } from 'antd-mobile';
//导入 axios
import Axios from "axios"
//导入utli 的定位地址函数
import { getCurrentCity } from "../../utils/index"
//导入可视区域加载插件
import { List , AutoSizer } from "react-virtualized"
import NavHeader from "../../components/NavHeader"
 let HAS_HOUSE =['北京','上海','广州','深圳']
export default class Citylist extends React.Component{
    state = {
        citylist:{},
        cityindex:[]
    }
    componentDidMount(){
        this.getCityList()
    }
  listRef = React.createRef()
//获取城市列表
async getCityList(){
    const res =await Axios.get("http://localhost:8080/area/city?level=1")
    let cityList = {}
    res.data.body.forEach(item => {
        let word =  item.short.substr(0,1)
        if(!cityList[word]){
            cityList[word] = [item]
        }else{
            cityList[word].push(item)
        }
    })
    //城市首字母
    let cityIndex = Object.keys(cityList).sort()
    //获取热门城市
    let hotCity = await Axios.get("http://localhost:8080/area/hot")
        cityList['hot'] = hotCity.data.body
        cityIndex.unshift('hot')
    //获取当前定位
    let currentCity = await getCurrentCity()
        cityList["#"] = [currentCity]
        cityIndex.unshift("#")
    //赋值
    this.setState({
        citylist:cityList,
        cityindex:cityIndex
    })
    }
// 当滚动的时候 onRowsRendered 获取滚动到顶部的索引
onRowsRendered=({ startIndex, stopIndex })=>{
    // console.log(startIndex,stopIndex) startIndex 最顶部那个开始索引  stopIndex底部结束的索引
    // 修改高亮的索引 就高亮了
    if(this.state.activeindex!=startIndex){ //优化一下 如果一直一样就没必要改 不一样改 效率高
        this.setState({
            activeindex:startIndex
        })
    }
    }
// 动态计算每个盒子的高度
getHeight=({index})=>{
    // console.log('索引index',index)
    // 单词的高度+城市的高度*城市的数量长度
    // 36+50*城市的数量
    let word=this.state.cityindex[index]
    let citys=this.state.citylist[word]
    return 36+50*citys.length
    }
// 函数 写在组件里面  渲染的div内容
rowRenderer=({
        key, // 唯一的key
        index, // 索引 0123... 
        isScrolling, // 是否正在滚动  滚动true
        isVisible, // 是否可见  true见到了
        style, // 必须加上 不加就没有样式
    })=> {
        //   index
        // console.log("index",index)
        let word=this.state.cityindex[index];// # hot a b c d ...
        let citys=this.state.citylist[word]  ; // 城市数组{a:[],b:[],hot:[]}
        return (
            <div key={key} style={style} className="city">
                    <div className="title">{this.formatWord(word)}</div>
                    {/* 循环生成对应单词 的城市 */}
                    {citys.map((item)=>{
                        return <div className="name" key={item.value} 
                        onClick={()=>{
                            if(HAS_HOUSE.indexOf(item.label) == -1){
                                Toast.info("暂无房源")
                            }else{
                                localStorage.setItem('my-city',JSON.stringify(item))
                                this.props.history.push('/home/index')
                            }
                        }}
                        >{item.label}</div>
                    })}
            </div>
        );
    }
// 格式化 单词 
formatWord=(word)=>{
        // 判断返回 中文或者大写单词
        switch (word) {
            case '#':
                return '定位城市'
            case 'hot':
                return '热门城市'
            default:
                return word.toUpperCase()
        }
    }
    render () {

        return(
            <div className='citylist'>
                <NavHeader>城市列表</NavHeader>
            {/* 左侧城市列表 */}
            <AutoSizer>
            {/*height  width 这个组件AutoSizer会帮我们算出占满屏幕  */}
            {({height, width}) => (
                <List
                    scrollToAlignment="start"
                    ref={this.listRef}
                    width={width} //列表宽
                    height={height}//列表高
                    rowCount={this.state.cityindex.length}//总数据条数
                    rowHeight={this.getHeight} // 每一项的高度 可以直接写数字 也可以写函数
                    rowRenderer={this.rowRenderer}//渲染的div内容
                    onRowsRendered={this.onRowsRendered}
                />
            )}
            </AutoSizer>
            {/* 右侧字母列表 */}
            <ul className="city-index">
                 {/* 循环生成字母 */}
                 {this.state.cityindex.map((item,index)=>{
                     return <li
                        onClick={()=>{
                            this.listRef.current.scrollToRow(index)
                        }}
                        className={this.state.activeindex==index?'index-active':''} 
                        key={index}
                        >

                                {item=='hot'?'热':item.toUpperCase()}
                                
                         </li>
                 })}

             </ul>
        </div>
        )
    }
}