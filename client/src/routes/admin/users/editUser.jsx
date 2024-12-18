import { useFetcher, useLoaderData } from "react-router-dom"
// import { userContext } from "../../../utils/contexts"
import { useEffect } from "react"
import { url } from "../../../utils/serverUrl"
import toast, { Toaster } from 'react-hot-toast' 


export async function loader({ params }) {
    const { id } = params
    

    try {
        const req = await fetch(url + `/users/${id}`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
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

export async function action({ request, params }) {
    const {id} = params
    const formData = await request.formData()
    const name = formData.get('picture').name === '' ? false : true
    console.log(name)
    let fetchBody = formData
    let fetchMethod = 'PUT'
    let fetchHeaders = {}

    if (!name) {
        fetchBody = JSON.stringify(Object.fromEntries(formData))
        fetchHeaders = {
            'Content-Type': 'application/json'
        }
        fetchMethod = 'PATCH'
    }

    try {
        const req = await fetch(url + `/users/${id}`, {
            method: fetchMethod,
            mode: 'cors',
            credentials: 'include',
            headers: fetchHeaders,
            body: fetchBody

        })
        const response = await req.json()
        return response
        
    } catch (error) {
        return {error: error.message}
    }
    
    
}

export default function EditUser() {
    const fetcher = useFetcher()
    const user = useLoaderData()
    const toastOptions = {
        duration: 5000
    }
    useEffect(() => {
        fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg,toastOptions):toast.error(fetcher.data.error,toastOptions): ''
    },[fetcher.data])
    return (
      <>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="avatar">
            <div className="w-24 rounded-full mx-auto my-3">
              <img src={user.picture ? url +"/"+user.picture : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
            </div>
          </div>
          <fetcher.Form method="post" encType="multipart/form-data" className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                defaultValue={user.email || ''}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Full Name</label>
              <input
                type="text"
                placeholder="Djoko Keita"
                className="input input-bordered"
                name="fullName"
                defaultValue={user.fullName || ''}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input
                type="file"
                name="picture"
                className="file-input w-full max-w-xs"
              />
                    </div>
                    <Toaster/>
            <div className="form-control mt-6">
                        <button className="btn btn-primary">
                            {fetcher.state === 'idle' ? 'update' : <span className="loading loading-spinner"></span> }
              </button>
            </div>
          </fetcher.Form>
        </div>
      </>
    )
}