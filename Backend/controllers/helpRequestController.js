const HelpRequest = require("../models/HelpRequest");

// Create Help Request
exports.createRequest = async (req, res) => {
  try {
    const request = new HelpRequest({
      ...req.body,
      userId: req.user.id,
    });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Failed to create help request", error: err.message });
  }
};

// Get All Requests (optionally filterable)
exports.getAllRequests = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;

    const requests = await HelpRequest.find(filter).populate(
      "userId",
      "name email"
    );
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching help requests" });
  }
};

// Get Single Request
exports.getRequestById = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!request) return res.status(404).json({ msg: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching request" });
  }
};

// Update Help Request
exports.updateRequest = async (req, res) => {
  try {
    const updated = await HelpRequest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // user can only update their own
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ msg: "Request not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: "Failed to update request" });
  }
};

// Delete Help Request
exports.deleteRequest = async (req, res) => {
  try {
    const deleted = await HelpRequest.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted)
      return res.status(404).json({ msg: "Request not found or unauthorized" });
    res.json({ msg: "Request deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Failed to delete request" });
  }
};

// Get My Help Requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find({ userId: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching your help requests" });
  }
};
