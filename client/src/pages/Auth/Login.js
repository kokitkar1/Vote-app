import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from "../../context/auth.js";


const Login = () => {

    
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")


    const [auth, setAuth] = useAuth()

    //for navigation 
    const navigate = useNavigate()
    const location = useLocation()


    // Form Function for enable Submit without refresh
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',{username,password})
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))

                if(res.data.user.role === 0){

                    navigate( location.state || "/vote");
                }else{
                    navigate( location.state || "/dashboard/admin");
                }
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }


  return (
    <>
        <div className="form-container" style={{ minHeight: "76vh" }}>

            <form onSubmit={handleSubmit}>
            <h4 className='title'>Login</h4>
        
            <div className="mb-3">
                <input value={username} onChange={(e)=> setUserName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter User Name' required />
            </div>

            <div className="mb-3">
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
            </div>  

            {/* <div className="mb-3 form-check">
                <input onChange={(e)=> setName(e.target.value)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <div className="mb-3">
            <button  type="submit" className="btn btn-primary">LOGIN</button>
            </div>

            <div className="mb-3">
                    <p className="paragraph-text1" > <a href="/forgot-password">Forgot Password</a></p>
                    <p className="paragraph-text">Don't have Account <a href="/register"> Register</a></p>
            </div>
            
        </form>
</div>
    </>
  )
}

export default Login