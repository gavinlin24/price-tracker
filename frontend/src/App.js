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
import api from "./api/axios"
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
      const response = await api.get(`/scrape/${product}`);
      setProducts(response.data);
      console.log(products)
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
    const response = await api.post(
      "/users/display",
      JSON.stringify({username: auth.user}),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    setTrackedProducts(response.data)
    console.log(trackedProducts)
  } catch (err) {
    console.log(err)
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
            />} 
          >
            <Route exact path="/dash" element={<Search 
              products={products} 
              isLoading={isLoading} />} 
            />
            <Route exact path="/dash/tracked" element={<Tracked 
              trackedProducts={trackedProducts} 
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
