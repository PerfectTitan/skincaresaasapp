import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function StickyHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out",
        scrolled
          ? "py-2 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "py-4 bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">GlowSage</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/pricing"
            className="text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/blog"
            className="text-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
