import React from 'react';
//导入路由
import {BrowserRouter as Router, Route ,Link} from "react-router-dom"
//导入home组件
import Home from './pages/home'
import Citylist from './pages/citylist'
export default class App extends React.Component{

  render(){
    return<Router>
        <div>
          <Link to='/home'>home组件</Link>
          &nbsp;
          <Link to='/citylist'>cityliste组件</Link>
          <Route path='/home' component={Home}></Route>
          <Route path='/citylist' component={Citylist}></Route>
        </div>
    </Router>
  }
}