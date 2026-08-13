

function Marquee() {
  const items = [
    "Sustainable Ingredients",
    "Cruelty Free",
    "Free Shipping",
    "Premium Formulations"
  ];

  return (
    <div className="overflow-hidden bg-[#333333] py-4 text-white/60 flex">
      {/* We use two identical blocks that animate left continuously */}
      <div className="animate-marquee whitespace-nowrap font-sans flex min-w-full shrink-0 items-center justify-around">
        {items.map((item, idx) => (
          <span key={idx} className="mx-8 flex items-center gap-16 uppercase tracking-[3px]">
            <span>{item}</span>
            <span className="text-xl">·</span>
          </span>
        ))}
      </div>
      <div className="animate-marquee whitespace-nowrap font-sans flex min-w-full shrink-0 items-center justify-around" aria-hidden="true">
        {items.map((item, idx) => (
          <span key={idx} className="mx-8 flex items-center gap-16 uppercase tracking-[3px]">
            <span>{item}</span>
            <span className="text-xl">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;