function FeatureSection() {
  return (
    <section className="bg-[#f7f3ed] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        
        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury skincare"
            className="h-[650px] w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[4px] text-gray-500">
            Featured Collection
          </p>

          <h2 className="mb-8 text-5xl font-light leading-tight text-neutral-900 ">
            Skincare formulated
            <br />
            for everyday rituals
          </h2>

          <p className="mb-10 text-lg leading-8 text-gray-600">
            Thoughtfully crafted formulations that combine
            botanical ingredients with modern science.
            Designed to elevate daily routines into moments
            of calm and care.
          </p>

          <button className="border px-8 bg-[#8B7355] text-white py-4 text-sm uppercase tracking-[2px] transition hover:bg-black hover:text-white">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;