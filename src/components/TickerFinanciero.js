import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 🚀 EXPORTACIÓN NOMINAL: Blindada contra errores de importación
export const TickerFinanciero = () => {
  const [precios, setPrecios] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const forzarConexion = async () => {
      try {
        const simbolos = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'ADAUSDT'];
        const peticiones = simbolos.map(s => axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${s}`));
        
        const respuestas = await Promise.all(peticiones);
        const datosFormateados = respuestas.map(r => ({
          symbol: r.data.symbol.replace('USDT', ''),
          price: parseFloat(r.data.lastPrice).toFixed(2),
          change: parseFloat(r.data.priceChangePercent).toFixed(2)
        }));

        setPrecios(datosFormateados);
        setError(false);
      } catch (err) {
        console.error("❌ FALLO TOTAL DE COMUNICACIONES FINANCIERAS:", err);
        setError(true);
      }
    };

    forzarConexion();
    const intervalo = setInterval(forzarConexion, 30000);
    return () => clearInterval(intervalo);
  }, []);

  if (error || precios.length === 0) {
    return (
      <div className="bg-black text-red-900 border-b border-red-900/30 text-[10px] font-mono py-1 px-4 text-center uppercase tracking-widest">
        <span className="animate-pulse">!_ ERROR_DE_ENLACE: REINTENTANDO_CONEXIÓN_SATELITAL...</span>
      </div>
    );
  }

  return (
    <div className="bg-black border-b border-green-500/30 text-green-500 text-[10px] md:text-xs font-mono py-1 overflow-hidden whitespace-nowrap flex items-center relative">
      <style>
        {`
          @keyframes ticker-scroll {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          .animate-ticker {
            display: inline-block;
            white-space: nowrap;
            animation: ticker-scroll 25s linear infinite;
          }
        `}
      </style>

      <div className="bg-black z-10 px-4 font-bold text-green-400 uppercase tracking-widest border-r border-green-500/50 absolute left-0 shadow-[10px_0_15px_-3px_rgba(0,0,0,1)]">
        &gt;_ CRÉDITOS_ACTUALES:
      </div>

      <div className="animate-ticker pl-[150px]">
        {precios.map((p, i) => (
          <span key={i} className="mx-6 uppercase tracking-widest">
            [ {p.symbol}: ${p.price} 
            <span className={p.change >= 0 ? ' text-green-400' : ' text-red-500'}>
              {p.change >= 0 ? ' ↑' : ' ↓'}{Math.abs(p.change)}%
            </span> ]
          </span>
        ))}
      </div>
    </div>
  );
};