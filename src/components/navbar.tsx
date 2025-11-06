"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/button/button";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(false); 
  const [totalItems, setTotalItems] = useState(0); 

  const handleSignOut = () => {
    setUser(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
        >
          LUXE<span className="text-muted-foreground">AUTO</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Shop
          </Link>
        </div>

        <div className="flex items-center gap-4">

          <Link href="/cart" className="relative">
            <Button variant="default" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span >
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <Button variant="default" size="icon" onClick={handleSignOut}>
              <LogOut />
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="default" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
