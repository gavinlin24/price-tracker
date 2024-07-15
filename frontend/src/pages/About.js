import { Outlet } from 'react-router-dom'

const About = () => {
  return (
    <main className="About">
        <h2>About page</h2>
        <Outlet />
    </main>
  )
}

export default About