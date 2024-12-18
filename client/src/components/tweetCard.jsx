/* eslint-disable react/prop-types */
import { url } from '../utils/serverUrl'
import { FaRegHeart } from 'react-icons/fa6'
export default function TweetCard({item}) {
    return (
      <div className="card bg-base-100 text-black m-5 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={
                    item.author.picture
                      ? url + '/' + item.author.picture
                      : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                />
              </div>
            </div>
            {item.author.fullName || item.author.email} · 1d
          </h2>
          <p className="mx-16"> {item.content} </p>
          <div className="card-actions justify-end">
            <FaRegHeart />
          </div>
        </div>
      </div>
    )
}