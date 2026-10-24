function ProductsHero({
  search,
  setSearch,
}) {
  const suggestions = [
    "mascara",
    "eyeshadow",
    "powder",
    "lipstick",
    "nail polish",
  ];

  return (
    <section className="bg-[#f5f2eb] py-6 border-b border-gray-200">
      <div className="mx-auto max-w-2xl px-6">

        <div className="flex items-stretch overflow-hidden rounded-full border border-gray-300 bg-white">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            className="flex-1 px-6 py-3 text-base outline-none"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="px-4 text-gray-400 hover:text-black flex items-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}

          <button className="bg-[#9f815d] px-8 text-white transition hover:bg-[#8a6e4d] font-medium text-sm">
            Search
          </button>

        </div>

      </div>
    </section>
  );
}

export default ProductsHero;