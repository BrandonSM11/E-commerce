"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/button/button";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
        >
          LUXE<span className="text-muted-foreground">AUTO</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop" // <-- aquí decides la ruta principal
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Shop
          </Link>
        </div>

        {/* Usuario y carrito */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <Button variant="default" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {/* Si tienes totalItems, puedes añadirlo aquí */}
              {/* {totalItems > 0 && <span>{totalItems}</span>} */}
            </Button>
          </Link>

          {status === "authenticated" ? (
            <>
              <span className="hidden md:inline text-lg text-gray-600">
                Hi, {session.user?.name || session.user?.email}
              </span>
              <Button
                variant="default"
                size="icon"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
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
