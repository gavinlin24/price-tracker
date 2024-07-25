import DashNav from "./DashNav"
import { Outlet } from "react-router-dom"

const DashLayout = ({ search, setSearch, onSearch, fetchTracked, setProducts }) => {
  return (
    <>
      <DashNav 
        search={search} 
        setSearch={setSearch} 
        onSearch={onSearch} 
        fetchTracked={fetchTracked} 
        setProducts={setProducts} />
      <Outlet />
    </>
  )
}

export default DashLayout
