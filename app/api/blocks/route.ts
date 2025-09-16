// app/api/blocks/route.ts
import { dbConnect } from "../../lib/mongodb";
import Block from "../../models/block";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all blocks from MongoDB
    const blocks = await Block.find({}).lean();

    return new Response(JSON.stringify(blocks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "MongoDB connection failed ❌" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const newBlock = await Block.create(body);

    return new Response(JSON.stringify(newBlock), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to create block ❌" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
