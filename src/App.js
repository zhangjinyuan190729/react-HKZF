import React from 'react';
//导入路由
import {BrowserRouter as Router, Route ,Link,Redirect} from "react-router-dom"
//导入home组件
import Home from './pages/home'
import Citylist from './pages/citylist'
import Map from './pages/map'
export default class App extends React.Component{

  render(){
    return<Router>
        <div className="content">
          <Route 
          exact 
          path="/" 
          render={()=>{
            return <Redirect to='home/index'></Redirect>
          }}
          />
          <Route path='/home' component={Home}></Route>
          <Route path='/citylist' component={Citylist}></Route>
          <Route path='/map' component={Map}></Route>
        </div>
    </Router>
  }
}