import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, ShieldAlert, LogIn, LogOut } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Principal */}
          <Link to="/" className="flex items-center gap-3 group">
            <Terminal className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
            <span className="text-2xl font-bold text-green-500 tracking-tight uppercase drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]">
              Cyber<span className="text-green-300">EnteradosNews</span>
            </span>
          </Link>

          {/* Enlaces y Comandos Tácticos */}
          <div className="flex items-center gap-6">
            <Link to="/" className="hidden md:block text-green-600 hover:text-green-400 text-sm uppercase tracking-widest transition-colors">
              [ Feed_Principal ]
            </Link>

            {token ? (
              // 🟢 VISTA DE COMANDANTE (Logueado)
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
              // ⚪ VISTA DE LECTOR PÚBLICO (No Logueado)
              <Link 
                to="/login" 
                className="flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors uppercase tracking-widest text-xs md:text-sm border border-green-500/50 px-3 py-1.5 rounded hover:bg-green-900/30"
              >
                <LogIn className="w-4 h-4" /> Acceso_Root
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;