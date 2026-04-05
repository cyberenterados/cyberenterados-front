import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Sun, CloudRain, Wind, MapPin } from 'lucide-react';

const WeatherWidget = () => {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerClima = async (lat, lon) => {
      try {
        // 📡 API Open-Meteo: Sin registro, sin clave, 100% Hacker-friendly
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const res = await axios.get(url);
        setClima(res.data.current_weather);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error en sensor climático:", err);
        setLoading(false);
      }
    };

    // 📍 Geolocalización: Pedir coordenadas al civil
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => obtenerClima(pos.coords.latitude, pos.coords.longitude),
        () => obtenerClima(-34.6037, -58.3816) // Fallback: Buenos Aires Base
      );
    } else {
      obtenerClima(-34.6037, -58.3816); // Fallback: Buenos Aires Base
    }
  }, []);

  if (loading) return <div className="text-green-900 animate-pulse text-[10px] font-mono">[ ESCANEANDO_ATMÓSFERA... ]</div>;

  return (
    <div className="bg-gray-800/50 border border-green-500/20 p-4 rounded mb-8 font-mono flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <MapPin className="w-4 h-4 text-green-500" />
        <span className="text-green-500 text-xs md:text-sm tracking-widest">
          {'>'} UBICACIÓN_DETECTADA: <span className="text-green-300">SISTEMA_LOCAL</span>
        </span>
      </div>

      <div className="flex items-center gap-6 text-[10px] md:text-xs text-green-600/80 uppercase">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span>TEMP: {clima?.temperature}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-blue-400" />
          <span>VIENTO: {clima?.windspeed}KM/H</span>
        </div>
        <div className="hidden md:block border-l border-green-500/20 pl-4 italic">
           SISTEMA_OPERATIVO_V4.0
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;