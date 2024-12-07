const express = require("express");
const router = express.Router();
const { Earnings } = require("../model/Earning");
const { User } = require("../model/User");

// Handle purchase and profit distribution
router.post("/purchase", async (req, res) => {
  const { user_id, purchase_amount } = req.body;

  if (purchase_amount < 1000) {
    return res
      .status(400)
      .json({ error: "Purchase amount must exceed 1000Rs." });
  }

  try {
    // Fetch the user and their referrer
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Calculate direct referral earnings (5%)
    if (user.referred_by) {
      const referrer = await User.findByPk(user.referred_by);
      const direct_earning = (purchase_amount * 0.05).toFixed(2);

      await Earnings.create({
        user_id: referrer.id,
        referral_level: 1,
        amount: direct_earning,
        purchase_amount,
      });

      // Notify referrer (real-time)
      req.app.get("io").emit("earningUpdate", {
        user_id: referrer.id,
        message: `You earned ₹${direct_earning} from your referral.`,
      });
    }

    // Handle second-level referrals (1%)
    if (user.referred_by) {
      const level1Referrer = await User.findByPk(user.referred_by);
      if (level1Referrer.referred_by) {
        const level2Referrer = await User.findByPk(level1Referrer.referred_by);
        const indirect_earning = (purchase_amount * 0.01).toFixed(2);

        await Earnings.create({
          user_id: level2Referrer.id,
          referral_level: 2,
          amount: indirect_earning,
          purchase_amount,
        });

        // Notify second-level referrer
        req.app.get("io").emit("earningUpdate", {
          user_id: level2Referrer.id,
          message: `You earned ₹${indirect_earning} from an indirect referral.`,
        });
      }
    }

    res
      .status(200)
      .json({ message: "Purchase recorded and earnings distributed." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
