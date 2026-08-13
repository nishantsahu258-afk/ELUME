import {
  Sparkles,
  Heart,
  Gift,
  Scissors,
  ShoppingBag,
  Droplets,
} from "lucide-react";

const categories = [
  {
    name: "Skincare",
    icon: Sparkles,
  },
  {
    name: "Body & Body",
    icon: Heart,
  },
  {
    name: "Fragrance",
    icon: Droplets,
  },
  {
    name: "Gift Sets",
    icon: Gift,
  },
  {
    name: "Accessories",
    icon: ShoppingBag,
  },
  {
    name: "Hair & Scalp",
    icon: Scissors,
  },
];

function CategoryStrip() {
  return (
    <section className="border-y border-gray-300 bg-[#f7f3ed]">
      <div className="mx-auto grid max-w-4xl grid-cols-3 md:grid-cols-6">
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="flex cursor-pointer flex-col items-center gap-1 border border-gray-300 p-4 transition hover:bg-white"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300">
                <Icon size={24} />
              </div>

              <span className="text-sm">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryStrip;