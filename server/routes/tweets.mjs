import express, { Router } from "express"
import Tweets from "../models/tweets.mjs"

const router = Router()

const checkIfConnected = (req, res, next) => {
    if (!req.user) return res.send({ error: 'Not authorized! Please login!' })
    next()
}
router
router.post("/", checkIfConnected, async (req, res) => {
    const { content } = req.body 
    const author = req.user
    try {
        const newTweet = new Tweets({ content, author })
        await newTweet.save()
        req.io.emit("new tweet", newTweet)
        return res.send({msg: "tweet created"})
        
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
        const lasTweets = await Tweets.find(query, null, { sort: -1, limit: 5 })
        return res.send(lasTweets)
    } catch (error) {
        return {error: error.message}
    }
})



export default router