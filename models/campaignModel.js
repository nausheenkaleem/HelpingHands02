const mongoose = require('mongoose')


const campaignSchema = new mongoose.Schema({
    campaign_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        
        trim: true,
        required: true
    },
    amount_req:{
        type: Number,
        trim: true,
        required: true
    },
    phone_number:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    donated:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Campaigns", campaignSchema)