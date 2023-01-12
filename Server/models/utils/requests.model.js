const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestsSchema = new Schema({
  
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  
  courseid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course"
  },

  name: {
    type: String
  },
  course : {
    type: String
  }

  
});

module.exports = mongoose.model("Requests", RequestsSchema);