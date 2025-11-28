"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Chrome } from "lucide-react";
import { Button } from "@/components/button/button";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { t } = useLanguage();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/shop");
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) throw new Error(result.error);
      router.push("/shop");
    } catch {
      setError(t("login.errors.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/shop" });
    } catch {
      setError(t("login.errors.googleSignInError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 text-black">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">


          <h1 className="text-4xl font-bold tracking-tight">{t("login.title")}</h1>
          <p className="text-gray-500">{t("login.subtitle")}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("login.email")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t("login.password")}
              </label>
              <input
                id="password"
                type="password"
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit">
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : t("login.signInButton")}
          </Button>

          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-gray-500">{t("login.divider")}</span>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={handleGoogleSignIn}>
            <Chrome className="h-4 w-4" />
            {t("login.googleSignIn")}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
            >
              {t("login.noAccount")} {t("login.register")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}