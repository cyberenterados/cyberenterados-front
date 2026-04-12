import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 🚀 INYECTADO: Importación del escuadrón completo de satélites sociales
import { ShieldAlert, LogOut, Twitter, Instagram, Facebook, Youtube, Film, Terminal } from 'lucide-react';
import { TickerFinanciero } from './TickerFinanciero'; 

const Navbar = () => {
  const navigate = useNavigate();
  // Verificación de credenciales en el almacenamiento local
  const token = localStorage.getItem('token');

  // Protocolo de desconexión rápida
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <> {/* 📡 Fragmento Maestro: Permite múltiples componentes en la raíz */}
      
      {/* 📈 Módulo Ticker: Desplegado en la capa superior del búnker */}
      <TickerFinanciero />
      
      <nav className="bg-black border-b border-green-500/30 sticky top-0 z-50 font-mono selection:bg-green-500/30">
        
        {/* 🟢 BARRA PRINCIPAL (H100) */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo de Operaciones: >_ */}
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-3xl font-bold text-green-500 tracking-widest drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]">
                &gt;_
              </span>
            </Link>

            {/* Consola de Control y Enlaces de Red */}
            <div className="flex items-center gap-6">
              {token ? (
                // 🛠️ VISTA DE COMANDANTE (Modo Admin Activo)
                <div className="flex items-center gap-4">
                  <Link 
                    to="/panel" 
                    className="flex items-center gap-2 text-green-500 hover:text-black hover:bg-green-500 transition-all uppercase tracking-widest text-xs md:text-sm border border-green-500/50 px-3 py-1.5 rounded bg-green-950/30 shadow-[0_0_10px_rgba(0,255,0,0.1)]"
                  >
                    <ShieldAlert className="w-4 h-4" /> Búnker
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 uppercase tracking-widest text-xs font-bold transition-colors"
                    title="Cerrar Sesión"
                  >
                    <LogOut className="w-4 h-4 hidden md:block" /> Salir
                  </button>
                </div>
              ) : (
                // 🌐 VISTA DE LECTOR (Nodos de Difusión Oficiales)
                <div className="flex items-center gap-5 text-green-600">
                  <a href="https://x.com/cyberenterados" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors" title="X (Twitter): CyberEnterados">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/cyberenterados/?hl=es" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors" title="Instagram: CyberEnterados">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/cyberenterados?locale=es_LA" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors" title="Facebook: CyberEnterados">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.youtube.com/@cyberenterados" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors" title="YouTube: CyberEnterados">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@cyberenteradosnews" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors" title="TikTok: CyberEnteradosNews">
                    <Film className="w-5 h-5" />
                  </a>

                  {/* 🚀 [ PUERTO DE EXPANSIÓN RESERVADO ] 
                      Descomentar el siguiente bloque para inyectar una nueva red en el futuro:
                  */}
                  {/* <a href="URL_NUEVA_RED" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors" title="Nueva Red Táctica">
                    <Terminal className="w-5 h-5" />
                  </a> */}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 📡 SUB-MENÚ TÁCTICO: Filtrado de frecuencias */}
        <div className="border-t border-green-900/50 bg-black/80 overflow-x-auto hide-scrollbar">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 flex items-center gap-6 text-[10px] md:text-xs uppercase tracking-widest font-bold">
            <Link to="/" className="text-green-600 hover:text-green-400 whitespace-nowrap transition-colors">
              [ TODAS ]
            </Link>
            <Link to="/?categoria=IA" className="text-green-600 hover:text-green-400 whitespace-nowrap transition-colors">
              [ IA ]
            </Link>
            <Link to="/?categoria=CIBERSEGURIDAD" className="text-green-600 hover:text-green-400 whitespace-nowrap transition-colors">
              [ CIBERSEGURIDAD ]
            </Link>
            <Link to="/?categoria=TECNOLOGIA" className="text-green-600 hover:text-green-400 whitespace-nowrap transition-colors">
              [ TECNOLOGÍA ]
            </Link>
            <Link to="/?categoria=ESPACIO" className="text-green-600 hover:text-green-400 whitespace-nowrap transition-colors">
              [ ESPACIO ]
            </Link>
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;