import { useEffect, useState } from "react"
import { useFetcher, useLoaderData, NavLink } from "react-router-dom"
import { url } from "../utils/serverUrl"
import { io } from 'socket.io-client'
//import toast, { Toaster } from 'react-hot-toast'
//import {FaRegHeart} from 'react-icons/fa6'
import TweetCard from "../components/tweetCard"
//import InfiniteEntity from "../components/infiniteEntity"
import InfiniteScroll from "react-infinite-scroll-component"


export async function loader() {
  try {
    const req = await fetch(url + '/tweets/?cursor=', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await req.json()
    console.log(response)
    return response
  } catch (error) {
    return { error: error.message }
  }
}
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
    if(response.msg) 
    return response
  } catch (error) {
    return { error: error.message }
  }
}


export default function Tweets() {
    const fetcher = useFetcher()
  const socket = io(url)
   const [cursor, setCursor] = useState(null)
   const [hasMore, setHasMore] = useState(true)

    // const toastOptions = {
    //     duration: 5000
    // }
    const [tweets, setTweets] = useState(useLoaderData())
  useEffect(() => {
      cursor ? fetchMoreData() : ''
      socket.on('connect', () => {
        console.log(socket.id)
      })
      
        //fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions): toast.error(fetcher.data.error) : ''
        socket.on("new tweet", (newTweet) => {
            setTweets((prev)=>{
            
               return [newTweet, ...prev]
             
            })
           

            // setTweets(new Set(tweets))
            // setTweets(Array.from(tweets))
        })
      socket.on('disconnect', () => {
        console.log(socket.id)
      })
    }, [socket, fetcher.data,tweets])

  const fetchMoreData = async () => {
    try {
      const response = await fetch(url + `/tweets/?cursor=${cursor || ''}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const moreItems = await response.json()
      console.log(moreItems)
      setTweets((prevItems) => [...prevItems, ...moreItems])

      moreItems.length > 0 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
    const sorted = Array.from(new Set(tweets.map(e => JSON.stringify(e)))).map(e => JSON.parse(e))
    //console.log(sorted)
    return (
      <div className="flex flex-col-reverse lg:flex-row w-full">
        <div className="flex-col p-5 w-full lg:h-screen lg:w-1/5 lg:sticky lg:top-0">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col">
            {sorted.length > 0
              ? sorted.map((item) => <TweetCard key={item._id} item={item} />)
              : ''}
            <InfiniteScroll
              dataLength={sorted.length || 0}
              next={() => setCursor(sorted[sorted.length - 1]._id)}
              hasMore={hasMore}
              loader={
                <span className="loading loading-infinity loading-lg"></span>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b className="text-white">Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="flex flex-col flex-wrap text-white w-full">
                {sorted.map((item) => (
                  <TweetCard item={item} key={item._id} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
          <div className="sticky bottom-0 w-full">
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
        </div>
        <div className="flex-col p-5 w-full lg:w-1/5 lg:h-screen lg:sticky lg:top-0">
          <ul className="menu menu-vertical bg-base-200 rounded-box">
            <li>
              <NavLink to="/admin">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/admin/notifications">Notifications</NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
}