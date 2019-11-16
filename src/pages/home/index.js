import React from 'react'
//导入 antd-modile ui 组件
import { TabBar } from 'antd-mobile';
//导入路由
import {Route} from 'react-router-dom'
import News from '../news'
import My from '../my'

export default class Home extends React.Component{
    state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
      }

    render () {

      return (
      <div className="home-tabbar">
        <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={
              <i className='iconfont icon-ind'></i>
            }
            selectedIcon={
              <i className='iconfont icon-ind'></i>
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >

          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className='iconfont icon-findHouse'></i>
            }
            selectedIcon={
              <i className='iconfont icon-findHouse'></i>
            }
            title="找房"
            key="Koubei"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >

          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className='iconfont icon-infom'></i>
            }
            selectedIcon={
              <i className='iconfont icon-infom' />
            }
            title="资讯"
            key="Friend"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >

          </TabBar.Item>
          <TabBar.Item
            icon={<i className='iconfont icon-my'></i>}
            selectedIcon={<i className='iconfont icon-my'></i>}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >

          </TabBar.Item>
        </TabBar>
      </div>
      )
    }
}