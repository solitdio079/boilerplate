import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/root'
import ErrorPage from './error-page'
import Login, {action as loginAction} from './routes/login'
import Tweets, {action as sendTweetAction, loader as tweetLoader} from './routes/tweets'
import {loader as initialTweetLoader} from './routes/loaders/initialTweetsLoader'
import AdminRoot from './routes/admin/adminRoot'
import EditUser, {action as edituserAction, loader as editUserLoader} from './routes/admin/users/editUser'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
        action: loginAction,
      },
      {
        path: "/admin",
        element: <AdminRoot />,
        errorElement: <ErrorPage />,
        children: [{
          path: "/admin/profile/:id",
          element: <EditUser />,
          errorElement: <ErrorPage />,
          action: edituserAction,
          loader: editUserLoader
        }]
      }
    ],
  },
  {
    path: "/loaders",
    children: [
      {
        path: "/loaders/initialtweets",
        loader: initialTweetLoader
      }
    ]
  },
  {
    path: '/tweets',
    element: <Tweets />,
    errorElement: <ErrorPage />,
    action: sendTweetAction,
    loader: tweetLoader
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
