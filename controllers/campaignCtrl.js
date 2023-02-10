const Campaigns = require('../models/campaignModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const campaignCtrl = {
    getCampaigns: async(req, res) =>{
        try {
            const features = new APIfeatures(Campaigns.find(), req.query)
            .filtering().sorting().paginating()

            const campaigns = await features.query

            res.json({
                status: 'success',
                result: campaigns.length,
                campaigns: campaigns
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCampaign: async(req, res) =>{
        try {
            const {campaign_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const campaign = await Campaigns.findOne({campaign_id})
            if(campaign)
                return res.status(400).json({msg: "This campaign already exists."})

            const newCampaign = new Campaigns({
                campaign_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newCampaign.save()
            res.json({msg: "Created a campaign"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCampaign: async(req, res) =>{
        try {
            await Campaigns.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Campaign"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCampaign: async(req, res) =>{
        try {
            const {title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Campaigns.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({msg: "Updated a Campaign"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = campaignCtrl