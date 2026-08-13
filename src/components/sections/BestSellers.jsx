import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data.slice(0, 4));
    } catch (error) {
      setProducts([{ id: 'error', title: error.message, price: 0 }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#8a755d]"></div>
          <p className="text-xs uppercase tracking-[3px] text-gray-500">Loading</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-gray-500">
            Best Sellers
          </p>

          <h2 className="text-5xl font-light">
            Most Loved Products
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="group"
            >
              <div className="overflow-hidden bg-[#f7f3ed]">

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="pt-5">

                <h3 className="mb-2 text-lg">
                  {product.title}
                </h3>

                <p className="mb-4 text-black-900 font-bold">
                  ${product.price}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="border-b border-black pb-1 text-sm uppercase tracking-[2px]"
                >
                  View Product
                </Link>

              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default BestSellers;