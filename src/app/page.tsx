import Hero from "@/components/home/hero";
import Features from "@/components/home/solution";
import FeaturesBlocks from "@/components/home/services";
import AboutUs from "@/components/home/aboutus";
import ContactUs from "@/components/home/contact";
import Header from "@/components/home/header";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <FeaturesBlocks />
      <AboutUs/>
      <ContactUs />
      <Footer/>
    </>
  );
}