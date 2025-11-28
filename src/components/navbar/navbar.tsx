"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/button/button";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "../language/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCart, removeFromCart } from "@/service/cart";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const [showCar, setShowCar] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Cargar carrito cuando se abre el modal
  useEffect(() => {
    if (showCar && session) {
      fetchCartData();
    }
  }, [showCar, session]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const result = await getCart();
      if (result.status === "success") {
        setCartItems(result.data.items || []);
        setCartTotal(result.data.total || 0);
      }
    } catch (error) {
      console.error("Error cargando carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (vehicleId: number) => {
    try {
      const result = await removeFromCart(vehicleId.toString());
      if (result.status === "success") {
        setCartItems(result.data.items || []);
        setCartTotal(result.data.total || 0);
      }
    } catch (error) {
      console.error("Error eliminando del carrito:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
          >
            LUXE<span className="text-muted-foreground">AUTO</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {t("navbar.home")}
            </Link>
            <Link
              href="/shop"
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {t("navbar.shop")}
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {t("navbar.contact")}
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <div className="relative">
              <Button
                variant="default"
                size="icon"
                onClick={() => setShowCar(true)}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>

            {status === "authenticated" ? (
              <>
                <span className="hidden sm:inline text-sm md:text-lg text-gray-600">
                  {t("navbar.greeting")}, {session.user?.name || session.user?.email}
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
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {showCar && (
        <div className="fixed inset-0 flex justify-end z-9999">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setShowCar(false)}
          ></div>
          <div className="relative bg-white w-full sm:w-[400px] h-full shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col">
            <button
              onClick={() => setShowCar(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl z-10"
            >
              ✕
            </button>

            <div className="p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {t("navbar.cart")}
              </h2>

              {!session ? (
                <h1 className="text-black text-center">{t("navbar.noRegister")}</h1>
              ) : loading ? (
                <p className="text-center text-gray-600">Cargando...</p>
              ) : cartItems.length === 0 ? (
                <p className="text-center text-gray-600">El carrito está vacío</p>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto max-h-[calc(100vh-300px)] space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.vehicleId}
                        className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.name || `Vehículo #${item.vehicleId}`}</p>
                          <p className="text-gray-600 text-sm">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-gray-500 text-xs">
                           {t("navbar.quantity")}: {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.vehicleId)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">{t("navbar.total")}:</span>
                      <span className="font-bold text-lg">
                        ${cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <Button  variant="default">
                      {t("navbar.payment")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}