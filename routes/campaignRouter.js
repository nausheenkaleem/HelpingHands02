const router = require('express').Router()
const campaignCtrl = require('../controllers/campaignCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/campaigns')
    .get(campaignCtrl.getCampaigns)
    .post(auth, authAdmin, campaignCtrl.createCampaign)


router.route('/campaigns/:id')
    .delete(auth, authAdmin, campaignCtrl.deleteCampaign)
    .put(auth, authAdmin, campaignCtrl.updateCampaign)
    
module.exports = router