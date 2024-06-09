const Campaign = require("../models/Campaign");

exports.createCampaign = async (req, res) => {
  try {
    const { name, audience, message } = req.body;
    const campaign = new Campaign({ name, audience, message });
    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json({
      success: true,
      data: campaigns,
      message: "All campaigns fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    const id = req.params.id;
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    res.status(200).json({
      success: true,
      data: campaign,
      message: `Successfully got campaign for ID ${id}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, audience, message, sent_at, delivery_status } = req.body;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    if (name) campaign.name = name;
    if (audience) campaign.audience = audience;
    if (message) campaign.message = message;
    if (sent_at) campaign.sent_at = sent_at;
    if (delivery_status) campaign.delivery_status = delivery_status;

    await campaign.save();

    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating campaign',
    });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const id = req.params.id;
    const campaign = await Campaign.findByIdAndDelete(id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Campaign with ID ${id} deleted successfully`,
    });
  } catch (error) {
    res.status500().json({
      success: false,
      message: 'Error deleting campaign',
    });
  }
};
