import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 🚀 INYECTADO: Importamos los iconos de redes sociales (Twitter, Youtube, Github) y quitamos LogIn
import { Terminal, ShieldAlert, LogOut, Twitter, Youtube, Github } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  // Buscamos si hay un pase VIP en el almacenamiento
  const token = localStorage.getItem('token');

  // Función de desconexión rápida desde la portada
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-green-500/30 sticky top-0 z-50 font-mono selection:bg-green-500/30">
      
      {/* 🟢 BARRA PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Principal (Estética Hacker Pura) */}
          <Link to="/" className="flex items-center gap-3 group">
            <Terminal className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
            
          </Link>

          {/* Controles y Radares Sociales */}
          <div className="flex items-center gap-6">
            {token ? (
              // 🟢 VISTA DE COMANDANTE (Logueado - Mantiene el acceso al Búnker)
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
              // ⚪ VISTA DE LECTOR PÚBLICO (Nodos de Comunicación - Redes)
              <div className="flex items-center gap-5 text-green-600">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 📡 SUB-MENÚ TÁCTICO (FILTROS) - Deslizable en móviles */}
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
  );
};

export default Navbar;