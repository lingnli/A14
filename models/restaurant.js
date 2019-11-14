const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
