import Header from "./components/Header";
import Layout from "./components/Layout"
import DashLayout from "./components/DashLayout";
import RequireAuth from "./components/RequireAuth";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About"
import Search from "./pages/Search";
import Tracked from "./pages/Tracked";
import Missing from "./pages/Missing";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "./api/axios"
import useAuth from "./hooks/useAuth";

function App() {
  const [products, setProducts] = useState([]);
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { auth } = useAuth();

  const onSearch = async (product) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/scrape/search/${product}`,
        {
          headers: {'Authorization': `Bearer ${auth.accessToken}`}
        }
      );
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

 const fetchTracked = async () => {
  try {
    setIsLoading(true)
    const response = await axios.post(
      "/users/display",
      JSON.stringify({username: auth.user}),
      {
        headers: { 
          'Authorization': `Bearer ${auth.accessToken}`, 
          'Content-Type': 'application/json' 
        },
        withCredentials: true
      }
    )
    setTrackedProducts(response.data)
    console.log(trackedProducts)
  } catch (err) {
    if (!err?.response) {
      console.log('No Server Response')
    } else if (err.response?.status === 400) {
      console.log('No products to be tracked')
      setTrackedProducts([])
    } else {
      console.log('Fetch failed')
    }
  } finally {
    setIsLoading(false)
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
            onSearch={onSearch} 
            fetchTracked={fetchTracked} 
            setProducts={setProducts} 
            setTrackedProducts={setTrackedProducts}
            />} 
          >
            <Route exact path="/dash" element={<Search 
              products={products} 
              isLoading={isLoading} />} 
            />
            <Route exact path="/dash/tracked" element={<Tracked 
              trackedProducts={trackedProducts} 
              fetchTracked={fetchTracked} 
              isLoading={isLoading} 
              />} 
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
