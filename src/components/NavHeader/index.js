import React from 'react'
import { NavBar , Icon } from "antd-mobile"
import "./navheader.scss"
//解决路由不能使用问题
import { withRouter } from 'react-router-dom'
import propsType from "prop-types"
class NavHeader extends React.Component{
    state = {

    }

    render () {

        return <NavBar
        className='navbar'
        mode='light'
        icon={<Icon type="left"></Icon>}
        onLeftClick={()=>this.props.history.go(-1)}
        >
           {this.props.children}
        </NavBar>
    }
}
NavHeader.propsTypes = {
    children:propsType.string
}
export default withRouter(NavHeader)