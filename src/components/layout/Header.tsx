import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="w-full py-4 px-6 bg-background border-b border-border flex items-center justify-between">
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
    </header>
  );
}
