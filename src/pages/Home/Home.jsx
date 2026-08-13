
import Hero from "../../components/sections/Hero.jsx"
import Marquee from "../../components/sections/Marquee.jsx"
import CategoryStrip from "../../components/sections/CategoryStrip.jsx"
import FeatureSection from "../../components/sections/FeatureSection.jsx"
import BestSellers from "../../components/sections/BestSellers.jsx"
import EditorialSection from "../../components/sections/EditorialSection.jsx"
import TestimonialsSection from "../../components/sections/Testimonials.jsx"
import NewsletterSection from "../../components/sections/Newsletter.jsx"
import BrandValues from "../../components/sections/BrandValues.jsx"

function Home() {
    return (
        <>
        <Hero />
        <Marquee />
        <CategoryStrip />
        <FeatureSection />
        <BestSellers />
        <EditorialSection />
        <BrandValues />
        <TestimonialsSection />
        <NewsletterSection />
        </>
    );
}
export default Home;
