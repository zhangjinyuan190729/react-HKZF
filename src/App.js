import React from 'react';
//导入路由
import {BrowserRouter as Router, Route ,Redirect} from "react-router-dom"
//导入home组件
import Home from './pages/home'
import Citylist from './pages/citylist'
import Map from './pages/map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Rent from './pages/Rent'
import AuthRoute from "./components/AuthRoute"

export default class App extends React.Component{

  render(){
    return<Router>
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
          <Route path='/detail/:id' component={HouseDetail}></Route>
          <Route path='/login' component={Login}></Route>
          <AuthRoute path='/rent' exact={true} Page={Rent}></AuthRoute>
    </Router>
  }
}