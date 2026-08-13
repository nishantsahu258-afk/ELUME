import ProductCard from "../../components/product/ProductCard";
import { Link } from "react-router-dom";

import {
  useWishlist,
} from "../../context/WishlistContext";

function Wishlist() {
  const { wishlist } =
    useWishlist();

  return (
    <section className="min-h-screen bg-[#f5f5f0] pt-12 pb-24 font-sans text-[#333]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">

        <div className="mb-12 flex items-baseline gap-4">
          <h1 className="font-serif text-[42px] font-light text-[#1a1a1a]">
            Wishlist
          </h1>
          <span className="text-sm font-medium text-gray-500">{wishlist.length} items</span>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-[#f0eee4] p-16 text-center shadow-sm">
            <p className="font-serif text-[32px] font-light text-[#1a1a1a] mb-8">
              No products in wishlist.
            </p>
            <Link
              to="/products"
              className="inline-flex bg-[#8a755d] px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-[#725e47]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {wishlist.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        )}

      </div>
    </section>
  );
}

export default Wishlist;