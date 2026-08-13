import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductsHero from "../../components/product/ProductsHero";
import ProductFilters from "../../components/product/ProductFilters";
import ProductGrid from "../../components/product/ProductGrid";
import { getProducts, getCategories } from "../../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const searchFromUrl = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchFromUrl);
  const [sort, setSort] = useState("");
  
  const [under100, setUnder100] = useState(false);
  const [inStock, setInStock] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get("search");
    if (q !== null) {
      setSearch(q);
    }
  }, [searchParams]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      const categoryData = await getCategories();

      setProducts(data);
      setCategories(categoryData);
    } catch (error) {
      console.log("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = [...(products || [])]
    .filter((product) => {
      const searchMatch =
        (product.title || "")
          .toLowerCase()
          .includes(search?.toLowerCase() || "");

      const categoryMatch =
        selectedCategory === "all"
          ? true
          : product.category ===
            selectedCategory;

      const priceMatch = under100 ? product.price < 100 : true;
      const stockMatch = inStock ? product.stock > 0 : true;

      return (
        searchMatch &&
        categoryMatch &&
        priceMatch &&
        stockMatch
      );
    })
    .sort((a, b) => {
      if (sort === "low")
        return a.price - b.price;

      if (sort === "high")
        return b.price - a.price;

      return 0;
    });

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-4 bg-[#fcfcfc]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#8a755d]"></div>
        <p className="text-xs uppercase tracking-[3px] text-gray-500">Loading Products</p>
      </div>
    );
  }

  return (
    <>
      <ProductsHero search={search} setSearch={setSearch} />

      <section className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-6">
            <h2 className="mb-2 font-serif text-[40px] font-light text-[#222222]">
              Results for "{search || "all products"}"
            </h2>

            <p className="mb-4 text-sm text-gray-500">
              Showing <span className="font-bold text-gray-700">{filteredProducts.length}</span> products across all categories
            </p>
          </div>

          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sort={sort}
            setSort={setSort}
            under100={under100}
            setUnder100={setUnder100}
            inStock={inStock}
            setInStock={setInStock}
          />

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-3xl font-light">
                No Products Found
              </h3>

              <p className="mt-3 text-gray-500">
                Try another search keyword.
              </p>
            </div>
          ) : (
            <>
              <ProductGrid products={filteredProducts} />
            </>
          )}

        </div>
      </section>
    </>
  );
}

export default Products;