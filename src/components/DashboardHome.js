import React, { useState, useEffect } from 'react';
import { Activity, Database, Clock, Cpu } from 'lucide-react';
import axios from 'axios';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalNoticias: 0,
    ultimaTransmision: 'Escaneando...',
    cargando: true
  });

  useEffect(() => {
    const escanearBaseDatos = async () => {
      try {
        const respuesta = await axios.get('https://cyberenteradosnews.onrender.com/api/noticias');
        const noticias = respuesta.data;
        
        setStats({
          totalNoticias: noticias.length,
          ultimaTransmision: noticias.length > 0 ? new Date(noticias[0].fecha).toLocaleDateString() : 'SIN DATOS',
          cargando: false
        });
      } catch (error) {
        console.error("❌ Falla en la telemetría:", error);
        setStats(prev => ({ ...prev, ultimaTransmision: 'ERROR DE RED', cargando: false }));
      }
    };

    escanearBaseDatos();
  }, []);

  return (
    <div className="space-y-6 font-mono">
      
      {/* 🟢 Mensaje de Bienvenida */}
      <div className="bg-green-950/20 border border-green-500/30 p-6 rounded relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Cpu className="w-24 h-24 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-green-400 drop-shadow-[0_0_5px_rgba(0,255,0,0.5)] uppercase tracking-widest mb-2">
          &gt; INICIO_DE_SESION_EXITOSO
        </h2>
        <p className="text-green-600/80">
          Bienvenido al búnker, Comandante. Los sistemas de telemetría están en línea. Marie está operando a máxima capacidad y conectada al clúster de Atlas.
        </p>
      </div>

      {/* 📊 Tarjetas de Telemetría */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Widget 1: Total de Noticias */}
        <div className="bg-black border border-green-500/30 p-6 rounded shadow-[0_0_15px_rgba(0,255,0,0.05)] hover:border-green-400/50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-700 text-xs tracking-widest uppercase mb-1">Total_Archivos</p>
              <h3 className="text-4xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.4)]">
                {stats.cargando ? '--' : stats.totalNoticias}
              </h3>
            </div>
            <div className="p-3 bg-green-950/30 rounded border border-green-900 group-hover:bg-green-900/50 transition-colors">
              <Database className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-green-600/60 uppercase">&gt; Registros en Atlas DB</p>
        </div>

        {/* Widget 2: Última Transmisión */}
        <div className="bg-black border border-green-500/30 p-6 rounded shadow-[0_0_15px_rgba(0,255,0,0.05)] hover:border-green-400/50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-700 text-xs tracking-widest uppercase mb-1">Ultima_Actualizacion</p>
              <h3 className="text-xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.4)] mt-2">
                {stats.ultimaTransmision}
              </h3>
            </div>
            <div className="p-3 bg-green-950/30 rounded border border-green-900 group-hover:bg-green-900/50 transition-colors">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-green-600/60 uppercase">&gt; Sincronizado_con_Nube</p>
        </div>

        {/* Widget 3: Estado del Motor */}
        <div className="bg-black border border-green-500/30 p-6 rounded shadow-[0_0_15px_rgba(0,255,0,0.05)] hover:border-green-400/50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-700 text-xs tracking-widest uppercase mb-1">Estado_Marie_API</p>
              <h3 className="text-xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.4)] mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                OPTIMO
              </h3>
            </div>
            <div className="p-3 bg-green-950/30 rounded border border-green-900 group-hover:bg-green-900/50 transition-colors">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-green-600/60 uppercase">&gt; Latencia_Estable</p>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;