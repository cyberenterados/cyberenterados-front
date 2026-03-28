import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Terminal } from 'lucide-react';
import axios from 'axios';

const NoticiaDetalle = () => {
  const { id } = useParams(); // Capturamos el ID de la URL
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
    // 🟢 Etiqueta semántica <article> vital para Google News
    <article className="bg-gray-900 min-h-screen pt-8 pb-24 px-6 md:px-12 font-mono selection:bg-green-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Navegación de Retorno */}
        <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors uppercase tracking-widest text-sm mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          [ Volver_Al_Feed ]
        </Link>

        {/* 💵 ESPACIO AD-SENSE SUPERIOR (Bloque reservado para el futuro) */}
        <div className="w-full h-24 mb-8 border border-dashed border-green-900/50 bg-gray-800/30 flex items-center justify-center">
          <span className="text-green-700/50 text-xs uppercase tracking-widest hidden md:block">
            &lt;!-- ESPACIO_RESERVADO_ADSENSE_BANNER --&gt;
          </span>
        </div>

        {/* Encabezado del Artículo (SEO Optimizado) */}
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

        {/* Imagen Principal */}
        {noticia.imagenUrl && (
          <div className="w-full h-[400px] md:h-[500px] bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden mb-12 shadow-[0_0_15px_rgba(0,255,0,0.05)]">
            <img 
              src={noticia.imagenUrl} 
              alt={noticia.titulo} 
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
          </div>
        )}

        {/* 💵 ESPACIO AD-SENSE IN-ARTICLE (En el medio del contenido) */}
        <div className="w-full h-auto py-4 my-8 border-y border-dashed border-green-900/50 bg-gray-800/10 flex items-center justify-center">
            <span className="text-green-700/50 text-xs uppercase tracking-widest">
              &lt;!-- ESPACIO_RESERVADO_ADSENSE_IN_FEED --&gt;
            </span>
        </div>

        {/* Cuerpo del Artículo (Renderizado del texto) */}
        <div className="text-green-300 text-lg leading-relaxed whitespace-pre-wrap">
          {noticia.contenido}
        </div>

        {/* 💵 ESPACIO AD-SENSE INFERIOR */}
        <div className="w-full h-24 mt-16 border border-dashed border-green-900/50 bg-gray-800/30 flex items-center justify-center">
            <span className="text-green-700/50 text-xs uppercase tracking-widest hidden md:block">
              &lt;!-- ESPACIO_RESERVADO_ADSENSE_FOOTER --&gt;
            </span>
        </div>

      </div>
    </article>
  );
};

export default NoticiaDetalle;
