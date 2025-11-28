import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Luxury Motors</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Somos líderes en la comercialización de vehículos de lujo, ofreciendo una experiencia incomparable en la compra y posesión de automóviles premium. Con más de 15 años de trayectoria, nos comprometemos a proporcionar los mejores vehículos del mercado.
            </p>
            <p className="text-gray-400 text-sm">
              Cada automóvil en nuestra colección ha sido cuidadosamente seleccionado y certificado para garantizar la máxima calidad y satisfacción.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition">Nuestros Vehículos</a></li>
              <li><a href="#" className="hover:text-white transition">Modelos Exclusivos</a></li>
              <li><a href="#" className="hover:text-white transition">Servicios Premium</a></li>
              <li><a href="#" className="hover:text-white transition">Financiamiento</a></li>
              <li><a href="#" className="hover:text-white transition">Garantía Extendida</a></li>
              <li><a href="#" className="hover:text-white transition">Blog de Lujo</a></li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contáctanos</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <Phone size={20}/>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="hover:text-white transition">+57 (1) 555-0123</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20}  />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="hover:text-white transition">info@luxurymotors.co</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20}/>
                <div>
                  <p className="text-sm text-gray-400">Ubicación</p>
                  <p>Medellín, Antioquia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Legal Links */}
          <div>
            <h5 className="font-semibold mb-4">Información Legal</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition">Aviso Legal</a></li>
            </ul>
          </div>

          {/* Extra Info */}
          <div>
            <h5 className="font-semibold mb-4">Experiencia Premium</h5>
            <p className="text-gray-400 text-sm leading-relaxed">
              En Luxury Motors sabemos que adquirir un vehículo premium es una decisión importante. Nuestro equipo de expertos está disponible para brindarte asesoría personalizada en cada paso del proceso.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="font-semibold mb-4">Síguenos</h5>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-900 hover:bg-white hover:text-black p-3 rounded transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-900 hover:bg-white hover:text-black p-3 rounded transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-900 hover:bg-white hover:text-black p-3 rounded transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-900 hover:bg-white hover:text-black p-3 rounded transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2024 Luxury Motors. Todos los derechos reservados.</p>
            <p>Diseñado con excelencia para experiencias premium</p>
          </div>
        </div>
      </div>
    </footer>
  );
}