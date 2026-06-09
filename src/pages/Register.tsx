import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/stores/useAuth';
import { useToast } from '@/stores/useToast';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { add: addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    if (!agreed) {
      addToast('Please agree to the terms', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = register(name, email, phone, password);
      if (success) {
        addToast(`Welcome to VELARO, ${name}!`, 'success');
        navigate('/');
      } else {
        addToast('Email already registered', 'error');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] grid grid-cols-1 md:grid-cols-2">
      {/* Image */}
      <div className="hidden md:block relative overflow-hidden bg-charcoal">
        <img
          src="/images/register-img.jpg"
          alt=""
          className="w-full h-full object-cover opacity-70 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
        <div className="absolute bottom-16 left-16">
          <p className="font-serif font-medium text-2xl tracking-[0.15em] uppercase text-ivory">
            VELARO
          </p>
          <p className="font-serif text-xl text-ivory/80 mt-2">Join the Community</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 md:p-10 bg-ivory overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px] py-8"
        >
          <Link to="/" className="block text-center mb-8 md:hidden">
            <span className="font-serif font-medium text-2xl tracking-[0.15em] uppercase text-obsidian">
              VELARO
            </span>
          </Link>

          <h2 className="font-serif font-medium text-3xl text-obsidian text-center mb-2">
            Create Account
          </h2>
          <p className="font-sans text-base text-warmgray text-center mb-10">
            Join VELARO for a personalized shopping experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
              />
            </div>

            <div>
              <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
              />
            </div>

            <div>
              <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                required
                pattern="01[0-9]{9}"
                className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
              />
              <p className="text-xs text-warmgray mt-1">Bangladeshi format</p>
            </div>

            <div>
              <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min. 6 characters)"
                  required
                  minLength={6}
                  className="w-full px-4 py-3.5 pr-12 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray hover:text-obsidian"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-obsidian"
                required
              />
              <span>
                I agree to the{' '}
                <Link to="/terms-conditions" className="text-obsidian underline underline-offset-2">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-obsidian underline underline-offset-2">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-obsidian text-ivory py-4 font-sans font-medium text-base uppercase tracking-widest hover:bg-charcoal transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin-loader mx-auto" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-light" />
            <span className="text-sm text-warmgray">or</span>
            <div className="flex-1 h-px bg-light" />
          </div>

          <p className="text-center font-sans text-base text-charcoal">
            Already have an account?{' '}
            <Link to="/login" className="text-obsidian font-medium hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>

          <Link
            to="/"
            className="block text-center text-sm text-warmgray mt-10 hover:text-obsidian transition-colors"
          >
            &larr; Back to VELARO
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
