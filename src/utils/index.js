import axios from "axios"
//获取地理定位
export let getCurrentCity=()=>{
    let city = JSON.parse(localStorage.getItem("my-city"))
    if(!city){
       return new Promise( (resolve,reject)=>{
            var myCity = new window.BMap.LocalCity()
            myCity.get(async result=>{
                 city = result.name+"市"
                 var res = await axios.get("http://localhost:8080/area/info?name="+city)
                localStorage.setItem("my-city",JSON.stringify(res.data.body))
                resolve(res.data.body)
            })
            
        })
    }else{
        return Promise.resolve(city)
    }
}