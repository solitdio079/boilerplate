import { useFetcher } from "react-router-dom"

export default function Login() {
    const fetcher = useFetcher()
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
              <fetcher.Form className="card-body">
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