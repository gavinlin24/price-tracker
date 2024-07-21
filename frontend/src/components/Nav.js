import { Link } from "react-router-dom"

const Nav = () => {

    return (
        <nav className="Nav">
            <ul>
                <li>
                    <Link to="/login">Login / Signup</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
