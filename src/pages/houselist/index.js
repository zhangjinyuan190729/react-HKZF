import React from 'react'
import SearchHeader  from "../../components/SearchHeader"
import { Icon } from "antd-mobile"
import Filter from "./components/Filter"
import "./houselist.scss"
import { getCurrentCity } from '../../utils/index'
export default class Houselist extends React.Component{
    state = {
        cityname:null
    }
    async componentDidMount(){
        let res = await getCurrentCity()
        this.setState({
            cityname:res.label
        })

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
                <Filter></Filter>
            </div>
        )
    }
}