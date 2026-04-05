import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radio, ExternalLink, Zap, ShieldCheck, Rocket, Brain, Monitor, AlertTriangle } from 'lucide-react';

export const SidebarRSS = () => {
  const [titulares, setTitulares] = useState([]);
  const [loading, setLoading] = useState(true);

  const fuentes = [
    { nombre: 'NASA_ESP', url: 'https://www.nasa.gov/rss/dyn/enespanol.rss', icon: <Rocket className="w-3 h-3" /> },
    { nombre: 'CISA_GOV', url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml', icon: <ShieldCheck className="w-3 h-3" /> },
    { nombre: 'MSFT_AI', url: 'https://blogs.microsoft.com/ai/feed/', icon: <Brain className="w-3 h-3" /> },
    { nombre: 'XATAKA', url: 'https://www.xataka.com/feed/full', icon: <Monitor className="w-3 h-3" /> },
    { nombre: 'WIRED_ES', url: 'https://es.wired.com/feed/rss', icon: <Zap className="w-3 h-3" /> }
  ];

  useEffect(() => {
    const interceptarSenales = async () => {
      setLoading(true);
      const datosConsolidados = [];

      // 🛡️ PROTOCOLO DE REDUNDANCIA: Procesamos cada señal individualmente
      for (const f of fuentes) {
        try {
          const res = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(f.url)}`);
          if (res.data && res.data.items) {
            const items = res.data.items.slice(0, 2).map(item => ({
              ...item,
              facción: f.nombre,
              icono: f.icon
            }));
            datosConsolidados.push(...items);
          }
        } catch (err) {
          console.warn(`⚠️ Señal interrumpida en sector ${f.nombre}:`, err.message);
          // Si una señal falla, el bucle continúa con la siguiente
        }
      }

      setTitulares(datosConsolidados);
      setLoading(false);
    };

    interceptarSenales();
  }, []);

  return (
    <aside className="bg-black/40 border border-green-500/20 p-6 rounded-lg font-mono h-fit sticky top-24 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6 border-b border-green-500/30 pb-4">
        <Radio className="w-5 h-5 text-green-500 animate-pulse" />
        <h2 className="text-sm font-bold text-green-500 uppercase tracking-[0.2em]">
          Inteligencia_Perimetral
        </h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-14 bg-green-900/10 animate-pulse rounded border border-green-900/10" />
          ))}
        </div>
      ) : titulares.length > 0 ? (
        <div className="space-y-6">
          {titulares.map((noticia, index) => (
            <div key={index} className="group border-l-2 border-green-950 hover:border-green-400 pl-4 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-700 group-hover:text-green-400 transition-colors">
                  {noticia.icono}
                </span>
                <span className="text-[9px] text-green-800 font-bold tracking-widest uppercase">
                  {noticia.facción}
                </span>
              </div>
              <a 
                href={noticia.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-green-600/90 group-hover:text-green-300 leading-tight block transition-colors"
              >
                {noticia.title}
                <ExternalLink className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-100" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        // 📡 MODO SUPERVIVENCIA: Si todas las APIs fallan
        <div className="text-center py-6">
          <AlertTriangle className="w-8 h-8 text-red-900 mx-auto mb-2 animate-bounce" />
          <p className="text-[10px] text-red-800 uppercase tracking-widest">
            !_ INTERFERENCIA_TOTAL: SATÉLITES_FUERA_DE_RANGO
          </p>
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-green-500/10 text-center">
        <p className="text-[8px] text-green-900 uppercase tracking-[0.3em] font-black">
          NODO_DE_DATOS_V4.2_FIXED
        </p>
      </div>
    </aside>
  );
};