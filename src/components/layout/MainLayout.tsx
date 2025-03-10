import { ReactNode } from "react";
import StickyHeader from "./StickyHeader";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <StickyHeader />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
