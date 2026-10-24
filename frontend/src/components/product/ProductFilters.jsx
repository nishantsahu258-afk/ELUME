function ProductFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
  under100,
  setUnder100,
  inStock,
  setInStock,
}) {
  return (
    <div className="mb-8 border-y border-gray-300 py-4">

      <div className="flex flex-wrap items-center justify-between gap-6">

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() =>
              setSelectedCategory(
                "all"
              )
            }
            className={`rounded-full px-5 py-1.5 text-sm transition ${
              selectedCategory ===
              "all"
                ? "bg-[#222] text-white border border-[#222]"
                : "border border-gray-300 bg-white text-gray-700 hover:border-black"
            }`}
          >
            All
          </button>

          {categories.map(
            (category) => (
              <button
                key={typeof category === "object" ? category.slug : category}
                onClick={() =>
                  setSelectedCategory(
                    typeof category === "object" ? category.slug : category
                  )
                }
                className={`rounded-full px-5 py-1.5 text-sm capitalize transition ${
                  selectedCategory === (typeof category === "object" ? category.slug : category)
                    ? "bg-[#222] text-white border border-[#222]"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-black"
                }`}
              >
                {typeof category === "object" ? category.name : category}
              </button>
            )
          )}

          <button 
            onClick={() => setUnder100(!under100)}
            className={`rounded-full px-5 py-1.5 text-sm transition ${
              under100
                ? "bg-[#222] text-white border border-[#222]"
                : "border border-gray-300 bg-white text-gray-700 hover:border-black"
            }`}
          >
            Under $100
          </button>

          <button 
            onClick={() => setInStock(!inStock)}
            className={`rounded-full px-5 py-1.5 text-sm transition ${
              inStock
                ? "bg-[#222] text-white border border-[#222]"
                : "border border-gray-300 bg-white text-gray-700 hover:border-black"
            }`}
          >
            In Stock
          </button>

        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort:</span>
          <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 outline-none hover:border-black"
        >
          <option value="">
            Relevance
          </option>

          <option value="low">
            Price Low to High
          </option>

          <option value="high">
            Price High to Low
          </option>
        </select>
        </div>

      </div>

    </div>
  );
}

export default ProductFilters;