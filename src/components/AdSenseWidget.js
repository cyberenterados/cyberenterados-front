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