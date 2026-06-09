import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Home, Package, Heart, MapPin, User, Lock, LogOut,
  ShoppingBag, CreditCard
} from 'lucide-react';
import { useAuth } from '@/stores/useAuth';
import { useWishlist } from '@/stores/useWishlist';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import SectionReveal from '@/components/SectionReveal';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'orders', label: 'My Orders', icon: Package },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'profile', label: 'Profile Settings', icon: User },
  { key: 'password', label: 'Change Password', icon: Lock },
];

const statusColors: Record<string, string> = {
  'Pending': 'bg-warmgray text-ivory',
  'Confirmed': 'bg-gold text-obsidian',
  'Processing': 'bg-blue-500 text-ivory',
  'Shipped': 'bg-purple-500 text-ivory',
  'Delivered': 'bg-emerald-500 text-ivory',
  'Cancelled': 'bg-red-500 text-ivory',
};

const sampleOrders = [
  { id: 'VEL-250601-001', date: '2025-06-01', items: [products[0], products[2]], total: 2898, status: 'Delivered' as const },
  { id: 'VEL-250610-002', date: '2025-06-10', items: [products[6]], total: 2499, status: 'Shipped' as const },
  { id: 'VEL-250615-003', date: '2025-06-15', items: [products[10], products[12]], total: 7398, status: 'Processing' as const },
];

export default function Account() {
  const { user, logout, isAuthenticated } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saved, setSaved] = useState(false);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const totalOrders = sampleOrders.length;
  const totalSpent = sampleOrders.reduce((s, o) => s + o.total, 0);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 className="font-serif font-medium text-3xl text-obsidian mb-8">
              Welcome back, {user?.name?.split(' ')[0] || 'Customer'}
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
              {[
                { icon: Package, value: totalOrders, label: 'Total Orders' },
                { icon: Heart, value: wishlistItems.length, label: 'Wishlist Items' },
                { icon: CreditCard, value: `৳${totalSpent.toLocaleString()}`, label: 'Total Spent' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="border border-light p-6">
                  <Icon size={22} strokeWidth={1.5} className="text-obsidian mb-3" />
                  <p className="font-serif font-medium text-3xl text-obsidian">{value}</p>
                  <p className="text-sm text-warmgray mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <h3 className="font-serif font-medium text-2xl text-obsidian mb-5">
              Recent Orders
            </h3>
            <div className="border border-light overflow-hidden">
              <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 bg-charcoal/5 text-xs uppercase tracking-wider text-warmgray font-medium">
                <span className="col-span-1">Order #</span>
                <span>Date</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
                <span></span>
              </div>
              {sampleOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 px-6 py-4 border-t border-light items-center"
                >
                  <span className="font-sans font-medium text-sm">{order.id}</span>
                  <span className="text-sm text-warmgray">{order.date}</span>
                  <span className="text-sm text-warmgray">{order.items.length} item(s)</span>
                  <span className="font-sans font-medium text-sm">৳{order.total.toLocaleString()}</span>
                  <span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </span>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-sm text-obsidian hover:underline underline-offset-4 text-left md:text-right"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: ShoppingBag, title: 'Browse Collection', desc: 'Discover new styles', action: () => {}, link: '/collection' },
                { icon: MapPin, title: 'Update Address', desc: 'Manage delivery addresses', action: () => setActiveTab('addresses') },
                { icon: Package, title: 'Contact Support', desc: 'Need help with an order?', action: () => {}, link: '/contact' },
              ].map(({ icon: Icon, title, desc, action, link }) => (
                <div key={title} className="border border-light p-6">
                  <Icon size={22} strokeWidth={1.5} className="text-obsidian mb-3" />
                  <h4 className="font-sans font-medium text-base text-obsidian">{title}</h4>
                  <p className="text-sm text-warmgray mt-1 mb-3">{desc}</p>
                  {link ? (
                    <Link to={link} className="text-sm text-obsidian hover:underline underline-offset-4">
                      Go &rarr;
                    </Link>
                  ) : (
                    <button onClick={action} className="text-sm text-obsidian hover:underline underline-offset-4">
                      Go &rarr;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div>
            <h2 className="font-serif font-medium text-3xl text-obsidian mb-8">My Orders</h2>
            <div className="space-y-4">
              {sampleOrders.map((order) => (
                <div key={order.id} className="border border-light p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-sans font-medium text-base">{order.id}</p>
                      <p className="text-sm text-warmgray">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex gap-3 mb-4">
                    {order.items.map((item) => (
                      <img key={item.id} src={item.images[0]} alt={item.name} className="w-14 h-18 object-cover" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold">৳{order.total.toLocaleString()}</span>
                    <button className="text-sm text-obsidian hover:underline underline-offset-4">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif font-medium text-3xl text-obsidian">My Wishlist</h2>
              <span className="text-base text-warmgray">{wishlistItems.length} items</span>
            </div>
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart size={48} strokeWidth={1} className="text-warmgray mx-auto mb-4" />
                <h3 className="font-serif text-xl text-obsidian mb-2">Your wishlist is empty</h3>
                <p className="text-warmgray mb-6">Save your favorite items to find them easily later.</p>
                <Link to="/collection" className="btn-primary-dark text-sm">
                  Browse Collection
                </Link>
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif font-medium text-3xl text-obsidian">My Addresses</h2>
              <button className="btn-secondary-outline text-sm py-2.5 px-5">
                + Add New Address
              </button>
            </div>
            <div className="border border-light p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-sans font-medium text-base">{user?.name}</p>
                    <span className="bg-obsidian text-ivory text-xs px-2 py-0.5">Default</span>
                  </div>
                  <p className="text-sm text-charcoal">{user?.phone}</p>
                  <p className="text-sm text-charcoal mt-1">
                    House 12, Road 5, Sector 7, Uttara, Dhaka-1230
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <button className="text-obsidian hover:underline underline-offset-4">Edit</button>
                  <button className="text-red-500 hover:underline underline-offset-4">Delete</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div>
            <h2 className="font-serif font-medium text-3xl text-obsidian mb-8">Profile Settings</h2>
            <form
              onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }}
              className="max-w-md space-y-5"
            >
              <div>
                <label className="block font-sans font-medium text-sm mb-1.5">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-sm mb-1.5">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-sm mb-1.5">Phone</label>
                <input
                  type="tel"
                  defaultValue={user?.phone}
                  className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                />
              </div>
              <button type="submit" className="btn-primary-dark text-sm">
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </form>
          </div>
        );

      case 'password':
        return (
          <div>
            <h2 className="font-serif font-medium text-3xl text-obsidian mb-8">Change Password</h2>
            <form className="max-w-md space-y-5">
              <div>
                <label className="block font-sans font-medium text-sm mb-1.5">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-sm mb-1.5">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-sm mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3.5 border border-light bg-transparent font-sans text-base focus:outline-none focus:border-obsidian"
                />
              </div>
              <button type="submit" className="btn-primary-dark text-sm">
                Update Password
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-ivory pt-24 md:pt-28 pb-16 md:pb-20 min-h-screen">
      <div className="container-velaro">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Sidebar */}
          <div className="lg:w-[280px] flex-shrink-0">
            <div className="lg:sticky lg:top-28 border border-light">
              {/* User brief */}
              <div className="p-6 border-b border-light">
                <div className="w-12 h-12 bg-obsidian text-ivory rounded-full flex items-center justify-center font-serif font-medium text-lg">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <p className="font-sans font-medium text-base mt-3">{user?.name}</p>
                <p className="text-sm text-warmgray">{user?.email}</p>
              </div>

              {/* Nav items */}
              <div className="py-2">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center gap-3 px-6 py-3.5 text-left font-sans text-[15px] transition-colors ${
                      activeTab === item.key
                        ? 'text-obsidian font-medium border-l-[3px] border-obsidian bg-charcoal/[0.03]'
                        : 'text-charcoal hover:bg-charcoal/[0.03]'
                    }`}
                  >
                    <item.icon size={18} strokeWidth={1.5} />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-light mt-2 pt-2">
                  <button
                    onClick={() => { logout(); }}
                    className="w-full flex items-center gap-3 px-6 py-3.5 text-left font-sans text-[15px] text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} strokeWidth={1.5} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <SectionReveal key={activeTab}>
              {renderContent()}
            </SectionReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
