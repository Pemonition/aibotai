const Loyalty = require('../models/loyalty');

exports.addPoints = async (req, res) => {
  try {
    const { userId, pointsToAdd } = req.body;
    let loyalty = await Loyalty.findOne({ userId });
    if (!loyalty) {
      loyalty = new Loyalty({ userId, points: 0 });
    }
    loyalty.points += pointsToAdd;
    await loyalty.save();
    res.status(200).json({ message: 'Points added successfully', totalPoints: loyalty.points });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add points' });
  }
};

exports.redeemPoints = async (req, res) => {
  try {
    const { userId, pointsToRedeem } = req.body;
    const loyalty = await Loyalty.findOne({ userId });
    if (!loyalty || loyalty.points < pointsToRedeem) {
      return res.status(400).json({ error: 'Not enough points' });
    }
    loyalty.points -= pointsToRedeem;
    await loyalty.save();
    res.status(200).json({ message: 'Points redeemed successfully', remainingPoints: loyalty.points });
  } catch (error) {
    res.status(500).json({ error: 'Failed to redeem points' });
  }
};
