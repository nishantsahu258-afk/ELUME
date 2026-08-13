import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero(){
return(
  <section className="relative h-[100dvh] min-h-[500px] md:min-h-[700px]">
    
    <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 h-full w-full object-cover -z-10"
  >
    <source src="/baby.mp4" type="video/mp4" />
  </video>

    <div className="absolute inset-0 h-full w-full object-cover  ">

      <div className="relative z-10 flex h-full items-center">
  
      <div className="max-w-2xl px-6 md:px-10">

        <p className="mb-4 text-xs uppercase tracking-[4px] text-white/70">
          New Collection
        </p>

        <h1 className="mb-6 text-4xl md:text-6xl font-light leading-tight text-white lg:text-7xl">
          The art of considered living
        </h1>

        <p className="text-white/80 mb-8 max-w-md">
          Formulations born from nature's laboratory — crafted to honour daily rituals and elevate the senses.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/products" className="border px-6 md:px-8 py-3 md:py-4 text-sm font-medium uppercase tracking-[2px] text-white transition hover:bg-white hover:text-black flex items-center gap-2 justify-center sm:justify-between w-full sm:w-fit">Shop Now <ArrowRight className="pt-1 " size={24} /> </Link>
          <Link to="/products" className="border px-6 md:px-8 py-3 md:py-4 text-sm font-medium uppercase tracking-[2px] text-white transition hover:bg-white hover:text-black w-full sm:w-fit text-center">Explore Collections</Link>
        </div>

      </div>
      </div>

    </div>


  </section>
); 
}
export default Hero;