import { Link } from "react-router-dom"

const DashNav = ({ search, setSearch, onSearch, setProducts }) => {

    const handleInputChange = (e) => {
      console.log(e.target.value)
      setSearch(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(search); 
    };

    const handleLogout = (e) => {
        setProducts('')
        setSearch('')
    }

    return (
        <nav className="Nav">
            <ul>
                <li>
                    <Link to="/dash">Search</Link>
                </li>
                <li>
                    <Link>Tracked</Link>
                </li>
                <li>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
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

export default DashNav
