"use client";

import { memo, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const CreateNew = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (session === undefined) return <p>Loading...</p>;
  if (!session?.user)
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-yellow-50 rounded-lg shadow-lg text-center">
        <p className="text-yellow-800 font-semibold">
          User not logged in. Please log in to create a block.
        </p>
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          timeOfDay,
          customMessage,
          userId: session.user.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to create block");

      const data = await res.json();
      setSuccess("Block created successfully!");
      setTitle("");
      setDescription("");
      setTimeOfDay("");
      setCustomMessage("");
      console.log("Created Block:", data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Create New Block
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border rounded-md border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border rounded-md border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none h-20"
        />
        <input
          type="time"
          value={timeOfDay}
          required
          onChange={(e) => setTimeOfDay(e.target.value)}
          className="p-3 border rounded-md border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          placeholder="Custom Message"
          value={customMessage}
          required
          onChange={(e) => setCustomMessage(e.target.value)}
          className="p-3 border rounded-md border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={loading}
          className={`p-3 rounded-md text-white font-semibold transition-colors ${
            loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Creating..." : "Create Block"}
        </button>
      </form>

      {success && <p className="text-green-700 mt-4">{success}</p>}
      {error && <p className="text-red-700 mt-4">{error}</p>}
    </div>
  );
};

export default memo(CreateNew);
