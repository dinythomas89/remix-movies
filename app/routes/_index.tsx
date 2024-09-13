import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import connectDB from "../.server/mongodb";
import Card from "~/components/Card";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Movies" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const db = await connectDB();
  const data = await db.collection("movies").find({}).toArray();
  return json(data);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [selectedGenre, setSelectedGenre] = useState<string>();
  console.log(data)

  const filteredMovies = selectedGenre && selectedGenre != "All" ? data.filter(movie => movie.genres.includes(selectedGenre)) : data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Movies</h1>
      <div className="py-8">
        <label>Genres: </label>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="select border-primary-blue w-full max-w-xs">
          <option value="All">All</option>
          <option value="Short">Short</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
          <option value="Crime">Crime</option>
          <option value="Romance">Romance</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>
      <ul className="flex flex-wrap justify-center gap-6 p-4 border border-gray-200">
        {filteredMovies.map((item) => (
          <li key={item._id} className="w-[30%]">
            <Card item={item}></Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

