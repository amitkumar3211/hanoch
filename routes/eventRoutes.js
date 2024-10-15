const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

// Get all events
router.get("/", eventController.getEvents);

// Add a new event
router.post("/", eventController.postEvents);

// Delete an event
router.delete("/:id", eventController.deleteEvents);

module.exports = router;
