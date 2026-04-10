import React from 'react';
import { Zap } from 'lucide-react';

const AdSenseWidget = ({ type = "banner" }) => {
  // 🛑 SWITCH DE CONTROL MAESTRO
  // true = Muestra el diseño Cyberpunk para pruebas.
  // false = Ejecuta los scripts reales de Google AdSense (Fase 6).
  const isDevMode = true;

  // 🎨 Camuflaje Táctico Base
  const baseClasses = "w-full border border-dashed border-green-500/30 bg-gray-800/20 flex flex-col items-center justify-center overflow-hidden relative group transition-all duration-300";

  // 📐 Calibración de dimensiones según la munición solicitada
  let heightClass = "h-24"; // Munición por defecto (Banner Horizontal Superior/Inferior)
  let label = "BANNER_HORIZONTAL";

  if (type === "sidebar") {
    heightClass = "h-[600px]";
    label = "BANNER_LATERAL_VERTICAL";
  } else if (type === "in-article") {
    heightClass = "h-auto py-8 my-8"; // Munición adaptable que va entre los textos
    label = "IN_ARTICLE_AD";
  }

  // 🚀 INYECCIÓN QUIRÚRGICA: MUNICIÓN CAMUFLADA (IN-FEED CARD)
  if (type === "in-feed-card") {
    if (isDevMode) {
      return (
        <article className="bg-gray-800/40 border border-dashed border-green-500/50 rounded-lg overflow-hidden relative group flex flex-col h-full min-h-[400px] shadow-[inset_0_0_20px_rgba(0,255,0,0.05)]">
           <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
           
           {/* Etiqueta de Aviso Legal Obligatoria */}
           <div className="absolute top-4 left-4 z-10">
             <span className="px-3 py-1 bg-black/90 border border-green-500/50 text-green-400/80 text-[9px] font-bold uppercase tracking-widest rounded">
               CONTENIDO_PATROCINADO
             </span>
           </div>
           
           <div className="flex-grow flex flex-col items-center justify-center p-6 text-center z-10">
              <Zap className="w-12 h-12 text-green-700/40 mb-4 group-hover:text-green-500 transition-colors animate-pulse" />
              <span className="text-green-500/60 text-sm uppercase tracking-widest mb-2 font-bold">
                &lt;!-- ESPACIO_IN_FEED --&gt;
              </span>
              <p className="text-green-700/50 text-xs mt-2">Simulación de Anuncio Nativo Camuflado</p>
           </div>
           
           {/* Telemetría de esquina */}
           <div className="absolute bottom-1 right-2 text-[8px] text-green-900 font-mono uppercase tracking-widest">
             SYS.MODO_SIMULACIÓN
           </div>
        </article>
      );
    }
    // Renderizado Real (Fase 6)
    return <div className="w-full h-full min-h-[400px]"> {/* Aquí inyectaremos la etiqueta <ins> de Google AdSense */} </div>;
  }

  // === RENDERIZADO DE SIMULACIÓN (BÚNKER) ===
  if (isDevMode) {
    return (
      <div className={`${baseClasses} ${heightClass}`}>
        {/* Efecto de escaneo de radar de fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
        
        <Zap className="w-6 h-6 text-green-700/50 mb-2 group-hover:text-green-500 transition-colors animate-pulse" />
        
        <span className="text-green-700/60 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-center px-4 relative z-10">
          &lt;!-- ESPACIO_ADSENSE --&gt;
          <br/>
          [{label}]
        </span>
        
        {/* Telemetría de esquina */}
        <div className="absolute bottom-1 right-2 text-[8px] text-green-900 font-mono uppercase tracking-widest">
          SYS.MODO_SIMULACIÓN
        </div>
      </div>
    );
  }

  // === RENDERIZADO DE PRODUCCIÓN (Fase 6) ===
  return (
    <div className={`w-full overflow-hidden flex justify-center ${type === 'in-article' ? 'my-8' : ''}`}>
        {/* Aquí inyectaremos la etiqueta <ins> de Google AdSense 
          cuando tengamos la autorización del comando central.
        */}
    </div>
  );
};

export default AdSenseWidget;