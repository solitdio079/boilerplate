//import { useEffect } from "react"
import Footer from "../components/footer"
import { userContext } from "../utils/contexts"
import Navbar from "../components/navbar"
import { Outlet, useLoaderData } from "react-router-dom"
import {url} from '../utils/serverUrl'
export async function loader() {
    try {
        const req = await fetch(url + "/auth/login/status", {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        if(response.error) return null
        return response
    } catch (error) {
        return {error: error.message}
    }
}
export default function Root() {
    const user = useLoaderData()
    return (<userContext.Provider value={user}>
        <Navbar user={user} />
        <Outlet/>
        <Footer/>
    </userContext.Provider>)
}