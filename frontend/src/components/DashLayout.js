import DashNav from "./DashNav"
import { Outlet } from "react-router-dom"

const DashLayout = ({ search, setSearch, onSearch, setProducts }) => {
  return (
    <>
      <DashNav 
        search={search} 
        setSearch={setSearch} 
        onSearch={onSearch} 
        setProducts={setProducts} />
      <Outlet />
    </>
  )
}

export default DashLayout
