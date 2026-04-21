import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 🛠️ CIRUGÍA 1: Importamos el icono Wrench (Herramienta) para el Nodo SIGINT
import { LayoutDashboard, FileText, PlusCircle, LogOut, Terminal, ShieldAlert, Wrench } from 'lucide-react'; 

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  // Función táctica de desconexión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Destruir el token de seguridad
    navigate('/login'); // Expulsar a la pantalla de Login
  };

  const menuItems = [
    { name: 'Inicio', icon: LayoutDashboard, path: '/panel' },
    { name: 'Mis Noticias', icon: FileText, path: '/panel/noticias' },
    { name: 'Publicar Nuevo', icon: PlusCircle, path: '/panel/publicar' }, 
  ];

  return (
    // 🟢 font-mono aplica la fuente de terminal a todo el panel
    <div className="flex h-screen bg-black text-green-500 font-mono selection:bg-green-500/30">
      
      {/* 1️⃣ SIDEBAR TÁCTICO (Búnker Izquierdo) */}
      <aside className="w-64 bg-black border-r border-green-500/30 flex flex-col p-6 shadow-[4px_0_24px_rgba(0,255,0,0.05)] z-20">
        
        {/* Logo y Encabezado */}
        <div className="flex items-center gap-3 mb-12 border-b border-green-500/30 pb-6">
          <Terminal className="w-9 h-9 text-green-400 animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tighter text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
            Cyber<span className="text-green-200">Panel</span>
          </h1>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-grow space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-4 px-4 py-3 rounded text-green-600 hover:bg-green-900/30 hover:text-green-300 transition-all duration-200 active:scale-95 group border border-transparent hover:border-green-500/30"
            >
              <item.icon className="w-6 h-6 text-green-700 group-hover:text-green-400 transition-colors" />
              <span className="font-medium tracking-widest uppercase text-sm">{item.name}</span>
            </Link>
          ))}

          {/* 🛠️ CIRUGÍA 2: Inyección de Enlace Externo al Nodo de Inteligencia */}
          <a
            href="https://fuentes-noticias-proyect.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-4 py-3 rounded text-green-600 hover:bg-green-900/30 hover:text-green-300 transition-all duration-200 active:scale-95 group border border-transparent hover:border-green-500/30"
          >
            <Wrench className="w-6 h-6 text-green-700 group-hover:text-green-400 transition-colors" />
            <span className="font-medium tracking-widest uppercase text-sm">Nodo SIGINT</span>
          </a>
        </nav>

        {/* Sección de Usuario y Logout */}
        <div className="border-t border-green-500/30 pt-6 mt-6 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-green-500 bg-green-950 flex items-center justify-center text-green-400 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
               <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-green-400 drop-shadow-[0_0_5px_rgba(0,255,0,0.4)] tracking-wider truncate">Comandante</p>
              <p className="text-[10px] text-green-700 uppercase">Acceso: <span className="text-green-500 animate-pulse font-bold">ALPHA</span></p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded bg-red-950/20 text-red-500 hover:bg-red-900/40 hover:text-red-400 transition-all duration-200 active:scale-95 border border-red-900/50 hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(255,0,0,0.2)] uppercase tracking-widest text-sm mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold">Desconectar</span>
          </button>
        </div>
      </aside>

      {/* 2️⃣ ÁREA DE CONTENIDO DINÁMICO (Derecha) */}
      <main className="flex-1 overflow-y-auto bg-black relative">
        
        {/* 🕸️ Fondo de cuadrícula holográfica */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <header className="p-8 border-b border-green-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center shadow-[0_4px_24px_rgba(0,255,0,0.05)] relative">
            <h2 className="text-3xl font-bold tracking-widest text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.3)] uppercase">
              &gt; Consola_de_Mando
            </h2>
            <div className="text-sm text-green-700 flex items-center gap-2 tracking-widest uppercase">
              Estado_Sistema: 
              <span className="text-green-400 font-bold flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] relative">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-ping absolute"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block relative"></span>
                ONLINE
              </span>
            </div>
        </header>
        
        <div className="p-8 space-y-8 relative z-0">
          {children} 
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;