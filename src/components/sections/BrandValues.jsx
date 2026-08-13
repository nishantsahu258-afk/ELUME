import { Rabbit, Leaf, Recycle, Globe } from "lucide-react";

export default function BrandValues() {
  const values = [
    {
      icon: <Rabbit size={32} strokeWidth={1} />,
      title: "Cruelty-Free",
      description: "We never test on animals. All our products are entirely cruelty-free."
    },
    {
      icon: <Leaf size={32} strokeWidth={1} />,
      title: "100% Vegan",
      description: "Formulated entirely without animal-derived ingredients or by-products."
    },
    {
      icon: <Recycle size={32} strokeWidth={1} />,
      title: "Sustainable Packaging",
      description: "Our signature amber bottles are made from recycled materials."
    },
    {
      icon: <Globe size={32} strokeWidth={1} />,
      title: "Ethical Sourcing",
      description: "We source botanical ingredients with respect for local communities."
    }
  ];

  return (
    <section className="bg-[#fdfbf7] py-24 border-t border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-light text-[#222222] tracking-wide">Our Commitments</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            We are dedicated to formulations of the highest quality, created with meticulous attention to detail and profound respect for our environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0eee4] text-[#8a755d]">
                {value.icon}
              </div>
              <h3 className="mb-3 font-serif text-lg text-[#222222]">{value.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}