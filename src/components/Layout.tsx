import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import Toast from './Toast';
import SearchOverlay from './SearchOverlay';

interface LayoutProps {
  children?: ReactNode;
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1">{children ?? <Outlet />}</main>
      {!hideFooter && <Footer />}
      <CartDrawer />
      <Toast />
      <SearchOverlay />
    </div>
  );
}
