import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </div>
  );
}

export default ProductGrid;