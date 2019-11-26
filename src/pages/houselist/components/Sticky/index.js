import React from 'react'

export default class Sticky extends React.Component{
    state = {

    }

    render () {

        return <div className="sticky">
            {/* 检测距离的空盒子 */}
            <div></div>
            <div>{this.props.children}</div>
        </div>
    }
}