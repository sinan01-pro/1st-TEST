import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const shopLinks = [
  { name: 'Collection', path: '/collection' },
  { name: 'New Arrivals', path: '/collection?sort=newest' },
  { name: 'Best Sellers', path: '/collection?sort=bestsellers' },
  { name: 'Accessories', path: '/collection?category=accessories' },
];

const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Terms & Conditions', path: '/terms-conditions' },
];

const supportLinks = [
  { name: 'Shipping Info', path: '/about' },
  { name: 'Returns & Exchanges', path: '/terms-conditions' },
  { name: 'Size Guide', path: '/about' },
  { name: 'FAQ', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian text-ivory">
      <div className="container-velaro py-16 md:py-24">
        {/* Top section - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif font-medium text-2xl tracking-[0.15em] uppercase text-ivory">
              VELARO
            </Link>
            <p className="mt-4 text-sm text-warmgray leading-relaxed">
              Redefining men's fashion in Bangladesh. Premium quality, honest pricing.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-ivory hover:text-warmgray transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-ivory hover:text-warmgray transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-ivory hover:text-warmgray transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-[0.1em] text-ivory mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-warmgray hover:text-ivory transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-[0.1em] text-ivory mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-warmgray hover:text-ivory transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-[0.1em] text-ivory mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-warmgray hover:text-ivory transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-dark flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-warmgray">
            &copy; 2025 VELARO. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-bkash text-white px-2 py-1 font-medium rounded-sm">bKash</span>
            <span className="text-xs bg-charcoal text-ivory px-2 py-1 font-medium rounded-sm border border-dark">
              Cash on Delivery
            </span>
            <span className="text-xs text-warmgray flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              SSL Secure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
