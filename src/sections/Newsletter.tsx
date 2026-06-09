import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-obsidian py-20 md:py-24">
      <div className="container-velaro max-w-[600px] text-center">
        <SectionReveal>
          <h2 className="font-serif font-medium text-3xl md:text-[44px] text-ivory mb-4">
            Join the Inner Circle
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-sans text-base text-ivory/70 leading-relaxed mb-10">
            Subscribe for exclusive early access to new collections, special offers, and style tips delivered to your inbox.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-emerald-400">
              <CheckCircle size={20} />
              <span className="font-sans">Welcome to the Inner Circle!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3.5 bg-transparent border border-dark text-ivory placeholder:text-warmgray font-sans text-base focus:outline-none focus:border-ivory/50 transition-colors"
              />
              <button
                type="submit"
                className="btn-primary-light px-8 py-3.5 text-sm"
              >
                Subscribe
              </button>
            </form>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
