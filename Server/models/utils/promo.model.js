const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promoSchema = new Schema({
  
  promoCode: {
    type: String,
    required: true,
  },
  
  expirationDate: {
    type: Date,
      required: true,

  },
    courses: {
      type: [String]
  },
  discount: {
    type: Number,
    required: true
  }
  
});

module.exports = mongoose.model("Promo Code", promoSchema);