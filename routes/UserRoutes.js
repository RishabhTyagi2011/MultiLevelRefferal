const express = require("express");
const router = express.Router();
const { User } = require("../model/User");

router.post("/register", async (req, res) => {
  const { name, email, referral_code, referred_by } = req.body;
  try {
    const user = await User.create({ name, email, referral_code, referred_by });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
