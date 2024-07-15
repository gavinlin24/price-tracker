import { Link } from "react-router-dom"

const Nav = ({ search, setSearch, onSearch }) => {

    const handleInputChange = (e) => {
      setSearch(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(search); 
    };

    return (
        <nav className="Nav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <form className="searchForm" onSubmit={handleSubmit}>
                <label htmlFor="search">Search Item</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Product"
                    value={search}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    )
}

export default Nav
