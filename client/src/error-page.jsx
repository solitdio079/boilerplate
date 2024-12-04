import { useEffect } from 'react'
import { useRouteError } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function ErrorPage() {
  const error = useRouteError()

  console.error(error)

  useEffect(() => {
    const toastOptions = {
      duration: 5000,
    }
    toast.dismiss()
    toast.error(error.message, toastOptions)
  })

  return <Toaster />
}
