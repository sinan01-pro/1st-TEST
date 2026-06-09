import SectionReveal from '@/components/SectionReveal';

const sections = [
  { id: 'agreement', title: '1. Agreement', content: 'By accessing and using the VELARO website ("the Site"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Site. We reserve the right to modify these terms at any time without prior notice. Your continued use of the Site following any changes constitutes acceptance of those changes. Our Privacy Policy explains how we handle your data and is incorporated into these Terms by reference.' },
  { id: 'products', title: '2. Products & Pricing', content: 'All product descriptions and images on the Site are provided to the best of our ability. However, we do not guarantee that product colors will be accurately displayed on all devices, as screen settings may vary. All prices are listed in Bangladeshi Taka (৳) and are inclusive of applicable VAT unless otherwise stated. We reserve the right to change prices at any time without notice. Discount codes and promotional offers cannot be combined unless explicitly stated.' },
  { id: 'orders', title: '3. Orders & Payment', content: 'When you place an order on the Site, you are making an offer to purchase the products in your cart. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity. Available payment methods include Cash on Delivery (COD) and bKash mobile payment. An order confirmation email will be sent upon successful placement of your order.' },
  { id: 'shipping', title: '4. Shipping & Delivery', content: 'VELARO currently delivers within Bangladesh only. Standard delivery takes 3–5 business days. Express delivery (1–2 business days) is available for select locations at an additional charge. Delivery times are estimates and not guaranteed. Risk of loss and title for items purchased pass to you upon delivery to the shipping address. Free shipping is available on orders over ৳2,999.' },
  { id: 'returns', title: '5. Returns & Exchanges', content: 'We offer a 7-day return policy from the date of delivery. Items must be unworn, unwashed, and have all original tags attached. Return shipping costs are borne by the customer unless the item is defective or incorrect. In cases of defective or incorrect items, we will provide a full refund including shipping costs. Exchanges are subject to product availability. To initiate a return, please contact our customer support team who will provide return instructions. Refunds will be processed within 5–7 business days after we receive and inspect the returned item.' },
  { id: 'ip', title: '6. Intellectual Property', content: 'All content on the Site, including but not limited to text, graphics, logos, images, product descriptions, and software, is the property of VELARO or its content suppliers and is protected by Bangladeshi and international copyright, trademark, and other intellectual property laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited. The VELARO name, logo, and all related names, logos, product and service names are trademarks of VELARO.' },
  { id: 'accounts', title: '7. User Accounts', content: 'To access certain features of the Site, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary. We reserve the right to suspend or terminate accounts that violate these terms or for any other reason at our discretion.' },
  { id: 'liability', title: '8. Limitation of Liability', content: 'To the fullest extent permitted by law, VELARO shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Site or products purchased. Our total liability to you for any claim arising from these terms or your use of the Site shall not exceed the total amount you paid for the specific order giving rise to the claim. We are not liable for delays or failures in performance resulting from causes beyond our reasonable control.' },
  { id: 'governing', title: '9. Governing Law', content: 'These Terms and Conditions shall be governed by and construed in accordance with the laws of the People\'s Republic of Bangladesh. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.' },
  { id: 'changes', title: '10. Changes to Terms', content: 'We reserve the right to modify or replace these Terms and Conditions at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site following the posting of any changes constitutes acceptance of those changes. It is your responsibility to review these terms periodically.' },
  { id: 'contact', title: '11. Contact', content: 'If you have any questions about these Terms and Conditions, please contact us at: Email: support@velaro.com, Address: House XX, Road XX, Sector XX, Uttara, Dhaka-1230, Bangladesh.' },
];

export default function TermsConditions() {
  return (
    <div className="bg-ivory pt-28 md:pt-32 pb-20">
      <div className="container-velaro max-w-[800px]">
        <SectionReveal>
          <h1 className="font-serif font-medium text-4xl md:text-[56px] text-obsidian text-center mb-4">
            Terms & Conditions
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
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
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
