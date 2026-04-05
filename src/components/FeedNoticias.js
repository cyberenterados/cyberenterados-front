import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Terminal } from 'lucide-react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
// 🚀 INYECTADO: Sensor Atmosférico
import WeatherWidget from './WeatherWidget';

const FeedNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🔍 NUEVO: Sensor de URL y Procesador de Filtrado
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoriaFiltro = queryParams.get('categoria');

// 🧠 LÓGICA DE FILTRADO TÁCTICO (Blindado contra tildes)
  const normalizarTexto = (texto) => 
    texto ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : "";

  const noticiasFiltradas = categoriaFiltro 
    ? noticias.filter(n => normalizarTexto(n.categoria) === normalizarTexto(categoriaFiltro))
    : noticias;

  // 📡 Conectamos al servidor público de Marie
  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const respuesta = await axios.get('https://cyberenteradosnews.onrender.com/api/noticias');
        setNoticias(respuesta.data);
        setCargando(false);
      } catch (error) {
        console.error("❌ Error de conexión pública:", error);
        setCargando(false);
      }
    };

    obtenerNoticias();
  }, []);

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-green-500 font-mono bg-gray-900">
        <Terminal className="w-12 h-12 animate-pulse mb-4" />
        <p className="text-xl tracking-widest uppercase animate-pulse">&gt; Sintonizando Frecuencia Pública...</p>
      </div>
    );
  }

  return (
    // 🟢 Fondo más claro (gray-900) y fuente monoespaciada estricta
    <div className="bg-gray-900 min-h-screen pt-12 pb-24 px-6 md:px-12 font-mono selection:bg-green-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado del Feed Público */}
        <div className="mb-16 border-b border-green-500/30 pb-8 flex items-center gap-4">
          
          <div>
              <h1 className="text-4xl md:text-5xl font-bold text-green-500 tracking-tight uppercase drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]">
                Cyber<span className="text-green-300">Enterados</span>
              </h1>
              <p className="text-lg text-green-600/80 mt-2 uppercase tracking-widest">
                &gt; Red_Pública_de_Información
              </p>
          </div>
        </div>

        {/* 🛰️ FASE 4: Sensor Meteorológico de Proximidad */}
        <WeatherWidget />

        {/* Cuadrícula de Noticias (Grid) - SINTAXIS CORREGIDA AQUÍ */}
        {noticiasFiltradas.length === 0 ? (
          <div className="text-center text-green-600/50 py-20 border border-dashed border-green-500/30 rounded bg-gray-800/50">
            <p className="text-xl">&gt; No hay transmisiones activas en el radar público.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticiasFiltradas.map((noticia) => (
              <article key={noticia._id} className="bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden hover:border-green-400 hover:shadow-[0_0_20px_rgba(0,255,0,0.15)] transition-all duration-300 group flex flex-col relative">
                
                {/* Imagen de Portada */}
                <div className="h-56 overflow-hidden relative bg-gray-900 border-b border-green-500/30">
                  {noticia.imagenUrl ? (
                    // Efecto visual: la imagen se ve un poco "hackeada" (luminosity) y toma color al pasar el mouse
                    <img 
                      src={noticia.imagenUrl} 
                      alt={noticia.titulo} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                    />
                  ) : (
                    <div className="w-full h-full bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] flex items-center justify-center">
                      <Terminal className="w-12 h-12 text-green-900" />
                    </div>
                  )}
                  {/* Badge de Categoría */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gray-900/90 border border-green-500/50 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                      {noticia.categoria || 'GENERAL'}
                    </span>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-green-700 text-xs mb-4 uppercase tracking-widest">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(noticia.fecha).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-green-400 mb-3 leading-tight group-hover:text-green-300 transition-colors uppercase">
                    &gt; {noticia.titulo}
                  </h3>
                  
                  <p className="text-green-600/80 line-clamp-3 mb-6 flex-grow text-sm">
                    {noticia.resumen}
                  </p>
                  
                  {/* Botón de "Leer Más" */}
                  <Link 
                    to={`/noticia/${noticia._id}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-500 font-bold hover:text-green-300 transition-colors mt-auto w-max uppercase tracking-widest text-sm border-b border-transparent hover:border-green-400 pb-1"
                  >
                    [ Leer_Reporte ] <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default FeedNoticias;