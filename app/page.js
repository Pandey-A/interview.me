import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Pricing from "./sections/Pricing";
import ProductShowcase from "./sections/ProductShowcase";



export default function Home() {
  return (
   
      <>
      <Navbar/>
      <Hero/>
      <ProductShowcase/>
      <Pricing />
      <Footer />
     
      </>
      

  );
}
