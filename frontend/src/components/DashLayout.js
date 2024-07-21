import DashNav from "./DashNav"
import { Outlet } from "react-router-dom"

const DashLayout = ({ search, setSearch, onSearch }) => {
  return (
    <>
      <DashNav search={search} setSearch={setSearch} onSearch={onSearch} />
      <Outlet />
    </>
  )
}

export default DashLayout
