import { Outlet } from 'react-router-dom'

const Login = () => {
  return (
    <main className="Login">
        <h2>Login page</h2>
        <Outlet />
    </main>
  )
}

export default Login