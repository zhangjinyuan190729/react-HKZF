const TOKEN = "my_token"
//设置token
let  setToken = (val) => {
    localStorage.setItem(TOKEN,val)
}
//获取token
let  getToken = () => {
    return localStorage.getItem(TOKEN)
}
//设置token
let  removeToken = (val) => {
    localStorage.removeItem(TOKEN)
}
//判断是否登录
let isAuth = () =>{
    return !! getToken()//!!强制转换
}
export {setToken,getToken,removeToken,isAuth}