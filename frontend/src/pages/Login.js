import { useRef, useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post(
            LOGIN_URL, 
            JSON.stringify({username: user, password: pwd}),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            }
        )
        const accessToken = response?.data?.accessToken
        setAuth({ user, pwd, accessToken })
        setUser('')
        setPwd('')
        navigate('/dash')
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 400) {
          setErrMsg('Please enter a Username and Password')
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized User')
        } else {
          setErrMsg('Login failed')
        }
        errRef.current.focus()
      }
    }

    return (
      <div className="login-div">
        <section>
            <p ref={errRef} 
                className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive">
                    {errMsg}
            </p>
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                ref={userRef}
                autoComplete="off" 
                onChange={(e) => setUser(e.target.value)} 
                value={user} 
                required
              />
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                onChange={(e) => setPwd(e.target.value)} 
                value={pwd} 
                required
              />
              <button className="login-button">Login</button>
            </form>
            <p className="signup-text">
              <Link to="/signup">Don't have an account?</Link>
            </p>
        </section>
      </div>
    )
}

export default Login
