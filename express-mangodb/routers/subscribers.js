import express from 'express'

//importing subscriber database model
import Subscriber from '../models/subscriber.js'

export const router = express.Router()

//We want routes for :
// Getting One
router.get('/:id', getSubscribers, async (req, res) => {
    try {
        res.status(201).json(res.subscriber)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})
// Getting All
router.get('/', async (req, res) => {
    try {
        //This finds and returns all subscribers, array of objects 
        const subscribers = await Subscriber.find()
        //sends all subscribers to user
        res.json(subscribers)
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

// Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannel: req.body.subscribeToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// Updating One
router.patch('/:id', getSubscribers, async (req, res) => {

})

// Deleting One 
router.delete('/:id', getSubscribers, async (req, res) => {

})

//get subscriber middleware
async function getSubscribers(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "User not found"})
        }
    } catch (err) {
         return res.status(500).json({
            message: err.message
         })
    }

    res.subscriber = subscriber 
    next()

}