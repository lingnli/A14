//新增restaurant model 並設定存入格式
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  number: {
    type: Number
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
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String
  }, // 加入 userId，建立跟 User 的關聯
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
