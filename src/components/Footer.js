import React from 'react';
import { Terminal, Youtube, Twitch, Github, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-500/30 pt-12 pb-8 font-mono selection:bg-green-500/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-green-900/50 pb-8">

          {/* Marca y Misión */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-green-500" />
              <span className="text-xl font-bold text-green-500 tracking-tight uppercase">
                Cyber<span className="text-green-300">Enterados</span>
              </span>
            </div>
            <p className="text-green-600/80 text-sm leading-relaxed">
              Red pública de información tecnológica y cibernética. Transmitiendo conocimiento encriptado para la resistencia digital y monetización estratégica.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h3 className="text-green-400 font-bold uppercase tracking-widest text-sm">&gt; Enlaces_Tácticos</h3>
            <ul className="space-y-2 text-green-600/80 text-sm">
              <li>
                <Link to="/" className="hover:text-green-400 transition-colors before:content-['-_']">Feed_Principal</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-green-400 transition-colors before:content-['-_']">Acceso_Root (Comandante)</Link>
              </li>
            </ul>
          </div>

          {/* Redes y Ubicación */}
          <div className="space-y-4">
            <h3 className="text-green-400 font-bold uppercase tracking-widest text-sm">&gt; Frecuencias_Abiertas</h3>
            <div className="flex gap-4">
              {/* Canal de YouTube */}
              <a href="https://youtube.com/@ManuExplora" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="YouTube: ManuExplora">
                <Youtube className="w-5 h-5" />
              </a>
              {/* Canal de Twitch */}
              <a href="https://twitch.tv/steelfire_9239" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="Twitch: @steelfire_9239">
                <Twitch className="w-5 h-5" />
              </a>
              {/* Repositorio Github (Opcional) */}
              <a href="https://github.com/cyberenterados" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                <Github className="w-5 h-5" />
              </a>
            </div>
            
            {/* Telemetría Falsa (Ubicación real) para dar ambiente */}
            <div className="flex items-center gap-2 text-green-700 text-xs uppercase tracking-widest mt-4">
              <MapPin className="w-4 h-4 animate-pulse" /> Servidor_Base: Buenos Aires, AR
            </div>
          </div>

        </div>

        {/* Copyright y Firma */}
        <div className="flex flex-col md:flex-row justify-between items-center text-green-700 text-xs uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} CyberEnterados News. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-2">
            Sistema Operativo por <span className="text-green-500 font-bold">Comandante & Bot</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;