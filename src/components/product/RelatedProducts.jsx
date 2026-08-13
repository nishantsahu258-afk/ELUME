import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "./ProductCard";

function RelatedProducts({ currentProductId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [currentProductId]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      const related = data
        .filter(
          (product) =>
            product.id !== Number(currentProductId)
        )
        .slice(0, 4);

      setProducts(related);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-24">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-gray-500">
            You May Also Like
          </p>

          <h2 className="text-4xl font-light">
            Related Products
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default RelatedProducts;