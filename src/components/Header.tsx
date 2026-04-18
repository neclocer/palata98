import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'История болезни', path: '/about' },
    { label: 'О нас', path: '/shipping' },
    { label: 'Контакты', path: '/contacts' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="vhs-noise absolute inset-0 opacity-10 pointer-events-none" />
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-mono text-lg md:text-xl font-bold text-foreground tracking-wider glitch-text">
              98-ШИЗМУТ.РФ
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link to={item.path}>
                    <NavigationMenuLink
                      className={`px-4 py-2 text-sm font-normal transition-colors hover:text-primary cursor-pointer ${
                        isActive(item.path) ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-mono">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background border-border">
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-normal transition-colors hover:text-primary ${
                        isActive(item.path) ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
