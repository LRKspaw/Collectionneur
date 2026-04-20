"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CollectionItem from "@/components/CollectionItem";
const MOCK_ITEMS = [
  {
    _id: "mock-1",
    title: "Inception",
    type: "movie",
    cover_url: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    metadata: { release_date: "2010-07-16", runtime: 148 }
  },
  {
    _id: "mock-2",
    title: "The Dark Knight",
    type: "movie",
    cover_url: "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
    metadata: { release_date: "2008-07-18", runtime: 152 }
  },
  {
    _id: "mock-3",
    title: "Interstellar",
    type: "movie",
    cover_url: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    metadata: { release_date: "2014-11-07", runtime: 169 }
  },
  {
    _id: "mock-4",
    title: "The Matrix",
    type: "movie",
    cover_url: "https://image.tmdb.org/t/p/w500/f89U3Y9L9YUr3mcwbB9pU7uS3Z6.jpg",
    metadata: { release_date: "1999-03-31", runtime: 136 }
  }
];

export default function Home() {
  const [recentItems, setRecentItems] = useState([]);

  const refreshRecent = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`);
      const data = await response.json();
      setRecentItems(data.slice(0, 5));
    } catch (error) {
      console.error("Erreur refresh :", error);
      setRecentItems(MOCK_ITEMS);
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