import express, { Router } from "express"
import Tweets from "../models/tweets.mjs"

const router = Router()

const checkIfConnected = (req, res, next) => {
    if (!req.user) return res.send({ error: 'Not authorized! Please login!' })
    next()
}

router.post("/", checkIfConnected, async (req, res) => {
    const { content } = req.body 
    const author = req.user
    try {
        const newTweet = new Tweets({ content, author })
        await newTweet.save()
        return res.send(newTweet)
        
    } catch (error) {
        return res.send({error: error.message})
    }
    
})




export default router