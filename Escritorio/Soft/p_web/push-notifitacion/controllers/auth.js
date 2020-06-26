const User = require("../models/users");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ msg: "Please provide an email and password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ msg: "Datos inválidos" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(404).json({ msg: "Datos inválidos" });
    }

    const token = user.getAuthToken();

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};
