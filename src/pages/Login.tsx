import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/stores/useAuth';
import { useToast } from '@/stores/useToast';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { add: addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        addToast('Welcome back!', 'success');
        navigate('/');
      } else {
        addToast('Invalid email or password', 'error');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] grid grid-cols-1 md:grid-cols-2">
      {/* Image */}
      <div className="hidden md:block relative overflow-hidden bg-charcoal">
        <img
          src="/images/login-img.jpg"
          alt=""
          className="w-full h-full object-cover opacity-70 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
        <div className="absolute bottom-16 left-16">
          <p className="font-serif font-medium text-2xl tracking-[0.15em] uppercase text-ivory">
            VELARO
          </p>
          <p className="font-serif text-xl text-ivory/80 mt-2">Welcome Back</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 md:p-10 bg-ivory">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          <Link to="/" className="block text-center mb-8 md:hidden">
            <span className="font-serif font-medium text-2xl tracking-[0.15em] uppercase text-obsidian">
              VELARO
            </span>
          </Link>

          <h2 className="font-serif font-medium text-3xl text-obsidian text-center mb-2">
            Welcome Back
          </h2>
          <p className="font-sans text-base text-warmgray text-center mb-10">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3.5 pr-12 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray hover:text-obsidian transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input type="checkbox" className="w-4 h-4 accent-obsidian" />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-obsidian text-ivory py-4 font-sans font-medium text-base uppercase tracking-widest hover:bg-charcoal transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin-loader mx-auto" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-obsidian mt-5 hover:underline cursor-pointer">
            Forgot your password?
          </p>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-light" />
            <span className="text-sm text-warmgray">or</span>
            <div className="flex-1 h-px bg-light" />
          </div>

          <p className="text-center font-sans text-base text-charcoal">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-obsidian font-medium hover:underline underline-offset-4">
              Register
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
