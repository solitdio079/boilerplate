import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/root'
import ErrorPage from './error-page'
import Login, {action as loginAction} from './routes/login'


const router =  createBrowserRouter([{
  path: "/",
  element: <Root />,
  loader: rootLoader ,
  errorElement: <ErrorPage />,
  children: [{
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction
  }]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
