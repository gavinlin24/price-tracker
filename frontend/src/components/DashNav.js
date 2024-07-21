import { Link } from "react-router-dom"

const DashNav = ({ search, setSearch, onSearch }) => {

    const handleInputChange = (e) => {
      console.log(e.target.value)
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
                    <Link to="/dash/search">Search</Link>
                </li>
                <li>
                    <Link>Starred</Link>
                </li>
                <li>
                    <Link>Logout</Link>
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
