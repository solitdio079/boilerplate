console.log("Service Worker Loaded")
self.addEventListener('push', function (event) {
  console.log('Received a push message', event)
  let data = {}
  if (event.data) {
    console.log(`Push Message: ${JSON.stringify(event.data.json())}`)
    data = event.data.json()
     const title = data.title
     const body = data.content
     const icon = './vite.svg'
    // const tag = 'try-tag'

     event.waitUntil(
       self.registration.showNotification(title, {
         body: body,
         icon: icon,
         //tag: tag,
       })
     )
  } else {
    console.log(`Service worker has no push event data`);
  }
 

  // Display notification or handle data
  // Example: show a notification
 

  // Attempt to resubscribe after receiving a notification
  //event.waitUntil(resubscribeToPush())
})
