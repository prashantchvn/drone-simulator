const mongoose = require('mongoose')

const WayPoints = new mongoose.Schema({
        time: { type: 'Number', default: 0 },
        lat: { type: 'Number', required: true },
        lng: { type: 'Number', required: true },
    }, 
    {
        collection: 'way-points'
    }, 
    { 
        timestamps: true 
    }
)

const model = mongoose.model('WayPoints',WayPoints)

module.exports = model