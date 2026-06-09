import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/stores/useCart';
import { useUI } from '@/stores/useUI';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Collection', path: '/collection' },
  { name: 'New Arrivals', path: '/collection?sort=newest' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const cartItemCount = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const { isMobileMenuOpen, toggleMobileMenu, toggleCart, toggleSearch } = useUI();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navBg = scrolled || !isHome
    ? 'bg-ivory shadow-sm'
    : 'bg-transparent';

  const textColor = scrolled || !isHome ? 'text-obsidian' : 'text-ivory';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-400 ${navBg}`}
      >
        <div className="container-velaro h-full flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden ${textColor} transition-colors duration-300`}
            aria-label="Menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className={`font-serif font-medium text-xl md:text-2xl tracking-[0.15em] uppercase ${textColor} transition-colors duration-300`}
          >
            VELARO
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-[15px] tracking-wide transition-colors duration-300 hover:text-warmgray ${textColor}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className={`flex items-center gap-4 md:gap-5 ${textColor} transition-colors duration-300`}>
            <button onClick={toggleSearch} aria-label="Search" className="hover:text-warmgray transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/account" className="hidden md:block hover:text-warmgray transition-colors" aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <button
              onClick={toggleCart}
              className="relative hover:text-warmgray transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ivory"
          >
            <div className="container-velaro pt-6 flex justify-between items-center">
              <span className="font-serif font-medium text-xl tracking-[0.15em] uppercase text-obsidian">
                VELARO
              </span>
              <button onClick={toggleMobileMenu} aria-label="Close menu">
                <X size={24} strokeWidth={1.5} className="text-obsidian" />
              </button>
            </div>
            <div className="container-velaro pt-16 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className="font-serif text-3xl text-obsidian hover:text-warmgray transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="pt-6 border-t border-light"
              >
                <Link
                  to="/account"
                  onClick={toggleMobileMenu}
                  className="font-serif text-3xl text-obsidian hover:text-warmgray transition-colors"
                >
                  My Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
