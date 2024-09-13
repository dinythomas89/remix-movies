import { ActionFunction, redirect } from "@remix-run/node";
import { ObjectId } from "mongodb";
import connectDB from "~/.server/mongodb";

export const action: ActionFunction = async ({ params }) => {
  if (!params.movieId) {
    throw new Response("Movie ID is required", { status: 400 });
  }

  const db = await connectDB();
  const movieId = new ObjectId(params.movieId);

  const result = await db.collection("movies").deleteOne({ _id: movieId });

  if (result.deletedCount === 0) {
    throw new Response("Not found", { status: 404 });
  }

  return redirect("/");
};
