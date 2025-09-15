import mongoose from "mongoose"

const EmailSchema = new mongoose.Schema({
  timeOfDay: { type: String, required: true }, // e.g., "14:30"
  title: { type: String, required: true },
  description: { type: String, required: true },
  customMessage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Email || mongoose.model("Email", EmailSchema)
