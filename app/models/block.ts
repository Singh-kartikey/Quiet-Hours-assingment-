import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  userId: { type: String, required: true },      // Supabase user ID
  timeOfDay: { type: String, required: true },   // "HH:mm" format
  title: { type: String, required: true },
  description: { type: String, required: true },
  customMessage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Block || mongoose.model("Block", BlockSchema);
