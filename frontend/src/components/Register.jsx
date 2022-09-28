import React from 'react'
import '../styles/Register.css'
import {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
 import {toast} from 'react-toastify'
import {register,reset} from '../features/auth/authSlice'
import Spinner from './Spinner'
function Register() {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
      })
    const {name,email,password,password2}=formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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
      if(password !== password2){
        toast.error('password do not match')
      }else{
        const userData={
          name,email,password
        }
        dispatch(register(userData))
      }
    }
    if(isLoading){
      return <Spinner/>
    }
  return (
    <div className='reghead'>
    <div className="row ">
    <div className="col-12"><form onSubmit={onSubmit}>
            <h1>Register</h1>
            <div class="social-container">
            </div>
            <span>or use your account</span>
            <input type='text' placeholder="Enter username" name='name'  value={name}  onChange={onchanging}/>
            <input type="email" placeholder="Enter Email" name='email'value={email}  onChange={onchanging}/>
            <input type="password" placeholder="Password"  name='password' value={password}  onChange={onchanging} />
            <input type='password'     name='password2' value={password2} 
      placeholder='confirm password' onChange={onchanging} />
             <Link to='/login'>Already have an account?</Link>  
            <button>Register</button>
        </form></div>
  </div>
  </div>
  )
}

export default Register