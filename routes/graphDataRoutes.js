// routes/events.js
const express = require("express");
const graphDataController = require("../controllers/graphDataController");
const router = express.Router();

// Get graph data of individual machines
router.get("/machine/:machineName", graphDataController.getMachinesGraphData);

// Get graph data of company
router.get("/company", graphDataController.getCompanyGraphData);

module.exports = router;
