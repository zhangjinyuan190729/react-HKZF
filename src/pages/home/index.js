import React from 'react'
//导入 antd-modile ui 组件
import { TabBar } from 'antd-mobile';
//导入css文件
import "./home.css"
//导入路由
import {Route} from 'react-router-dom'
//导入组件
import Index from '../index'
import Houselist from '../houselist'
import News from '../news'
import Profile from '../profile'
// 抽象TabBar菜单的数据
const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home/index'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/houselist'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]

export default class Home extends React.Component{
    state = {
      selectedTab:this.props.location.pathname,
      hidden: false,
      fullScreen: false,
      }
      //tabbar 循环方法
    gettabbar(){
      // console.log(this.props.location.pathname)
      // console.log(this.state.selectedTab)
      return tabItems.map(item=>(
      <TabBar.Item
        icon={<i className={`iconfont ${item.icon}`}></i>}
        selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
        title={item.title}
        key={item.title}
        selected={this.props.location.pathname === item.path}//解决跳转bug
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });
          this.props.history.push(item.path)
        }}
      />
      ))
    }
    render () {
      // console.log(1111)
      return (
        <div className="home">
          <Route path="/home/index" component={Index}></Route>
          <Route path="/home/houselist" component={Houselist}></Route>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/profile" component={Profile}></Route>
          <div className="home-tabbar">
            <TabBar
            noRenderContent={true}
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
            >
             {this.gettabbar()}
            </TabBar>
          </div>
        </div>
     )
    }
}