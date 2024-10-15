const { Event } = require("../models/DataModel");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("machine");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postEvents = async (req, res) => {
  const event = new Event({
    machine: req.body.formData.machine,
    selectedPart: req.body.formData.selectedPart,
    totalPartsRequired: req.body.formData.totalPartsRequired,
    backlog: req.body.formData.backlog,
    cycleTime: req.body.formData.cycleTime,
    maxPartsPerShift: req.body.formData.maxPartsPerShift,
    maxPartsPerShift: req.body.formData.maxPartsPerShift,
    shiftsPlanned: req.body.formData.shiftsPlanned,
    includeSunday: req.body.formData.includeSunday,
    events: req.body.events.map((event) => ({
      title: event.title,
      start: event.start,
      className: event.className,
    })),
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEvents = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
