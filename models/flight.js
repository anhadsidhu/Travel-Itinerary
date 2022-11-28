const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const destinationSchema = new Schema ({
    airport: {
        type: String,
        require: true,
    },
    arrival: {
        type: Date,
    }

})


const flightSchema = new Schema({
    airline: {
        type: String,


    },
    airport: {
        type: String,


    },
    flightNo: {
        type: Number,
        max: 9999,
        min: 10,
        require: true
    },
    departs: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },
    destination: [destinationSchema],

}, {
    timestamps: true
});




module.exports = mongoose.model('Flight', flightSchema);


