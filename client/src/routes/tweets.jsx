import { useEffect, useState } from "react"
import { useFetcher } from "react-router-dom"
import { url } from "../utils/serverUrl"
import { io } from 'socket.io-client'
//import toast, { Toaster } from 'react-hot-toast'
import {FaRegHeart} from 'react-icons/fa6'


export async function action({ request }) {
  const formData = await request.formData()
  const bodyObj = Object.fromEntries(formData)
  // Socket initialization
  

  try {
    const req = await fetch(url + '/tweets/', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}


export default function Tweets() {
    const fetcher = useFetcher()
    const socket = io('http://localhost:5500')
    // const toastOptions = {
    //     duration: 5000
    // }
    const [tweets, setTweets] = useState([])
    useEffect(() => {
      socket.on('connect', () => {
        console.log(socket.id)
      })
        //fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions): toast.error(fetcher.data.error) : ''
        socket.on("new tweet", (newTweet) => {
            setTweets((prev)=>{
            
               return [...prev, newTweet]
             
            })
           

            // setTweets(new Set(tweets))
            // setTweets(Array.from(tweets))
        })
      socket.on('disconnect', () => {
        console.log(socket.id)
      })
    }, [socket, fetcher])
    const sorted = Array.from(new Set(tweets.map(e => JSON.stringify(e)))).map(e => JSON.parse(e))
    console.log(sorted)
    return (
      <>
        <div className="flex flex-col">
          {sorted.length > 0
            ? sorted.map((item) => (
                <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                      </div>
                      {item.author.email} · 1d
                    </h2>
                    <p className="mx-16"> {item.content} </p>
                    <div className="card-actions justify-end">
                      <FaRegHeart />
                    </div>
                  </div>
                </div>
              ))
            : ''}
        </div>
        <div className="absolute bottom-0 w-full">
          <fetcher.Form method="post" className="join w-full p-5">
            <input
              className="input input-bordered join-item w-full"
              placeholder="your tweet here!"
              name="content"
            />
            <button className="btn join-item btn-primary rounded-md">
              {fetcher.state === 'idle' ? (
                'Send'
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </fetcher.Form>
        </div>
      </>
    )
}