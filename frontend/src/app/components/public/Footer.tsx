import { Instagram, Facebook } from 'lucide-react';
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">  
      <div className="max-w-7xl mx-auto">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 px-16">
          {/* Left - Brand Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/favicon.ico" 
                  alt="Cafe Prince Logo"
                  width={50}  
                  height={50}
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="text-xl tracking-wider leading-tight">
                <div>CAFE</div>
                <div>PRINCE</div>
              </div>
            </div>
          </div>

          {/* Middle - Address and Email */}
          <div className="text-center text-sm md:text-base space-y-3">
          </div>

          {/* Right - Social Media Icons */}
          <div className="flex items-center justify-center md:justify-end gap-6">
            <a 
              href="https://www.instagram.com/cafeprinceph.official/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={32} />
            </a>
            <a 
              href="https://www.facebook.com/cafeprince.ph/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={32} />
            </a>
          </div>
        </div>

        {/* Bottom - All Rights Reserved */}
        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © 2026 Cafe Prince. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}