const express = require("express");
const { createOne } = require("../services/contactService");

const router = express.Router();
// user endpoint
router.post("/", createOne);

module.exports = router;
