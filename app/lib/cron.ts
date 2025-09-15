import cron from "node-cron";
import { dbConnect } from "./mongodb";
import Block from "../models/block";
import { sendEmail } from "./mailer";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ---------------- Supabase Admin Client ----------------
const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ must be server-only
);

// ---------------- Cron Job ----------------
// Run every minute
cron.schedule("* * * * *", async () => {
  try {
    await dbConnect(); // ensure MongoDB is connected

    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);

    // Format HH:mm
    const hhmm = tenMinutesLater.toTimeString().slice(0, 5);

    // Fetch blocks scheduled 10 minutes ahead
    const blocks = await Block.find({ timeOfDay: hhmm });

    console.log(`Found ${blocks.length} blocks scheduled at ${hhmm}`);

    for (const block of blocks) {
      // Fetch user info from Supabase Admin API
      const { data: userData, error } = await supabase.auth.admin.getUserById(block.userId);

      if (error) {
        console.error(`Failed to fetch user ${block.userId}:`, error.message);
        continue;
      }

      const email = userData?.user?.email;
      if (!email) {
        console.error(`No email found for user ${block.userId}`);
        continue;
      }

      // Send reminder email
      await sendEmail(
        email,
        `Reminder: ${block.title}`,
        `Hi! Your block "${block.title}" starts at ${block.timeOfDay}. Message: ${block.customMessage}`
      );

      console.log(`Reminder sent to ${email} for block "${block.title}"`);
    }
  } catch (err) {
    console.error("Cron job error:", err);
  }
});
