import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//导入图标样式
import "./assets/fonts/iconfont.css"
//导入ui组件库样式
import 'antd-mobile/dist/antd-mobile.css'
//自定义初始化样式  就近覆盖原则
import "./index.css"
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
