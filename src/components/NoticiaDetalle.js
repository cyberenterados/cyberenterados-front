import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Terminal, LinkIcon, Youtube } from 'lucide-react';
import axios from 'axios';
import { SidebarRSS } from './SidebarRSS';
import AdSenseWidget from './AdSenseWidget';
// 🚀 INYECTADO: El Francotirador SEO
import SEO from './SEO';

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
    window.scrollTo(0, 0);
  }, [id]);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-green-500 font-mono bg-gray-900 w-full overflow-hidden">
        <Terminal className="w-12 h-12 animate-pulse mb-4" />
        <p className="text-xl tracking-widest uppercase animate-pulse text-center">&gt; Desencriptando_Archivo...</p>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-500 font-mono w-full overflow-hidden px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">&gt; 404_ARCHIVO_NO_ENCONTRADO</h2>
        <Link to="/" className="border-b border-green-500 hover:text-green-300 hover:border-green-300 uppercase tracking-widest">
          [ Regresar_Al_Radar ]
        </Link>
      </div>
    );
  }

  return (
    // 📡 Fragmento Maestro para envolver SEO y el contenido visual
    <>
      {/* 🚀 INYECCIÓN TÁCTICA: Balizas dinámicas cargadas con la información de la noticia */}
      <SEO 
        title={`> ${noticia.titulo} | CyberEnterados`}
        description={noticia.resumen}
        image={noticia.imagenUrl}
        type="article"
        url={window.location.href}
      />

      <article className="bg-gray-900 min-h-screen pt-8 pb-24 w-full overflow-x-clip font-mono selection:bg-green-500/30">      
        <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 px-4 sm:px-6 md:px-8">
          
          {/* ==========================================
              ⬅️ COLUMNA IZQUIERDA (ADSENSE LATERAL) 
              ========================================== */}
          <aside className="hidden lg:flex flex-col gap-6 lg:col-span-2">
            {/* 🎯 Componente AdSense Inyectado */}
            <div className="sticky top-24 w-full">
              <AdSenseWidget type="sidebar" />
            </div>
          </aside>

          {/* ==========================================
              🎯 COLUMNA CENTRAL (NÚCLEO DE INFORMACIÓN) 
              ========================================== */}
          <main className="lg:col-span-7 w-full flex flex-col">
            
            <div className="w-full mb-8">
              <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors uppercase tracking-widest text-sm group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                [ Volver_Al_Feed ]
              </Link>
            </div>

            {/* 💵 ESPACIO AD-SENSE SUPERIOR */}
            <div className="mb-8 w-full">
              <AdSenseWidget type="banner" />
            </div>

            <header className="mb-8 w-full">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-green-600/80 text-xs md:text-sm mb-6 uppercase tracking-widest">
                <span className="px-3 py-1 bg-green-950/50 border border-green-500/30 text-green-400 font-bold rounded flex items-center gap-2 shadow-[0_0_8px_rgba(0,255,0,0.1)]">
                  <Tag className="w-3 h-3" /> {noticia.categoria || 'GENERAL'}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> <time dateTime={noticia.fecha}>{new Date(noticia.fecha).toLocaleDateString()}</time>
                </span>
                <span className="flex items-center gap-2 border-l border-green-500/30 pl-3 md:pl-4">
                  <User className="w-4 h-4" /> COMANDANTE
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-400 leading-tight drop-shadow-[0_0_5px_rgba(0,255,0,0.3)] mb-6 break-words">
                &gt; {noticia.titulo}
              </h1>
              
              <p className="text-lg md:text-xl text-green-500/80 italic border-l-2 border-green-500/50 pl-4 mb-8 break-words">
                {noticia.resumen}
              </p>
            </header>

            {/* Imagen Principal */}
            {noticia.imagenUrl && (
              <div className="mb-12 w-full flex flex-col items-center">
                <div className="w-full bg-black border border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,255,0,0.05)] flex justify-center items-center">
                  <img 
                    src={noticia.imagenUrl} 
                    alt={noticia.titulo} 
                    className="w-full h-auto max-h-[600px] object-contain mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                </div>
                
                {noticia.fuenteUrl && (
                  <div className="mt-3 w-full flex flex-col sm:flex-row sm:items-center gap-2 text-green-500/80 text-xs md:text-sm font-mono uppercase tracking-widest border-l-2 border-green-500 pl-3 break-all sm:break-normal">
                    <div className="flex items-center gap-2 shrink-0">
                      <LinkIcon className="w-4 h-4" />
                      <span>&gt; FUENTE_CLASIFICADA:</span>
                    </div>
                    <a href={noticia.fuenteUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline underline-offset-4 decoration-green-500/50 truncate w-full">
                      [ {noticia.fuenteUrl} ]
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* 💵 ESPACIO AD-SENSE IN-ARTICLE */}
            <AdSenseWidget type="in-article" />

            {/* Cuerpo del Artículo */}
            <div className="text-green-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap mb-12 w-full break-words">
              {noticia.contenido}
            </div>

            {/* Reproductor de YouTube */}
            {noticia.multimediaUrl && getYouTubeId(noticia.multimediaUrl) && (
              <div className="mb-12 w-full">
                 <div className="flex items-center gap-2 text-green-500 text-sm font-bold font-mono uppercase tracking-widest mb-4 border-b border-green-500/30 pb-2">
                    <Youtube className="w-5 h-5 md:w-6 md:h-6 text-red-500 animate-pulse" />
                    <span>&gt; TRANSMISIÓN_MULTIMEDIA</span>
                 </div>
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
            <div className="mt-8 w-full">
              <AdSenseWidget type="banner" />
            </div>
          </main>

          {/* ==========================================
              ➡️ COLUMNA DERECHA (RADAR RSS Y MÁS ADS) 
              ========================================== */}
          <aside className="lg:col-span-3 flex flex-col gap-8 mt-12 lg:mt-0 w-full h-full">
             
             {/* 1. Radar Normal: El usuario lo lee y al bajar se va hacia arriba naturalmente */}
             <SidebarRSS />

             {/* 2. Banner Táctico: Se queda anclado a la pantalla mientras el civil lee el largo artículo */}
             <div className="sticky top-24 w-full">
               <AdSenseWidget type="sidebar" />
             </div>

          </aside>

        </div>
      </article>
    </>
  );
};

export default NoticiaDetalle;