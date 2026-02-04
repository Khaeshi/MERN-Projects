import type { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Cafe Prince | Home",
  description: "A cafe ordering website.",
};

const heroImage = 'https://images.unsplash.com/photo-1616547092703-79f311f472ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYmFyaXN0YXxlbnwxfHx8fDE3Njg3ODM3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const productImages = [
  'https://images.unsplash.com/photo-1601369040089-0024001cce2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjB0YWJsZXxlbnwxfHx8fDE3Njg2ODE3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1669162364316-a74b2d661d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNvZmZlZXxlbnwxfHx8fDE3Njg3NjczNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1582572426223-d152057ba012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMG1hY2hpbmV8ZW58MXx8fHwxNzY4NzgzNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1577599905863-a8c4f7f2b60b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGNhZmV8ZW58MXx8fHwxNzY4NzgzNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2ODc3OTE0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1616547092703-79f311f472ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYmFyaXN0YXxlbnwxfHx8fDE3Njg3ODM3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-[500px] md:h-[600px] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image 
            src={heroImage} 
            alt="Coffee shop barista" 
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60"></div> 
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide">
            DISCOVER THE<br />PERFECT BLEND
          </h1>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg transition-colors shadow-lg">
            Order Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section id="menu" className="py-12 md:py-16 px-4 md:px-6 bg-stone-900">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 md:mb-12 tracking-wide text-white">
          FEATURED PRODUCTS
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {productImages.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md bg-stone-800">
              <Image 
                src={image} 
                alt={`Featured product ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-16 px-4 md:px-6 bg-stone-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide text-white">
            ABOUT CAFE PRINCE
          </h2>
          <p className="text-base md:text-lg text-stone-300 leading-relaxed mb-6">
            At Cafe Prince, we believe in serving only the finest coffee, crafted with passion and expertise. 
            Our baristas are dedicated to creating the perfect cup every time, using premium beans sourced 
            from the best coffee regions around the world.
          </p>
          <p className="text-base md:text-lg text-stone-300 leading-relaxed">
            Whether you&#39;re looking for a quick espresso or a relaxing place to enjoy a latte, 
            Cafe Prince offers a welcoming atmosphere where coffee lovers can gather and savor 
            exceptional brews.
          </p> {/* &#39; numeric character reference */}
        </div>
      </section>

      {/* Contact Section */}
<section id="contact" className="py-12 md:py-16 px-4 md:px-6 bg-stone-900">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-wide text-white text-center">
      VISIT US
    </h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Contact Information */}
      <div className="space-y-6 text-base md:text-lg text-stone-300">
        <div className="bg-stone-800 border border-stone-700 rounded-lg p-6">
          <p className="mb-4">
            <span className="font-semibold text-amber-400 text-xl">Address:</span><br />
            <span className="text-stone-200">
              Block 21 Lot 4 Italy St. EP Housing<br />
              Brgy Pinagsama Phase 2, Taguig, Philippines
            </span>
          </p>
          
          <p className="mb-4">
            <span className="font-semibold text-amber-400 text-xl">Phone:</span><br />
            <a href="tel:09158956883" className="text-stone-200 hover:text-amber-400 transition-colors">
              0915-895-6883
            </a>
          </p>
          
          <p className="mb-4">
            <span className="font-semibold text-amber-400 text-xl">Email:</span><br />
            <a href="mailto:cafeprince@gmail.com" className="text-stone-200 hover:text-amber-400 transition-colors">
              cafeprince@gmail.com
            </a>
          </p>
          
          <div className="pt-4 border-t border-stone-700">
            <p className="text-amber-400 font-semibold mb-2">Operating Hours:</p>
            <p className="text-stone-200">Open Daily: 7:00 AM - 10:00 PM</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
          <p className="text-sm text-amber-200">
            ☕ We&#39re located in the heart of Taguig City, easily accessible from major roads. 
            Free parking available for customers!
          </p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="w-full">
        <div className="relative w-full h-[450px] rounded-lg overflow-hidden border-2 border-stone-700 shadow-xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15449.805030619491!2d121.03342590781251!3d14.5161615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf6974c7f3d7%3A0x91fe5af60079d879!2sBLK%202%20LOT%204%20PHASE%201%20EP%20AFP%20Housing%20BRGY%20PINAGSAMA%20TAGUIG%20CITY!5e0!3m2!1sen!2sph!4v1770129263323!5m2!1sen!2sph" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Cafe Prince Location"
          />
        </div>
        
        {/* Directions Link */}
        <div className="mt-4 text-center">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=14.5161615,121.03342590781251"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}