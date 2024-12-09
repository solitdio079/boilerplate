import { useEffect } from "react"
import { useFetcher } from "react-router-dom"
import { url } from "../utils/serverUrl"
import toast, {Toaster} from 'react-hot-toast'

export async function action({ request }) {
  const formData = await request.formData()
  const dataObj = Object.fromEntries(formData)

  try {
    const req = await fetch(url + "/auth/login/email", {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    const response = await req.json()
    return response
    
  } catch (error) {
    return {error: error.message}
  }
}
export default function Login() {
  const fetcher = useFetcher()
  
 const toastOptions = {
      duration: 5000,
 }
  useEffect(() => {
    fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions): toast.error(fetcher.data.error, toastOptions): ''
  }, [fetcher.data])
    return (
      <>
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                A verification link will be sent to your inbox! 
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
              <fetcher.Form method="post" className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <Toaster/>
               
                <div className="form-control mt-6">
                  <button className="btn btn-primary"> {fetcher.state === 'idle' ? 'Login': <span className="loading loading-spinner loading-md"></span>} </button>
                </div>
              </fetcher.Form>
            </div>
          </div>
        </div>
      </>
    )
}