import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ChevronRight } from 'lucide-react';
import { useCart } from '@/stores/useCart';
import { divisions, districtsByDivision } from '@/data/products';
import { useToast } from '@/stores/useToast';
import SectionReveal from '@/components/SectionReveal';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { add: addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const total = subtotal();
  const shipping = shippingMethod === 'express' ? 150 : 80;
  const grandTotal = total + shipping;

  const availableDistricts = division ? districtsByDivision[division] || [] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Send order confirmation email
    const orderDetails = {
      customerName: name,
      phone: phone,
      email: email,
      address: address,
      district: district,
      division: division,
      postalCode: postalCode,
      items: items.map(item => ({
        product: item.product.name,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.product.discountPrice || item.product.price
      })),
      totalAmount: grandTotal,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'bKash',
      shippingMethod: shippingMethod,
      notes: notes,
      orderDate: new Date().toISOString()
    };

    // In a real implementation, this would be sent to your backend
    console.log('Order Details:', orderDetails);
    console.log('Order confirmation would be sent to: sinangtp01@gmail.com');

    clearCart();
    setLoading(false);
    addToast('Order placed successfully!', 'success');
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-[80vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-obsidian mb-4">Your cart is empty</h2>
          <Link to="/collection" className="btn-primary-dark text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Minimal Header */}
      <div className="border-b border-light py-5">
        <div className="container-velaro flex items-center justify-between">
          <Link to="/cart" className="text-sm text-obsidian hover:underline underline-offset-4">
            &larr; Back to Cart
          </Link>
          <Link
            to="/"
            className="font-serif font-medium text-xl tracking-[0.15em] uppercase text-obsidian"
          >
            VELARO
          </Link>
          <div className="w-20" />
        </div>
      </div>

      <div className="container-velaro py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Checkout Form */}
          <SectionReveal>
            <div>
              <h1 className="font-serif font-medium text-3xl text-obsidian mb-8">
                Checkout
              </h1>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mb-10">
                {['Information', 'Shipping', 'Payment'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                      i === 0 ? 'bg-obsidian text-ivory' : 'border border-warmgray text-warmgray'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm ${i === 0 ? 'text-obsidian font-medium' : 'text-warmgray'}`}>
                      {step}
                    </span>
                    {i < 2 && <ChevronRight size={14} className="text-warmgray mx-1" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact */}
                <div>
                  <h3 className="font-sans font-medium text-lg text-obsidian mb-4">
                    Contact Information
                  </h3>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
                  />
                  <label className="flex items-center gap-2 mt-3 text-sm text-charcoal">
                    <input type="checkbox" className="w-4 h-4 accent-obsidian" />
                    Email me with news and offers
                  </label>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-sans font-medium text-lg text-obsidian mb-4">
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name *"
                      required
                      className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
                    />
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number (01XXXXXXXXX) *"
                        required
                        pattern="01[0-9]{9}"
                        className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
                      />
                      <p className="text-xs text-warmgray mt-1">
                        We&apos;ll contact you on this number for delivery
                      </p>
                    </div>
                    <select
                      value={division}
                      onChange={(e) => { setDivision(e.target.value); setDistrict(''); }}
                      required
                      className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select Division *</option>
                      {divisions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                      disabled={!division}
                      className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select District *</option>
                      {availableDistricts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Full address: Street, house number, area, thana *"
                      required
                      rows={3}
                      className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors resize-none"
                    />
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal code (optional)"
                      className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="font-sans font-medium text-lg text-obsidian mb-4">
                    Shipping Method
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Standard Delivery', desc: '3–5 business days', price: 80 },
                      { id: 'express', label: 'Express Delivery', desc: '1–2 business days', price: 150 },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                          shippingMethod === method.id ? 'border-obsidian' : 'border-light hover:border-charcoal'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={() => setShippingMethod(method.id)}
                            className="accent-obsidian"
                          />
                          <div>
                            <p className="font-sans font-medium text-sm">{method.label}</p>
                            <p className="text-xs text-warmgray">{method.desc}</p>
                          </div>
                        </div>
                        <span className="font-sans font-medium text-sm">৳{method.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-sans font-medium text-lg text-obsidian mb-4">
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                        paymentMethod === 'cod' ? 'border-obsidian' : 'border-light hover:border-charcoal'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-obsidian"
                      />
                      <div>
                        <p className="font-sans font-medium text-sm">Cash on Delivery</p>
                        <p className="text-xs text-warmgray">Pay with cash when your order is delivered</p>
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                        paymentMethod === 'bkash' ? 'border-bkash' : 'border-light hover:border-charcoal'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="accent-bkash"
                      />
                      <div>
                        <p className="font-sans font-medium text-sm">
                          <span className="text-bkash font-bold">bKash</span> Payment
                        </p>
                        <p className="text-xs text-warmgray">Pay securely with your bKash account</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <h3 className="font-sans font-medium text-lg text-obsidian mb-4">
                    Order Notes <span className="text-warmgray font-normal">(optional)</span>
                  </h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special instructions for delivery..."
                    rows={3}
                    className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-obsidian text-ivory py-5 font-sans font-medium text-base uppercase tracking-widest hover:bg-charcoal transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin-loader" />
                      Processing...
                    </>
                  ) : (
                    'Complete Order'
                  )}
                </button>
              </form>
            </div>
          </SectionReveal>

          {/* Order Summary */}
          <SectionReveal delay={0.2}>
            <div className="lg:sticky lg:top-28 bg-charcoal p-6 md:p-8 text-ivory">
              <h3 className="font-serif font-medium text-2xl mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {items.map((item) => {
                  const price = item.product.discountPrice || item.product.price;
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-ivory/80">
                        {item.product.name} &times; {item.quantity}
                      </span>
                      <span className="font-medium">৳{(price * item.quantity).toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-ivory/10 my-5" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ivory/80">Subtotal</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ivory/80">Shipping</span>
                  <span>৳{shipping}</span>
                </div>
              </div>

              <div className="h-px bg-ivory/10 my-5" />

              <div className="flex justify-between mb-1">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl">৳{grandTotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-warmgray">
                Including VAT
              </p>

              <div className="flex items-center gap-2 mt-6 text-xs text-warmgray">
                <Lock size={12} />
                Your payment information is processed securely.
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="border-t border-light py-6">
        <div className="container-velaro text-center">
          <p className="text-xs text-warmgray">&copy; 2025 VELARO. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-warmgray">
            <span className="flex items-center gap-1"><Lock size={12} /> Secure Checkout</span>
            <span>bKash Verified</span>
            <span>COD Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
