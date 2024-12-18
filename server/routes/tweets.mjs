import express, { Router } from "express"
import Tweets from "../models/tweets.mjs"
import Users from "../models/users.mjs"
import Notifications from "../models/notifications.mjs"
import webpush from 'web-push'
import 'dotenv/config'

// Initiate webpush
webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

const router = Router()

const checkIfConnected = (req, res, next) => {
    if (!req.user) return res.send({ error: 'Not authorized! Please login!' })
    next()
}
router
router.post("/", checkIfConnected, async (req, res) => {
    const { content } = req.body 
    const author = await Users.findById(req.user._id)
    try {
      const newTweet = new Tweets({ content, author })
      await newTweet.save()
      const newNotification = new Notifications({
        title: 'New Tweet',
        content: `${author.email} posted a new tweet!`,
        target: `all`,
        action: '/tweets',
      })
      await newNotification.save()

      req.io.emit('new notification', newNotification)
      req.io.emit('new tweet', newTweet)
      // Send Web push Notification
      if (author.notifUrl) {
    webpush
      .sendNotification(
        author.notifUrl,
        JSON.stringify({
          title: 'New Tweet',
          content: `${author.email} posted a new tweet!`,
          target: `all`,
          action: '/tweets',
        })
    ).catch((error) => {
        console.error(error.message)
      })
      }
      return res.send({ msg: 'tweet created' })
    } catch (error) {
        return res.send({error: error.message})
    }
    
})


router.get("/", async (req, res) => {
    const { cursor } = req.query
    
    const query = {}

    if (cursor) {
        query._id = {$lt: cursor}
    }

    try {
        const lasTweets = await Tweets.find(query, null, { sort: {_id: -1}, limit: 5 })
        //console.log(lasTweets);
        return res.send(lasTweets)
    } catch (error) {
        return {error: error.message}
    }
})



export default router