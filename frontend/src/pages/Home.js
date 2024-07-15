import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <main className="Home">
        <h2>Home page</h2>
        <Outlet />
    </main>
  )
}

export default Home
