import React from 'react'

export default class Sticky extends React.Component{
    state = {

    }
    placeholder = React.createRef()
    content = React.createRef()
    componentDidMount(){
        window.addEventListener("scroll",this.handleScroll)
    }
    componentWillUnmount(){
        //清除监听事件
        window.removeEventListener("scroll",this.handleScroll)
    }
    handleScroll=()=>{
        console.log(111)
        let pDiv = this.placeholder.current
        let cDiv = this.content.current
        let pTop = pDiv.getBoundingClientRect().top;
        if(pTop<=0){
            cDiv.style.position="fixed"
            cDiv.style.top="0"
            cDiv.style.width="100%"
            cDiv.style.zIndex="1"
            pDiv.style.height=this.props.height+"px"

        }else{
            cDiv.style.position="static"
            pDiv.style.height="0"
        }
        
    }

    render () {

        return <div className="sticky">
            {/* 检测距离的空盒子 */}
            <div ref={this.placeholder}></div>
            <div ref={this.content}>{this.props.children}</div>
        </div>
    }
}