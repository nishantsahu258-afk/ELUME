import { Link } from "react-router-dom";

function EditorialSection() {
  return (
    <section className="bg-[#f7f3ed] py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        <div>
          <p className="mb-4 text-xs uppercase tracking-[4px] text-gray-500">
            Our Philosophy
          </p>

          <h2 className="mb-8 text-5xl font-light leading-tight">
            Rituals that enrich
            <br />
            everyday moments
          </h2>

          <p className="mb-8 max-w-lg text-lg leading-8 text-gray-600">
            We believe self-care should feel intentional.
            Every formulation is crafted to elevate
            ordinary routines into meaningful rituals.
          </p>

          <Link to="/products" className="inline-block border bg-[#8B7355] text-white px-8 py-4 text-sm uppercase tracking-[2px] transition hover:bg-black hover:text-white">
            Discover More
          </Link>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop"
            alt="Editorial"
            className="h-[650px] w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default EditorialSection;