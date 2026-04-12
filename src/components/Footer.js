import React from 'react';
import { Terminal, Youtube, Twitter, Instagram, Facebook, Film, MapPin } from 'lucide-react';
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
              🌐 Bienvenidos a CyberEnterados News 📰✨ Tu fuente de información para lo más comentado y asombroso del mundo digital y nuestra actualidad. 🚀 Desde tecnología hasta cultura, ¡cubriendo todo lo que necesitas saber para estar al día! 🌟
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
                <Link to="/login" className="hover:text-green-400 transition-colors before:content-['-_']">Root</Link>
              </li>
              {/* 🚀 NODO DE IDENTIDAD EXTERNO INYECTADO */}
              <li>
                <a 
                  href="https://cyberenterados.github.io/ManuExplora-Dossier_identidad/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-green-400 transition-colors font-bold"
                >
                  &gt;_ EXPEDIENTE_REDACTOR
                </a>
              </li>
            </ul>
          </div>

          {/* Redes y Ubicación */}
          <div className="space-y-4">
            <h3 className="text-green-400 font-bold uppercase tracking-widest text-sm">&gt; Frecuencias_Abiertas</h3>
            <div className="flex flex-wrap gap-4">
              
              {/* 🐦 Canal de X (Twitter) */}
              <a href="https://x.com/cyberenterados" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="X (Twitter): CyberEnterados">
                <Twitter className="w-5 h-5" />
              </a>
              
              {/* 📸 Canal de Instagram */}
              <a href="https://www.instagram.com/cyberenterados/?hl=es" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="Instagram: CyberEnterados">
                <Instagram className="w-5 h-5" />
              </a>
              
              {/* 📘 Canal de Facebook */}
              <a href="https://www.facebook.com/cyberenterados?locale=es_LA" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="Facebook: CyberEnterados">
                <Facebook className="w-5 h-5" />
              </a>

              {/* 📺 Canal de YouTube */}
              <a href="https://www.youtube.com/@cyberenterados" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="YouTube: CyberEnterados">
                <Youtube className="w-5 h-5" />
              </a>
              
              {/* 📱 Canal de TikTok */}
              <a href="https://www.tiktok.com/@cyberenteradosnews" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="TikTok: CyberEnteradosNews">
                <Film className="w-5 h-5" />
              </a>

              {/* 🚀 [ PUERTO DE EXPANSIÓN RESERVADO ] 
                  Descomentar el siguiente bloque para inyectar una nueva red en el futuro:
              */}
              {/* <a href="URL_NUEVA_RED" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-950/30 rounded border border-green-900 hover:border-green-400 hover:text-green-400 transition-all shadow-[0_0_0_rgba(0,255,0,0)] hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]" title="Nueva Red Táctica">
                <Terminal className="w-5 h-5" />
              </a> 
              */}

            </div>
            
            {/* Telemetría Falsa (Ubicación real) */}
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