import { Link } from 'react-router-dom';
import { CheckCircle, Phone, Package, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Minimal Header */}
      <div className="border-b border-light py-5">
        <div className="container-velaro text-center">
          <Link
            to="/"
            className="font-serif font-medium text-xl tracking-[0.15em] uppercase text-obsidian"
          >
            VELARO
          </Link>
        </div>
      </div>

      <div className="container-velaro py-16 md:py-20">
        <div className="max-w-[640px] mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle size={40} className="text-ivory" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif font-medium text-3xl md:text-[44px] text-obsidian mb-4"
          >
            Thank You for Your Order!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-lg text-warmgray max-w-[480px] mx-auto mb-10"
          >
            Your order has been placed successfully. We&apos;ve sent a confirmation to your email.
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border border-light p-6 md:p-8 text-left mb-10"
          >
            {[
              { label: 'Order Number', value: `#VEL-${Date.now().toString().slice(-6)}` },
              { label: 'Date', value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
              { label: 'Payment Method', value: 'Cash on Delivery' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-3 border-b border-light last:border-0">
                <span className="text-sm text-warmgray">{row.label}</span>
                <span className="font-sans font-medium text-sm text-obsidian">{row.value}</span>
              </div>
            ))}
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="font-sans font-medium text-lg text-obsidian mb-5">
              What Happens Next?
            </h3>
            <div className="space-y-4 text-left max-w-[400px] mx-auto">
              {[
                { icon: Phone, text: "We'll call you to confirm your order" },
                { icon: Package, text: "Your order will be packed and shipped" },
                { icon: Truck, text: "You'll receive your items at your doorstep" },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <Icon size={22} strokeWidth={1.5} className="text-obsidian flex-shrink-0" />
                  <span className="font-sans text-base text-charcoal">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link to="/collection" className="btn-secondary-outline text-sm">
              Continue Shopping
            </Link>
            <Link to="/account" className="btn-primary-dark text-sm">
              View My Orders
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-sm text-warmgray mt-8"
          >
            Questions? Contact us at{' '}
            <a href="mailto:support@velaro.com" className="text-obsidian hover:underline">
              support@velaro.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
