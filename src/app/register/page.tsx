"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/button/button";
import { sendEmail } from "@/service/userEmail";
import { notification } from "@/components/notify/notify";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [registered, setRegistered] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);


    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al registrarse");


      }

      const currentYear = new Date().getFullYear();

      const message = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #000000; padding: 40px 20px; margin: 0;">
    <div style="max-width: 600px; background: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.4);">
      
    <!-- Header -->
  <div style="background: url('https://res.cloudinary.com/dzifkqomf/image/upload/v1764333191/home_wpipca.avif') center/cover; color: white; text-align: center; padding: 60px 20px; position: relative;">
        <div style="position: relative; z-index: 1;">
          <h1 style="margin: 0; font-size: 40px; font-weight: 700; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">LUXE AUTO</h1>
          <div style="height: 3px; background: white; width: 100px; margin: 15px auto; opacity: 0.8;"></div>
          <p style="margin: 15px 0 0 0; font-weight: 700; font-size: 14px; opacity: 0.95; font-weight: 300; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">Experiencia Automotriz de Lujo</p>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 20px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 700;">¡Bienvenido, ${name}!</h2>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Tu cuenta ha sido creada exitosamente</p>
      </div>

      <div style="padding: 40px 30px; color: #000000; line-height: 1.8;">
        <p style="margin: 0 0 10px 0; font-size: 16px;">Hola <strong>${name}</strong>,</p>
        
        <p style="margin: 0 0 25px 0; font-size: 15px; color: #333;">
          Te damos la más cordial bienvenida a <strong style="color: #000;">Luxe Auto</strong>. Tu cuenta ha sido creada exitosamente y ahora tienes acceso completo a nuestra plataforma de gestión automotriz de lujo.
        </p>

        <!-- Características -->
        <div style="margin: 30px 0;">
          <p style="font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px 0;"><strong>Qué puedes hacer ahora:</strong></p>
          <ul style="margin: 0; padding-left: 20px; list-style: none;">
            <li style="margin: 8px 0; font-size: 14px; color: #333;"><strong>✓</strong> Acceder a tu panel de control personalizado</li>
            <li style="margin: 8px 0; font-size: 14px; color: #333;"><strong>✓</strong> Gestionar tu inventario automotriz</li>
            <li style="margin: 8px 0; font-size: 14px; color: #333;"><strong>✓</strong> Recibir ofertas y novedades especiales</li>
          </ul>
        </div>

        <p style="margin: 25px 0 10px 0; font-size: 15px; color: #333;">
          Usa tu correo electrónico y contraseña para acceder a la plataforma.
        </p>
      </div>

      <div style="text-align: center; padding: 0 30px 30px 30px;">
        <a href="https://localhost:3000/api/login" style="display: inline-block; background: #000000; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
          ACCEDER A MI CUENTA
        </a>
      </div>

      <!-- Security Notice -->
      <div style="background: #f9f9f9; padding: 20px 30px; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0; font-size: 12px; color: #999; line-height: 1.6;">
          <strong style="color: #000;">Importante:</strong> Nunca compartas tu contraseña con nadie. Si no fuiste tú quien realizó este registro, por favor contáctanos inmediatamente.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #000000; color: white; text-align: center; padding: 30px 20px;">
        <p style="margin: 0 0 15px 0; font-size: 12px;">
          <a href="https://localhost:3000/api/contact" style="color: #ffffff; text-decoration: none; margin: 0 10px;">Contáctanos</a> | 
        </p>
        <p style="margin: 12px 0 0 0; font-size: 11px; color: #888;">
          © ${currentYear} Luxe Auto. Todos los derechos reservados.
        </p>
      </div>

    </div>
  </div>
`;

      await sendEmail(email, "¡Bienvenido a Luxe Auto!", message);

      setRegistered(true);
      notification("Registro exitoso. Revisa tu correo electrónico.", "success");

      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Error al registrarse");
      notification("Error en el registro. Intenta nuevamente.", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 text-black">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Crear cuenta</h1>
          <p className="text-gray-500">Comienza tu experiencia automotriz de lujo</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Brandon Arredondo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="brandon@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">
              ¡Cuenta creada con éxito! Redirigiendo...
            </p>
          )}

          <Button type="submit">
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Registrarse"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
