import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Terminal, Link as LinkIcon, Youtube } from 'lucide-react';
import axios from 'axios';

const NoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const buscarNoticia = async () => {
      try {
        const respuesta = await axios.get('https://cyberenteradosnews.onrender.com/api/noticias');
        const noticiaEncontrada = respuesta.data.find(n => n._id === id);
        setNoticia(noticiaEncontrada);
        setCargando(false);
      } catch (error) {
        console.error("❌ Falla en la descarga del artículo:", error);
        setCargando(false);
      }
    };

    buscarNoticia();
  }, [id]);

  // 📡 Función táctica para extraer el ID del video de YouTube
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-green-500 font-mono bg-gray-900">
        <Terminal className="w-12 h-12 animate-pulse mb-4" />
        <p className="text-xl tracking-widest uppercase animate-pulse">&gt; Desencriptando_Archivo...</p>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-500 font-mono">
        <h2 className="text-3xl font-bold uppercase mb-4">&gt; 404_ARCHIVO_NO_ENCONTRADO</h2>
        <Link to="/" className="border-b border-green-500 hover:text-green-300 hover:border-green-300 uppercase tracking-widest">
          [ Regresar_Al_Radar ]
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-gray-900 min-h-screen pt-8 pb-24 px-4 font-mono selection:bg-green-500/30">
      
      {/* 🌐 CONTENEDOR MAESTRO DE 3 COLUMNAS */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ==========================================
            ⬅️ COLUMNA IZQUIERDA (ADSENSE LATERAL) 
            ========================================== */}
        <aside className="hidden lg:flex flex-col gap-6 lg:col-span-2">
          <div className="sticky top-24 w-full h-[600px] border border-dashed border-green-900/50 bg-gray-800/30 flex items-center justify-center p-4 text-center">
            <span className="text-green-700/50 text-xs uppercase tracking-widest leading-relaxed">
              &lt;!-- BANNER_LATERAL<br/>ADSENSE_IZQ --&gt;
            </span>
          </div>
        </aside>

        {/* ==========================================
            🎯 COLUMNA CENTRAL (NÚCLEO DE INFORMACIÓN) 
            ========================================== */}
        <main className="lg:col-span-8 w-full max-w-4xl mx-auto">
          
          <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors uppercase tracking-widest text-sm mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            [ Volver_Al_Feed ]
          </Link>

          {/* 💵 ESPACIO AD-SENSE SUPERIOR */}
          <div className="w-full h-24 mb-8 border border-dashed border-green-900/50 bg-gray-800/30 flex items-center justify-center">
            <span className="text-green-700/50 text-xs uppercase tracking-widest hidden md:block">
              &lt;!-- ESPACIO_RESERVADO_ADSENSE_BANNER --&gt;
            </span>
          </div>

          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-green-600/80 text-xs md:text-sm mb-6 uppercase tracking-widest">
              <span className="px-3 py-1 bg-green-950/50 border border-green-500/30 text-green-400 font-bold rounded flex items-center gap-2 shadow-[0_0_8px_rgba(0,255,0,0.1)]">
                <Tag className="w-3 h-3" /> {noticia.categoria || 'GENERAL'}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> <time dateTime={noticia.fecha}>{new Date(noticia.fecha).toLocaleDateString()}</time>
              </span>
              <span className="flex items-center gap-2 border-l border-green-500/30 pl-4">
                <User className="w-4 h-4" /> Autor: COMANDANTE
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-green-400 leading-tight drop-shadow-[0_0_5px_rgba(0,255,0,0.3)] mb-6">
              &gt; {noticia.titulo}
            </h1>
            
            <p className="text-xl text-green-500/80 italic border-l-2 border-green-500/50 pl-4 mb-8">
              {noticia.resumen}
            </p>
          </header>

          {/* Imagen Principal y Fuente */}
          {noticia.imagenUrl && (
            <div className="mb-12">
              <div className="w-full h-[400px] md:h-[500px] bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,255,0,0.05)]">
                <img 
                  src={noticia.imagenUrl} 
                  alt={noticia.titulo} 
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
              </div>
              
              {/* 🚀 NUEVO: Enlace de Fuente Original debajo de la imagen */}
              {noticia.fuenteUrl && (
                <div className="mt-3 flex items-center gap-2 text-green-500/80 text-xs md:text-sm font-mono uppercase tracking-widest border-l-2 border-green-500 pl-3">
                  <LinkIcon className="w-4 h-4" />
                  <span>&gt; FUENTE_CLASIFICADA:</span>
                  <a href={noticia.fuenteUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline underline-offset-4 decoration-green-500/50 truncate max-w-[200px] sm:max-w-md">
                    [ {noticia.fuenteUrl} ]
                  </a>
                </div>
              )}
            </div>
          )}

          {/* 💵 ESPACIO AD-SENSE IN-ARTICLE */}
          <div className="w-full h-auto py-4 my-8 border-y border-dashed border-green-900/50 bg-gray-800/10 flex items-center justify-center">
              <span className="text-green-700/50 text-xs uppercase tracking-widest">
                &lt;!-- ESPACIO_RESERVADO_ADSENSE_IN_FEED --&gt;
              </span>
          </div>

          {/* Cuerpo del Artículo */}
          <div className="text-green-300 text-lg leading-relaxed whitespace-pre-wrap mb-12">
            {noticia.contenido}
          </div>

          {/* 🚀 NUEVO: Reproductor de YouTube al final de la noticia */}
          {noticia.multimediaUrl && getYouTubeId(noticia.multimediaUrl) && (
            <div className="mb-12 w-full">
               <div className="flex items-center gap-2 text-green-500 text-sm font-bold font-mono uppercase tracking-widest mb-4 border-b border-green-500/30 pb-2">
                  <Youtube className="w-6 h-6 text-red-500 animate-pulse" />
                  <span>&gt; TRANSMISIÓN_MULTIMEDIA_ADJUNTA</span>
               </div>
               {/* aspect-video mantiene la proporción 16:9 perfecta en cualquier pantalla */}
               <div className="w-full aspect-video border border-green-500/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.15)] bg-black">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src={`https://www.youtube.com/embed/${getYouTubeId(noticia.multimediaUrl)}`} 
                   title="YouTube video player" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               </div>
            </div>
          )}

          {/* 💵 ESPACIO AD-SENSE INFERIOR */}
          <div className="w-full h-24 mt-8 border border-dashed border-green-900/50 bg-gray-800/30 flex items-center justify-center">
              <span className="text-green-700/50 text-xs uppercase tracking-widest hidden md:block">
                &lt;!-- ESPACIO_RESERVADO_ADSENSE_FOOTER --&gt;
              </span>
          </div>
        </main>

        {/* ==========================================
            ➡️ COLUMNA DERECHA (RADAR Y MÁS ADS) 
            ========================================== */}
        <aside className="lg:col-span-2 flex flex-col gap-6 mt-12 lg:mt-0">
           {/* Bloque para sugerencias futuras */}
           <div className="w-full border border-green-500/30 bg-gray-900 p-4 rounded-lg">
              <h3 className="text-green-500 text-xs uppercase tracking-widest mb-4 border-b border-green-500/30 pb-2">
                &gt; RADAR_DE_SUGERENCIAS
              </h3>
              <div className="space-y-4">
                 <p className="text-green-700/80 text-xs italic">[ Módulo en construcción. Aquí inyectaremos artículos relacionados. ]</p>
              </div>
           </div>

           {/* Banner AdSense Derecho */}
           <div className="sticky top-24 w-full h-[600px] border border-dashed border-green-900/50 bg-gray-800/30 flex items-center justify-center p-4 text-center">
            <span className="text-green-700/50 text-xs uppercase tracking-widest leading-relaxed">
              &lt;!-- BANNER_LATERAL<br/>ADSENSE_DER --&gt;
            </span>
          </div>
        </aside>

      </div>
    </article>
  );
};

export default NoticiaDetalle;
