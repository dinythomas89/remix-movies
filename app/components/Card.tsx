import { Link } from "@remix-run/react";

interface MovieItem {
  _id: string;
  title: string;
  plot: string;
  poster: string;
}

interface CardProps {
  item: MovieItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  console.log(item)
  return (    
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={item.poster}
          alt="Shoes"
          className="rounded-xl w-32 max-h-32" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.plot}</p>
        <Link to={`/movies/${item._id}`} className="card-actions btn bg-primary-green text-white p-4">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
