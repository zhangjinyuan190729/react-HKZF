// import React, { Component } from 'react'
// import { Flex, WingBlank, WhiteSpace } from 'antd-mobile'

// import { Link } from 'react-router-dom'

// import NavHeader from '../../components/NavHeader'

// import styles from './index.module.css'

// // 验证规则：
// // const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// // const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

// class Login extends Component {
//   render() {
//     return (
//       <div className={styles.root}>
//         {/* 顶部导航 */}
//         <NavHeader className={styles.navHeader}>账号登录</NavHeader>
//         <WhiteSpace size="xl" />

//         {/* 登录表单 */}
//         <WingBlank>
//           <form>
//             <div className={styles.formItem}>
//               <input
//                 className={styles.input}
//                 name="username"
//                 placeholder="请输入账号"
//               />
//             </div>
//             {/* 长度为5到8位，只能出现数字、字母、下划线 */}
//             {/* <div className={styles.error}>账号为必填项</div> */}
//             <div className={styles.formItem}>
//               <input
//                 className={styles.input}
//                 name="password"
//                 type="password"
//                 placeholder="请输入密码"
//               />
//             </div>
//             {/* 长度为5到12位，只能出现数字、字母、下划线 */}
//             {/* <div className={styles.error}>账号为必填项</div> */}
//             <div className={styles.formSubmit}>
//               <button className={styles.submit} type="submit">
//                 登 录
//               </button>
//             </div>
//           </form>
//           <Flex className={styles.backHome}>
//             <Flex.Item>
//               <Link to="/registe">还没有账号，去注册~</Link>
//             </Flex.Item>
//           </Flex>
//         </WingBlank>
//       </div>
//     )
//   }
// }

// export default Login
import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

import { Request as API } from '../../utils/Request'

// 导入处理表单的  withFormik
import { withFormik } from 'formik'
// 导入yup
import * as Yup from 'yup'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  // state={
  //   username:'',
  //   password:''
  // }
  // // 修改用户名
  // getUsername=(e)=>{
  //   console.log('修改的值',e.target.value)
  //   this.setState({
  //     username:e.target.value
  //   })
  // }
  //  // 修改密码
  // getPassword=(e)=>{
  //   console.log('修改的值',e.target.value)
  //   this.setState({
  //     password:e.target.value
  //   })
  // }
  // 表单提交事件
  // handleSubmit=async (e)=>{
  // e.preventDefault();//阻止跳转
  // 获取 用户名和密码  发送ajax去登录--返回token
  // let {username,password}=this.state
  // console.log("提交了",username,password)
  // // 先判断用户名密码是否符合格式.... 验证成功才去发送ajax

  // // 发送
  // let res=await API.post("/user/login",{
  //   username,
  //   password
  // })
  // console.log("登录结果",res)
  // if(res.data.status===200){
  //   //登录成功 顺便存token
  //   localStorage.setItem("my_token",res.data.body.token)
  //   Toast.success("登录成功",2)
  // }else{
  //   Toast.fail("登录失败",2)
  // }

  // }
  render() {
    // console.log('props', this.props)
    let { values, handleChange, handleSubmit, errors } = this.props
    values.username="test2"
    values.password="test2"
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />
        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {errors.username && <div className={styles.error}>{errors.username}</div>}
            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            {/* 1 按钮在form里面 并且 type是submit 提交按钮 会触发 表单提交onsubmit事件 
                --表单提交onsubmit事件  默认页面会刷新---需要阻止  e.preventDefault()
                2 按钮是type="button" 普通按钮 --只能触发onClick
            */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}
// export default Login
// 用withFormik 包裹起来--所有的配置都在props里面有
export default withFormik({
  //  配置
  mapPropsToValues: () => ({ username: '', password: '' }), //相当于state 提供初始数据 return 只有一个对象你又要简写 用()包裹起来
  // validate 表单验证
  // validationSchema 验证配合yup 常用
  validationSchema: Yup.object().shape({
    // 名：验证规则  .matches(正则,错误的提示文字)  长度为5到8位 数字字母下划线
    username: Yup.string().required('请输入用户名！！').matches(REG_UNAME,'用户名要求5-8位'),
    password: Yup.string().required('请输入密码！！').matches(REG_PWD,'密码必须5-12位')
  }),
  handleSubmit: async (values, { props }) => {
    // 获取用户名密码 发送ajax去登录
    // console.log("提交了aaa ", values)
    console.log()
    let { username, password } = values
    // console.log("提交了", username, password)
    // 先判断用户名密码是否符合格式.... 验证成功才去发送ajax
    // 发送
    let res = await API.post("/user/login", {
      username,
      password
    })
    // console.log("登录结果", res)
    if (res.data.status === 200) {
      //登录成功 顺便存token
      localStorage.setItem("my_token", res.data.body.token)
      
      if(props.location.state){
        props.history.push(props.location.state.from.pathname)
      }else{
        props.history.push("/home/profile")
      }
      
    } else {
      Toast.success("登录成功", 2)
      Toast.fail("登录失败", 2)
    }
  }
})(Login);




