import React from 'react'

import { isAuth } from "../../utils/token"


import { Route , Redirect } from "react-router-dom"
//类组件
/*export default class AuthRoute extends React.Component{
    render () {
        let { path , exact , Page} = this.props
        return (
            <Route
            path={path}
            exact={exact}
            render={()=>{
                if(isAuth()){
                    return <Redirect to="/login"></Redirect>
                }
                    return <Page></Page>
            }}
            ></Route>
        )
    }
}*/
// function AuthRote ({path,exact,Page}){  原始写法
function AuthRote ({Page,...test}){
    return (
        <Route
            // path={path}
            // exact={exact}
            {...test}
            render={props=>{
                if(!isAuth()){
                    return <Redirect 
                    to={{
                        pathname:"/login",
                        state:{
                            from:props.location
                        }
                    }}
                    ></Redirect>
                }
                    return <Page></Page>
            }}
            ></Route>
    )
}
export default AuthRote