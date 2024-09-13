import { json, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
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

export default function MovieDetails() {
  const movie = useLoaderData<typeof loader>();

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">{movie.title}</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        <img
          src={movie.poster}
          alt={`Poster of ${movie.title}`}
          className="w-80 h-80 mb-4 rounded"
        />
        <h2 className="text-2xl font-semibold mb-2">Genres</h2>
        <p className="mb-4">{movie.genres.join(", ")}</p>

        <h2 className="text-2xl font-semibold mb-2">Plot</h2>
        <p className="mb-4">{movie.fullplot}</p>

        <h2 className="text-2xl font-semibold mb-2">Cast</h2>
        <p className="mb-4">{movie.cast.join(", ")}</p>

        <h2 className="text-2xl font-semibold mb-2">Runtime</h2>
        <p className="mb-4">{movie.runtime} minutes</p>

        <h2 className="text-2xl font-semibold mb-2">Rated</h2>
        <p className="mb-4">{movie.rated}</p>

        <div className="mt-4 flex gap-4">          
          <Form action={`/movies/${movie._id}/edit`}>
            <button className="btn bg-primary-green text-white" type="submit">Edit</button>
          </Form>
          {/*<Link to={`/movies/${movie._id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Edit
          </Link>*/}
          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button className="btn bg-red-500 text-white" type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}