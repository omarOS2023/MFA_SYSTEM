const contactModel = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

exports.createOne = asyncHandler(async (req, res) => {
  const contact = await contactModel.create(req.body);
  res.status(201).json({ data: contact });
});
