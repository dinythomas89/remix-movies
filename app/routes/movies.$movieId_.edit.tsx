import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { ObjectId } from "mongodb";
import connectDB from "~/.server/mongodb";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.movieId) {
    throw new Response("Movie ID is required", { status: 400 });
  }

  const db = await connectDB();
  const movieId = new ObjectId(params.movieId);
  const movie = await db.collection("movies").findOne({ _id: movieId });

  if (!movie) {
    throw new Response("Not found", { status: 404 });
  }

  return json(movie);
};

export const action: ActionFunction = async ({ params, request }) => {
  if (!params.movieId) {
    throw new Response("Movie ID is required", { status: 400 });
  }

  const db = await connectDB();
  const movieId = new ObjectId(params.movieId);

  const formData = new URLSearchParams(await request.text());
  const updatedMovie = {
    title: formData.get("title") || "",
    genres: formData.get("genres")?.split(",") || [],
    fullplot: formData.get("fullplot") || "",
    cast: formData.get("cast")?.split(",") || [],
    runtime: Number(formData.get("runtime")) || 0,
    rated: formData.get("rated") || "",
    year: Number(formData.get("year")) || 0 
  };

  await db.collection("movies").updateOne({ _id: movieId }, { $set: updatedMovie });

  //return new Response(null, { status: 204 });
  return redirect(`/movies/${params.movieId}`);
};

export default function EditMovie() {
  const movie = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Edit Movie</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        <Form key={movie.id} method="post" className="space-y-4">
          <label>
            Title
            <input
              type="text"
              name="title"
              defaultValue={movie.title}
              className="block input input-bordered w-full"
              disabled
            />
          </label>

          <label>
            Genres
            <input
              type="text"
              name="genres"
              defaultValue={movie.genres.join(", ")}
              className="block input input-bordered w-full"
            />
          </label>

          <label>
            Plot
            <textarea
              name="fullplot"
              defaultValue={movie.fullplot}
              className="block textarea textarea-bordered w-full"
            />
          </label>

          <label>
            Cast
            <input
              type="text"
              name="cast"
              defaultValue={movie.cast.join(", ")}
              className="block input input-bordered w-full"
            />
          </label>

          <label>
            Runtime (in minutes)
            <input
              type="number"
              name="runtime"
              defaultValue={movie.runtime}
              className="block input input-bordered w-full"
            />
          </label>

          <label>
            Rated
            <input
              type="text"
              name="rated"
              defaultValue={movie.rated}
              className="block input input-bordered w-full"
            />
          </label>

          <label>
            Year
            <input
              type="number"
              name="year"
              defaultValue={movie.year}
              className="block input input-bordered w-full"
            />
          </label>

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="btn bg-primary-green text-white"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
