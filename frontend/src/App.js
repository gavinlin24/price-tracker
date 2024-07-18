import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About"
import Missing from "./pages/Missing";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await api.get('/products');
  //       setProducts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //       } else {
  //       console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   }

  //   fetchProducts();
  // }, [searchResults])

  const onSearch = async (product) => {
    try {
      setLoading(true);
      const response = await api.get(`/${product}`);
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
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <Header title="Uniqlo Tracker" />
      <Nav search={search} setSearch={setSearch} onSearch={onSearch} />
      <Routes>
        <Route exact path="/" element={<Home products={products} loading={loading} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
