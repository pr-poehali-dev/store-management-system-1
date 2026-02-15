import { Link, useLocation } from "react-router-dom";
import { useStore } from "@/lib/store-context";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { cartCount, isAdmin } = useStore();
  const location = useLocation();

  const links = [
    { to: "/", label: "Главная", icon: "Home" },
    { to: "/catalog", label: "Каталог", icon: "Grid3x3" },
    { to: "/orders", label: "Заказы", icon: "Package" },
    { to: "/profile", label: "Профиль", icon: "User" },
  ];

  if (isAdmin) {
    links.push({ to: "/admin", label: "Админ", icon: "Shield" });
  }

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Icon name="Rocket" size={18} className="text-white" />
            </div>
            <span className="font-heading font-bold text-xl gradient-text">NOVA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? "gradient-primary text-white shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={link.icon} size={16} />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-muted"
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs gradient-accent border-0 text-white">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>

        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                location.pathname === link.to
                  ? "gradient-primary text-white"
                  : "text-muted-foreground bg-muted"
              }`}
            >
              <Icon name={link.icon} size={14} />
              {link.label}
            </Link>
          ))}
          <Link
            to="/cart"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              location.pathname === "/cart"
                ? "gradient-primary text-white"
                : "text-muted-foreground bg-muted"
            }`}
          >
            <Icon name="ShoppingCart" size={14} />
            Корзина {cartCount > 0 && `(${cartCount})`}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
