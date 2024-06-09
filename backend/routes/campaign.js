const express = require('express');
const router = express.Router();
const {createCampaign,getCampaigns,getCampaignById,updateCampaign,deleteCampaign,} = require('../controllers/campaign');
const { auth, isAdmin } = require('../middlewares/auth');

// Define routes for campaigns
router.post('/campaigns', auth,isAdmin, createCampaign);
router.get('/campaigns', auth,isAdmin, getCampaigns);
router.get('/campaigns/:id', auth,isAdmin, getCampaignById);
router.put('/campaigns/:id', auth,isAdmin, updateCampaign);
router.delete('/campaigns/:id', auth,isAdmin, deleteCampaign);

module.exports = router;