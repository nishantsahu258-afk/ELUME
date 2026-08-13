const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    review:
      "Beautiful formulations and exceptional quality. Every product feels thoughtfully crafted.",
  },
  {
    id: 2,
    name: "James Carter",
    review:
      "The packaging and experience are unmatched. It feels luxurious from start to finish.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    review:
      "My daily routine feels elevated. The scents and textures are incredible.",
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-gray-500">
            Testimonials
          </p>

          <h2 className="text-5xl font-light">
            What our customers say
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-10"
            >
              <div className="mb-6 text-lg">
                ★★★★★
              </div>

              <p className="mb-8 leading-8 text-gray-600">
                "{item.review}"
              </p>

              <h4 className="font-medium">
                — {item.name}
              </h4>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;