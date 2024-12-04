import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { Outlet } from "react-router-dom"
export default function Root() {
    return (<>
        <Navbar />
        <Outlet/>
        <Footer/>
    </>)
}