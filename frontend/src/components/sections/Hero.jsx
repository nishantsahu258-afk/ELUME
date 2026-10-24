import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero(){
return(
  <section className="relative h-[100dvh] min-h-[500px] md:min-h-[700px] w-full overflow-hidden">
    
    {/* Background Video */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 h-full w-full object-cover object-[75%_center] xl:object-center -z-20"
    >
      <source src="/baby.mp4" type="video/mp4" />
    </video>

    {/* Elegant Overlay: Darker on the left where text is, transparent on the right */}
    <div className="absolute inset-0 bg-black/20 sm:bg-black/10 md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent -z-10"></div>

    {/* Content Container */}
    <div className="relative z-10 flex h-full items-center w-full">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-xl md:max-w-2xl">
          <p className="mb-4 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] text-white/80 font-medium">
            New Collection
          </p>

          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] sm:leading-tight text-white drop-shadow-sm">
            The art of <br className="hidden sm:block" /> considered living
          </h1>

          <p className="mb-8 text-sm sm:text-base text-white/90 max-w-[280px] sm:max-w-md leading-relaxed drop-shadow-sm">
            Formulations born from nature's laboratory — crafted to honour daily rituals and elevate the senses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/products" 
              className="group flex items-center justify-center gap-3 border border-white bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-white hover:text-black w-full sm:w-fit"
            >
              Shop Now 
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} /> 
            </Link>
            <Link 
              to="/products" 
              className="flex items-center justify-center border border-white/60 bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-[2px] text-white transition-all duration-300 hover:border-white hover:bg-white/10 w-full sm:w-fit text-center"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
); 
}
export default Hero;