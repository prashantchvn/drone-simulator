const WayPoints = require('../models/waypoint.model')
const express = require('express')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await WayPoints.find()
        res.json({ status: 'ok', data: data })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

router.post('/', async (req, res) => {
    try {
        await WayPoints.create({
            lat : req.body.lat,
            lng : req.body.lng
        })
        const data = await WayPoints.find()
        res.json({ status: 'ok', data: data })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

router.delete('/:id', async (req,res) => {
    try {
        await WayPoints.findByIdAndDelete(req.params.id)
        const data = await WayPoints.find()
        res.json({ status: 'ok', data: data })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

router.delete('/', async (req,res) => {
    try {
        await WayPoints.deleteMany()
        res.json({ status: 'ok'})
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

module.exports = router;
