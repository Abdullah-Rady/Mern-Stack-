const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportsSchema = new Schema({
  
  problem: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  userid : {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseid : {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["Other", "Technical", "Financial"]
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Resolved", "Pending"]
  },
  seen: {
    type: Boolean,
    default: false,
  },

  
});

module.exports = mongoose.model("Problems", ReportsSchema);