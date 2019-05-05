/* eslint-disable class-methods-use-this */
const User = require("../model/User");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Invalid password" });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: User.generateToken(user)
    });
  }
}

module.exports = new SessionController();
