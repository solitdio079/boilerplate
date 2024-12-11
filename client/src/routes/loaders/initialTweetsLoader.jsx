import { url } from "../../utils/serverUrl"

export async function loader() {
    try {
        const req = await fetch(url + "/tweets/?cursor=", {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        console.log(response)
        return response
    } catch (error) {
        return {error: error.message}
    }
}