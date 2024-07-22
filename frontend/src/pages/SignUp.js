import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SIGNUP_URL = '/users';

const SignUp = () => {
    const userRef = useRef()
    const errRef = useRef()
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user))
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
    }, [pwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!USER_REGEX.test(user) || !EMAIL_REGEX.test(email) || !PWD_REGEX.test(pwd)) {
            setErrMsg('Invalid Entry')
            return;
        }

        try {
            await axios.post(SIGNUP_URL, 
                JSON.stringify({ username: user, email, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            setUser('')
            setEmail('')
            setPwd('')
            navigate('/login')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg(err.response.message);
            } else {
                setErrMsg('Sign Up Failed')
            }
            errRef.current.focus();
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
                <h1>Sign Up</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        ref={userRef} 
                        autoComplete="off" 
                        onChange={ (e) => setUser(e.target.value)} 
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"} 
                        aria-describedby="uidnote" 
                        onFocus={() => setUserFocus(true)} 
                        onBlur={() => setUserFocus(false)} 
                    />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="email">Email</label>
                <input type="email" 
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    required 
                    aria-invalid={validEmail ? "false" : "true"} 
                    aria-describedby="emailnote" 
                    onFocus={() => setEmailFocus(true)} 
                    onBlur={() => setEmailFocus(false)} 
                />
                <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    Not a valid email.
                </p>
                <label htmlFor="password">Password</label>
                <input type="password" 
                    id="password" 
                    onChange={(e) => setPwd(e.target.value)} 
                    value={pwd} 
                    required 
                    aria-invalid={validPwd ? "false" : "true"} 
                    aria-describedby="pwdnote" 
                    onFocus={() => setPwdFocus(true)} 
                    onBlur={() => setPwdFocus(false)} 
                />
                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: 
                    <span aria-label="exclamation mark"> !</span> 
                    <span aria-label="at symbol"> @</span> 
                    <span aria-label="hashtag"> #</span>
                    <span aria-label="dollar sign"> $</span> 
                    <span aria-label="percent"> %</span>
                </p>
                <button className="login-button" 
                        disabled={!validName || !validEmail || !validPwd ? true : false}>
                            Sign Up
                </button>
                </form>
                <p className="signup-text">
                <Link to="/login">Already have an account?</Link>
                </p>
            </section>
        </div>
    )
}

export default SignUp

