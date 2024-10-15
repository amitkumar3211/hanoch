const {
  MQTTDataModel,
  Machine,
  Company,
  User,
} = require("../models/DataModel");

const calculateOEE = async (machines) => {
  const results = [];

  for (const machine of machines) {
    const mqttMachines = await MQTTDataModel.find({
      machineName: machine.machine_name,
    });

    if (!mqttMachines) {
      return res.status(404).json({ error: "Machines not found in the mqtt" });
    }

    const mqttMachineData = mqttMachines[mqttMachines.length - 1];

    const totalAvailableTime = 24;
    const plannedShutdown = 3 * machine.planned_shutdown;
    const scheduledOperatingTime = totalAvailableTime - plannedShutdown;
    const downtimeLoss = 1.5;
    const idealCycleTime = machine.ideal_cycle_time;
    const operatingTime = scheduledOperatingTime - downtimeLoss;
    const effectiveOperatingTime = 1.5;
    const speedLoss = operatingTime - effectiveOperatingTime;
    const goodParts = mqttMachineData.Good_Part;
    const badParts = mqttMachineData.Bad_part;
    const totalParts = mqttMachineData.Total_parts;

    const availability = operatingTime / totalAvailableTime;
    const performance = idealCycleTime * (totalParts / operatingTime);
    const quality = goodParts / totalParts;
    const oee = availability * performance * quality;

    results.push({
      availability: availability * 100,
      performance: performance,
      quality: quality * 100,
      oee: oee * 100,
    });
  }

  return results;
};

exports.getMachinesGraphData = async (req, res) => {
  const machineName = req.params.machineName;
  try {
    const mqttMachines = await MQTTDataModel.find({ machineName: machineName });
    const mqttMachineData = mqttMachines[mqttMachines.length - 1];
    const machine = await Machine.findOne({ machine_name: machineName });

    const totalAvailableTime = 24;
    const plannedShutdown = 3 * machine.planned_shutdown;
    const scheduledOperatingTime = totalAvailableTime - plannedShutdown;
    const downtimeLoss = 1.5;
    const idealCycleTime = machine.ideal_cycle_time;
    const operatingTime = scheduledOperatingTime - downtimeLoss;
    const effectiveOperatingTime = 1.5;
    const speedLoss = operatingTime - effectiveOperatingTime;
    const goodParts = mqttMachineData.Good_Part;
    const badParts = mqttMachineData.Bad_part;
    const totalParts = mqttMachineData.Total_parts;

    const availability = operatingTime / totalAvailableTime;
    const performance = idealCycleTime * (totalParts / operatingTime);
    const quality = goodParts / totalParts;
    const oee = availability * performance * quality;

    res.status(200).json({
      goodParts,
      badParts,
      totalParts,
      availability: availability * 100,
      performance: performance * 100,
      quality: quality * 100,
      oee: oee * 100,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCompanyGraphData = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("company_name");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const machines = await Machine.find({ company_name: user.company_name });

    if (!machines) {
      return res.status(404).json({ error: "Machines not found" });
    }

    const data = await calculateOEE(machines);

    if (data.length === 0) {
      return res.status(404).json({ error: "No OEE data available" });
    }

    // Initialize sums
    let totalAvailability = 0;
    let totalPerformance = 0;
    let totalQuality = 0;
    let totalOEE = 0;

    // Sum up each variable for all objects
    data.forEach((machineOEE) => {
      totalAvailability += machineOEE.availability;
      totalPerformance += machineOEE.performance;
      totalQuality += machineOEE.quality;
      totalOEE += machineOEE.oee;
    });

    // Calculate averages
    const numMachines = data.length;
    const averageAvailability = totalAvailability / numMachines;
    const averagePerformance = totalPerformance / numMachines;
    const averageQuality = totalQuality / numMachines;
    const averageOEE = totalOEE / numMachines;

    return res.status(200).json({
      averageAvailability,
      averagePerformance,
      averageQuality,
      averageOEE,
      message: "Averages calculated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
