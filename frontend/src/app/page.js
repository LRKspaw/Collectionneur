"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CollectionItem from "@/components/CollectionItem";
export default function Home() {
  const [recentItems, setRecentItems] = useState([]);

  const refreshRecent = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`);
      const data = await response.json();
      setRecentItems(data.slice(0, 5));
    } catch (error) {
      console.error("Erreur refresh :", error);
    }
  };

  useEffect(() => {
    refreshRecent();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <SearchBar onAddSuccess={refreshRecent} />
      
      <div className="px-4 mt-8">
        <h2 className="mb-4 text-xl font-bold">Derniers ajouts</h2>
        <div className="flex overflow-x-auto gap-4 no-scrollbar">
          {recentItems.map((item) => (
          <div key={item._id} className="flex-none w-[140px]">
            <CollectionItem item={item} mode="grid" />
        </div>          ))}
        </div>
      </div>
    </main>
  );
}