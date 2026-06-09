import { useState } from 'react';
import { Phone, Briefcase, MapPin, Share2, CheckCircle } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-velaro max-w-[800px] text-center">
          <SectionReveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-warmgray mb-5">
              GET IN TOUCH
            </p>
            <h1 className="font-serif font-medium text-4xl md:text-[56px] text-ivory mb-4">
              We&apos;d Love to Hear From You
            </h1>
            <p className="font-sans text-lg md:text-xl text-ivory/70 leading-relaxed">
              Questions about your order, sizing, or just want to say hello? Our team is here to help.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Content */}
      <section className="bg-ivory section-padding">
        <div className="container-velaro">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionReveal>
                <h2 className="font-serif font-medium text-3xl text-obsidian mb-2">
                  Send Us a Message
                </h2>
                <p className="font-sans text-base text-warmgray mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="flex items-center gap-3 text-emerald-600 py-10">
                    <CheckCircle size={24} />
                    <div>
                      <p className="font-sans font-medium">Thank you! Your message has been sent.</p>
                      <p className="text-sm text-warmgray">We&apos;ll respond within 24 hours.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                        Phone Number <span className="text-warmgray font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                        Subject
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian appearance-none cursor-pointer"
                      >
                        <option>Order Inquiry</option>
                        <option>Product Question</option>
                        <option>Size/Fit Help</option>
                        <option>Return/Exchange</option>
                        <option>Business Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-sans font-medium text-sm text-obsidian mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button type="submit" className="btn-primary-dark w-full">
                      Send Message
                    </button>
                  </form>
                )}
              </SectionReveal>
            </div>

            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: Phone,
                  title: 'Customer Support',
                  lines: ['+880 1XXX-XXXXXX', 'support@velaro.com', 'Sat–Thu, 10:00 AM – 8:00 PM (BST)'],
                },
                {
                  icon: Briefcase,
                  title: 'Business Inquiries',
                  lines: ['business@velaro.com', 'For wholesale, partnership, and media inquiries'],
                },
                {
                  icon: MapPin,
                  title: 'Our Office',
                  lines: ['House XX, Road XX, Sector XX', 'Uttara, Dhaka-1230, Bangladesh', 'Office visits by appointment only'],
                },
                {
                  icon: Share2,
                  title: 'Follow Us',
                  socials: true,
                },
              ].map((card) => (
                <SectionReveal key={card.title} delay={0.1}>
                  <div className="border border-light p-6">
                    <card.icon size={24} strokeWidth={1.5} className="text-obsidian mb-3" />
                    <h4 className="font-sans font-medium text-lg text-obsidian mb-2">{card.title}</h4>
                    {card.lines?.map((line, i) => (
                      <p key={i} className={`text-sm ${i === 0 && card.title.includes('Support') ? 'text-charcoal' : 'text-warmgray'} ${i > 0 ? 'mt-1' : ''}`}>
                        {line.includes('@') ? (
                          <a href={`mailto:${line}`} className="text-obsidian hover:underline underline-offset-4">{line}</a>
                        ) : line}
                      </p>
                    ))}
                    {card.socials && (
                      <div className="flex gap-4 mt-2">
                        {['Facebook', 'Instagram', 'YouTube'].map((s) => (
                          <a key={s} href="#" className="text-sm text-obsidian hover:underline underline-offset-4">
                            {s}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
