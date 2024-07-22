import Header from "./components/Header";
import Layout from "./components/Layout"
import DashLayout from "./components/DashLayout";
import RequireAuth from "./components/RequireAuth";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About"
import Search from "./pages/Search";
import Missing from "./pages/Missing";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import api from "./api/axios"

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const onSearch = async (product) => {
      try {
        setIsLoading(true);
        const response = await api.get(`/scrape/${product}`);
        setProducts(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
  
  return (
    <div className="App">
      <Header title="Price Tracker" />
      <Routes>
        {/*Public Routes*/}
        <Route exact path="/" element={<Layout />} >
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/about" element={<About />} />
        </Route>

        {/*Protected Routes*/}
        <Route element={<RequireAuth />} >
          <Route exact path="/dash" element={<DashLayout 
            search={search} 
            setSearch={setSearch} 
            onSearch={onSearch} />} 
          >
            <Route exact path="/dash/search" element={<Search 
              products={products} 
              isLoading={isLoading}/>} 
            />
          </Route>
          {/*End Dash*/}
        </Route>
        {/*End Protected*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
