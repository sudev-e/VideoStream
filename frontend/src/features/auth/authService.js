import axios from 'axios'

const API_URL = '/api/users/'

//Register user
const register = async (userData) =>{
    console.log(userData)
    const response = await axios.post(API_URL,userData)
    console.log(response)
    if(response.data){
        console.log(response.data)
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

// user Login
const login = async (userData) =>{
    const response = await axios.post(API_URL + 'login',userData,{withCredentials: true})
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const logout = ()=>{
    localStorage.removeItem('user')
}   

 const  authService ={
    register,logout,login 
}
export default authService