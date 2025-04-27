const User = require("../models/User");

// Get public profile by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id)
      .select("-password -resetToken -resetTokenExpiry")
      .populate("followers", "name username")
      .populate("following", "name username");

    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user profile" });
  }
};

// Get logged-in user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password -resetToken -resetTokenExpiry")
      .populate("followers", "name username")
      .populate("following", "name username");

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching profile" });
  }
};

// Update logged-in user's profile
// exports.updateMyProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     delete updates.password; // Password updates should be handled separately

//     const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
//       new: true,
//       runValidators: true,
//     }).select("-password -resetToken -resetTokenExpiry");

//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ msg: "Error updating profile" });
//   }
// };
// exports.updateMyProfile = async (req, res) => {
//   try {
//     const updates = req.body;

//     if (req.file) {
//       updates.avatar = `/uploads/${req.file.filename}`;
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
//       new: true,
//       runValidators: true,
//     }).select("-password -resetToken -resetTokenExpiry");

//     res.json(updatedUser);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ msg: "Error updating profile" });
//   }
// };

exports.updateMyProfile = async (req, res) => {
  try {
    const updates = {
      username: req.body.username,
    };

    if (req.file) {
      updates.avatar = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password -resetToken -resetTokenExpiry");

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Error updating profile" });
  }
};

// Optional: Search users
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q;
    const users = await User.find({
      $or: [
        { name: new RegExp(query, "i") },
        { username: new RegExp(query, "i") },
      ],
    }).select("name username avatar bio");

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error searching users" });
  }
};
