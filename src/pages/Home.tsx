import HeroSection from '@/sections/HeroSection';
import FeaturedCollection from '@/sections/FeaturedCollection';
import BrandStatement from '@/sections/BrandStatement';
import NewArrivalsProducts from '@/sections/NewArrivalsProducts';
import BestSellers from '@/sections/BestSellers';
import NewArrivalsBanner from '@/sections/NewArrivalsBanner';
import Testimonials from '@/sections/Testimonials';
import BrandStory from '@/sections/BrandStory';
import Newsletter from '@/sections/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCollection />
      <BrandStatement />
      <NewArrivalsProducts />
      <BestSellers />
      <NewArrivalsBanner />
      <Testimonials />
      <BrandStory />
      <Newsletter />
    </>
  );
}
