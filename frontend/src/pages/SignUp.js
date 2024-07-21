import { useRef, useState, useEffect } from "react"
import axios from '../api/axios'

const SignUp = () => {
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

    return (
        <section>
            <p ref={errRef} 
                className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive">
                    {errMsg}
            </p>
        </section>
    )
}

export default SignUp

