const mongoose = require("mongoose");

// Define the schema
// Define the nested modbusRTU schema
const modbusRTUSchema = new mongoose.Schema({
  ts: Number,
  device_type: Number,
  txn: String,
  res: String,
  data: [Array],
  datalen: Number,
});

// Define the main schema
const dataSchema = new mongoose.Schema({
  topic: String,
  ts: Number,
  datetime: String,
  AIN: [Number],
  DIN: [Number],
  DOUT: [Number],
  modbusRTU: {
    type: Map,
    of: modbusRTUSchema,
  },
});

// Create the model
const DataModel = mongoose.model("YourData", dataSchema);

// Schema for mqtt data
const MQTTDataSchema = new mongoose.Schema({
  machineName: {
    type: String,
  },
  Good_Part: {
    type: Number,
  },
  Bad_part: {
    type: Number,
  },
  Total_parts: {
    type: Number,
  },
  IDEAL_TIME_IN_min: {
    type: Number,
  },
  MAC_ON_OFF_TIME: {
    type: Number,
  },
  receivedTopic: {
    type: String,
  },
  downTimeLoss: {
    type: String,
  },
  operatingTime: {
    type: String,
  },
});

const MQTTDataModel = mongoose.model("MQTTData", MQTTDataSchema);

// Create a Mongoose model with a password field
const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  company_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
  machine_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    default: null,
  },
  role: {
    type: String,
    enum: [
      "admin",
      "user",
      "quality_manager",
      "batch_control_manager",
      "production_manager",
    ],
    default: "user",
  },
  password: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

const CompanySchema = new mongoose.Schema({
  company_name: String,
  company_logo: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("Company", CompanySchema);

const MachineSchema = new mongoose.Schema({
  company_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
    default: null,
  },
  logo: String,
  machine_name: String,
  production_time: Number,
  ideal_cycle_time: Number,
  planned_shutdown: Number,
  scrap_number: Number,
  design_capacity: Number,
  topic: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Machine = mongoose.model("Machine", MachineSchema);

// Define the schema for the child parts
const childParts = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

const childPartSchema = new mongoose.Schema({
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
    default: null,
  },
  childParts: [childParts],
});

// Create the model
const childPart = mongoose.model("ChildPart", childPartSchema);

//schema for inventory
const inventorySchema = new mongoose.Schema({
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
    default: null,
  },
  partName: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

const batchControlSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
    default: null,
  },
  partName: {
    type: String,
    required: true,
  },
  materialUsed: {
    type: String,
    default: "NA",
  },
  cavityNo: {
    type: String,
    default: "NA",
  },
  burnMark: {
    type: String,
    default: "NA",
  },
  discolouration: {
    // Add the missing discolouration property
    type: String,
    default: "NA",
  },
  spillage: {
    type: String,
    default: "NA",
  },
  dentMark: {
    type: String,
    default: "NA",
  },
  sortRejections: {
    type: String,
    default: "NA",
  },
  flash: {
    type: String,
    default: "NA",
  },
  setUp: {
    type: String,
    default: "NA",
  },
  shortShots: {
    type: String,
    default: "NA",
  },
  others: {
    type: String,
    default: "NA",
  },
});

// Create the model from the schema
const BatchControl = mongoose.model("BatchControl", batchControlSchema);

// Event Models
const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  className: String,
});

const events = new mongoose.Schema(
  {
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    selectedPart: {
      type: String,
      required: true,
    },
    totalPartsRequired: {
      type: Number,
      required: true,
    },
    backlog: {
      type: Number,
      required: true,
    },
    cycleTime: {
      type: Number,
      required: true,
    },
    maxPartsPerShift: {
      type: Number,
      required: true,
    },
    shiftsPlanned: {
      first: {
        type: Boolean,
        required: true,
      },
      second: {
        type: Boolean,
        required: true,
      },
      third: {
        type: Boolean,
        required: true,
      },
    },
    includeSunday: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    events: [eventSchema],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", events);



const Sparelist = new mongoose.Schema({
  refNo: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  currentStock: {
    type: String,
    required: false,
  },
  minStock: {
    type: String,
    required: false,
  },
  maxStock: {
    type: String,
    required: false,
  },
  drowing:{
    type: String,
    required: false,
  }
});
const Spare = mongoose.model("Spare", Sparelist);

// Export the model
module.exports = {
  DataModel,
  MQTTDataModel,
  User,
  Company,
  Machine,
  childPart,
  Inventory,
  BatchControl,
  Event,
  Spare,
};
