"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";

type Block = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  timeOfDay: string;
  customMessage: string;
  createdAt?: string;
};

export default function BlocksPage() {
  const session = useSession();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return; // wait for session

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/blocks");
        if (!res.ok) throw new Error("Failed to fetch blocks");
        const data: Block[] = await res.json();
        // Show only current user's blocks for clarity/privacy
        const mine = data.filter((b) => b.userId === session.user!.id);
        setBlocks(mine);
      } catch (e: any) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [session?.user]);

  if (session === undefined) return <p className="p-6">Loading...</p>;
  if (!session?.user)
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-yellow-50 rounded-lg shadow-lg text-center">
        <p className="text-yellow-800 font-semibold">Please log in to view your blocks.</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Blocks</h1>

      {loading && <p className="text-gray-600">Loading blocks...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4">
          {blocks.length === 0 ? (
            <p className="text-gray-700">No blocks yet. Create one from the home page.</p>
          ) : (
            blocks.map((b) => (
              <div key={b._id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{b.title}</h2>
                  <span className="text-sm text-indigo-700 font-medium">{b.timeOfDay}</span>
                </div>
                <p className="text-gray-700 mt-1">{b.description}</p>
                <p className="text-gray-500 mt-2 text-sm">{b.customMessage}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

