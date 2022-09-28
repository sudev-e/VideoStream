import React from 'react'
 import '../styles/Login.css'
 import {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login,reset} from '../features/auth/authSlice'
import Spinner from './Spinner'
function Login() {
    const [formData,setFormData]=useState({
        email:'',
        password:'',
      })
      const {email,password}=formData

const navigate = useNavigate()
const dispatch = useDispatch()
console.log('hi');
const {user,isLoading,isError,isSuccess,message}= useSelector(
    (state) => state.auth)

    useEffect(()=>{
        if(isError){
         toast.error(message)
        }
        if(isSuccess || user){
         navigate('/')
        }
       
        dispatch(reset())
       },[user,isSuccess,isError,message,navigate,dispatch])
       const onchanging=(e)=>{
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]:e.target.value,
        }))
        }
        const onSubmit=(e)=> {
          e.preventDefault()
          const userData={
            email,
            password
          }
          dispatch(login(userData))
        }
        if(isLoading){
          return <Spinner/>
        }

  return (
    <div className="loghead">
      <div className="row">
        <div className="col-12"><form onSubmit={onSubmit}>
				<h1>Login</h1>
				<div class="social-container">
				</div>
				<span>or use your account</span>
				<input type="email" placeholder="Email" name='email'value={email} onChange={onchanging}/>
				<input type="password" placeholder="Password" name='password' value={password} onChange={onchanging} />
                <a><Link to='/login'>Forgot your password?</Link></a> 
				<button>Log In</button>
			</form></div>
      </div>
      </div>
  )
}

export default Login