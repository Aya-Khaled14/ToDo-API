const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Todo", todoSchema);
