import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const wished = isInWishlist(product.id);
  return (
    <Link to={`/product/${product.id}`}>

      <div className="group block">

        <div className="relative overflow-hidden bg-[#f7f3ed]">

          <button
            onClick={(e) => {
              e.preventDefault();
              wished
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow"
          >
            <Heart
              size={18}
              fill={wished ? "currentColor" : "none"}
            />
          </button>

          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
          />

        </div>

        <div className="pt-5">

          <p className="mb-2 text-xs uppercase tracking-[3px] text-gray-500">
            {product.category}
          </p>

          <h3 className="mb-3 text-lg font-normal truncate">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">

            <p className="text-lg">
              ${product.price}
            </p>

            <p className="text-sm text-gray-500">
              ★ {product.rating}
            </p>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default ProductCard;