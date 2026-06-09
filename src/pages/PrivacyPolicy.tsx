import SectionReveal from '@/components/SectionReveal';

const sections = [
  { id: 'intro', title: 'Introduction', content: 'VELARO ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. By using our services, you agree to the collection and use of information in accordance with this policy. This policy should be read alongside our Terms & Conditions.' },
  { id: 'collect', title: 'Information We Collect', content: 'We collect several types of information from and about users of our website, including: Personal information (name, email address, phone number, shipping address) that you provide when registering, placing an order, or contacting us. Order information including products purchased, payment method, and delivery details. Account information such as login credentials. Device and browsing information including IP address, browser type, and pages visited. Cookies and usage data to improve your browsing experience.' },
  { id: 'use', title: 'How We Use Your Information', content: 'We use the information we collect to: Process and fulfill your orders, including delivery and payment processing. Communicate with you about your orders, shipping updates, and customer service inquiries. Send you marketing communications and promotional offers (you can opt out at any time). Improve our website, products, and services based on user behavior and feedback. Comply with legal obligations and protect against fraudulent transactions.' },
  { id: 'share', title: 'Information Sharing', content: 'We may share your information with: Shipping partners (courier services) to deliver your orders. Payment processors (bKash) to process payments securely. Service providers who assist us with website hosting, analytics, and email delivery. Law enforcement or regulatory authorities when required by law. We do not sell, trade, or rent your personal information to third parties for marketing purposes.' },
  { id: 'security', title: 'Data Security', content: 'We implement appropriate security measures to protect your personal information: SSL encryption for all data transmission between your browser and our servers. Secure payment processing through bKash Merchant API. Password hashing for user account credentials. Limited access to personal data within our organization. Regular security audits and updates to our systems.' },
  { id: 'rights', title: 'Your Rights', content: 'As a user in Bangladesh, you have the right to: Access the personal data we hold about you. Request correction of inaccurate or incomplete information. Request deletion of your account and associated personal data. Opt out of marketing communications at any time. Request data portability where applicable. To exercise these rights, please contact us at support@velaro.com.' },
  { id: 'cookies', title: 'Cookies', content: 'We use cookies and similar tracking technologies to enhance your browsing experience. These include: Essential cookies required for the website to function (shopping cart, user login). Analytics cookies to understand how visitors interact with our website. Marketing cookies to deliver relevant advertisements. You can manage your cookie preferences through your browser settings.' },
  { id: 'third-party', title: 'Third-Party Services', content: 'Our website may contain links to third-party services: Google Analytics for website traffic analysis. bKash payment gateway for secure transactions. Social media integrations (Facebook, Instagram) for sharing and login. These third parties have their own privacy policies, and we encourage you to read them.' },
  { id: 'children', title: "Children's Privacy", content: 'Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.' },
  { id: 'changes', title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the revised policy.' },
  { id: 'contact', title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at: Email: support@velaro.com, Address: House XX, Road XX, Sector XX, Uttara, Dhaka-1230, Bangladesh.' },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-ivory pt-28 md:pt-32 pb-20">
      <div className="container-velaro max-w-[800px]">
        <SectionReveal>
          <h1 className="font-serif font-medium text-4xl md:text-[56px] text-obsidian text-center mb-4">
            Privacy Policy
          </h1>
          <p className="text-center text-warmgray mb-12">
            Last updated: January 1, 2025
          </p>
        </SectionReveal>

        {/* Table of Contents */}
        <SectionReveal>
          <div className="mb-12 p-6 border border-light">
            <p className="font-sans font-medium text-sm uppercase tracking-wider text-obsidian mb-4">
              Table of Contents
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-sm text-obsidian hover:text-warmgray transition-colors hover:underline underline-offset-4"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <SectionReveal key={section.id}>
              <div id={section.id}>
                <h2 className="font-sans font-bold text-xl text-obsidian mb-4">
                  {section.title}
                </h2>
                <p className="font-sans text-base leading-relaxed text-charcoal">
                  {section.content}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
