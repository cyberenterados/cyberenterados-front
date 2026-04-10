import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Terminal, Save, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Youtube, Clock, User, Tag } from 'lucide-react';
import axios from 'axios';

const EditarNoticia = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  
  const [formData, setFormData] = useState({
    titulo: '',
    resumen: '',
    contenido: '',
    categoria: '',
    fuenteUrl: '',
    multimediaUrl: ''
  });
  
  const [imagenActual, setImagenActual] = useState('');
  const [nuevasImagenes, setNuevasImagenes] = useState([]);

  // 🚀 NUEVOS ESTADOS TÁCTICOS (V3.1 - Simulador)
  const [vistaActiva, setVistaActiva] = useState('radar'); // 'radar' o 'detalle'
  const [previewImg, setPreviewImg] = useState(null);

  // 📡 Función para extraer video de YouTube en el simulador
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // 👁️ Motor del Simulador Holográfico de Imagen
  useEffect(() => {
    // Si hay una imagen recién cargada en el formulario, mostrarla
    if (nuevasImagenes.length > 0) {
      const objectUrl = URL.createObjectURL(nuevasImagenes[0]);
      setPreviewImg(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } 
    // Si no hay imagen nueva, pero existe una en la base de datos, mostrar esa
    else if (imagenActual) {
      setPreviewImg(imagenActual);
    } 
    // Si no hay ninguna, vaciar
    else {
      setPreviewImg(null);
    }
  }, [nuevasImagenes, imagenActual]);

  // 📡 RADAR: Buscar los datos de la noticia al cargar la pantalla
  useEffect(() => {
    const buscarNoticia = async () => {
      try {
        const respuesta = await axios.get('https://cyberenteradosnews.onrender.com/api/noticias');
        const noticiaEncontrada = respuesta.data.find(n => n._id === id);
        
        if (noticiaEncontrada) {
          setFormData({
            titulo: noticiaEncontrada.titulo,
            resumen: noticiaEncontrada.resumen,
            contenido: noticiaEncontrada.contenido,
            categoria: noticiaEncontrada.categoria || 'GENERAL',
            fuenteUrl: noticiaEncontrada.fuenteUrl || '',
            multimediaUrl: noticiaEncontrada.multimediaUrl || ''
          });
          setImagenActual(noticiaEncontrada.imagenUrl);
        } else {
          alert('❌ Registro no encontrado en el radar.');
          navigate('/panel/noticias');
        }
        setCargando(false);
      } catch (error) {
        console.error("❌ Falla de telemetría:", error);
        setCargando(false);
      }
    };

    buscarNoticia();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNuevasImagenes(Array.from(e.target.files));
    }
  };

  // ✏️ PROTOCOLO DE MODIFICACIÓN (Ejecutar PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('resumen', formData.resumen);
    data.append('contenido', formData.contenido);
    data.append('categoria', formData.categoria);
    
    if (formData.fuenteUrl) data.append('fuenteUrl', formData.fuenteUrl);
    if (formData.multimediaUrl) data.append('multimediaUrl', formData.multimediaUrl);
    
    if (nuevasImagenes.length > 0) {
      data.append('imagen', nuevasImagenes[0]); 
    }

    try {
      await axios.put(`https://cyberenteradosnews.onrender.com/api/noticias/${id}`, data, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('✅ ¡COORDENADAS ACTUALIZADAS CON ÉXITO!');
      navigate('/panel/noticias'); 
    } catch (error) {
      console.error('❌ Error al modificar:', error);
      alert('❌ Falla en la sobreescritura del archivo.');
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return <div className="bg-gray-950 text-yellow-500 animate-pulse font-mono flex h-screen items-center justify-center text-xl uppercase tracking-widest">&gt; Desencriptando archivo seleccionado...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8 font-mono">
      
      {/* 🟢 Botón de Retirada y Encabezado Global */}
      <div className="flex items-center gap-4 mb-8 border-b border-yellow-500/30 pb-4 max-w-[1600px] mx-auto">
        <button 
          onClick={() => navigate('/panel/noticias')}
          className="p-2 bg-yellow-950/30 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded transition-colors border border-yellow-500/50"
          title="Volver al Arsenal"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <Terminal className="w-8 h-8 text-yellow-500 animate-pulse" />
        <h2 className="text-2xl font-bold text-yellow-500 tracking-widest uppercase">
          &gt; MODIFICAR_REGISTRO.exe
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1600px] mx-auto">
        
        {/* ==========================================
            ⬅️ HEMISFERIO IZQUIERDO: CONSOLA DE EDICIÓN 
            ========================================== */}
        <div className="bg-black border border-yellow-500/30 p-6 md:p-8 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="mb-4 text-yellow-500 font-bold uppercase tracking-widest border-b border-yellow-500/30 pb-2">
                [ PARÁMETROS_DE_SOBREESCRITURA ]
            </div>

            {/* Título y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-green-600 text-sm uppercase tracking-widest">&gt; Nuevo Titulo</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required spellCheck={true}
                  className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-green-400 p-3 rounded transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-green-600 text-sm uppercase tracking-widest">&gt; Categoría</label>
                <select name="categoria" value={formData.categoria} onChange={handleChange}
                  className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 outline-none text-green-400 p-3 rounded transition-all">
                  <option value="Tecnología">Tecnología</option>
                  <option value="Videojuegos">Videojuegos</option>
                  <option value="Ciberseguridad">Ciberseguridad</option>
                  <option value="IA">Inteligencia Artificial</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            {/* Resumen */}
            <div className="space-y-2">
              <label className="text-green-600 text-sm uppercase tracking-widest">&gt; Resumen_Actualizado</label>
              <textarea name="resumen" value={formData.resumen} onChange={handleChange} required rows="2" spellCheck={true}
                className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-green-400 p-3 rounded transition-all"></textarea>
            </div>

            {/* Contenido Completo */}
            <div className="space-y-2">
              <label className="text-green-600 text-sm uppercase tracking-widest">&gt; Contenido_Principal</label>
              <textarea name="contenido" value={formData.contenido} onChange={handleChange} required rows="10" spellCheck={true}
                className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-green-400 p-3 rounded transition-all"></textarea>
            </div>

            {/* Campos Multimedia */}
            <div className="p-4 border border-dashed border-yellow-900/50 bg-green-950/5 space-y-4 rounded">
              <h3 className="text-yellow-600/80 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Enlaces_Externos_Y_Multimedia
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-green-600/80 text-xs uppercase flex items-center gap-2">
                    <LinkIcon className="w-3 h-3" /> URL_Fuente_Original (Opcional)
                  </label>
                  <input type="url" name="fuenteUrl" value={formData.fuenteUrl} onChange={handleChange}
                    className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 outline-none text-green-400 p-2 rounded text-sm transition-all"
                    placeholder="https://nasa.gov/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-green-600/80 text-xs uppercase flex items-center gap-2">
                    <Youtube className="w-3 h-3" /> URL_YouTube_o_Redes (Opcional)
                  </label>
                  <input type="url" name="multimediaUrl" value={formData.multimediaUrl} onChange={handleChange}
                    className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 outline-none text-green-400 p-2 rounded text-sm transition-all"
                    placeholder="https://youtube.com/watch?v=..." />
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-green-900/50">
                <div className="flex items-center gap-2 text-green-600 text-sm uppercase tracking-widest mb-2">
                  <ImageIcon className="w-4 h-4" />
                  <label>&gt; Cargar_Imágenes_Nuevas (Sobreescribe las actuales)</label>
                </div>
                {imagenActual && nuevasImagenes.length === 0 && (
                  <div className="text-xs text-green-700 mb-2">
                    [ Imagen actual detectada en DB. Suba nuevas para reemplazarla. ]
                  </div>
                )}
                <input type="file" multiple name="imagen" onChange={handleFileChange} accept="image/*"
                  className="w-full text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:uppercase file:bg-yellow-900/30 file:text-yellow-500 hover:file:bg-yellow-900/50 file:transition-colors file:cursor-pointer text-sm" />
              </div>
            </div>

            {/* Botón de Ejecución */}
            <button type="submit" disabled={enviando}
              className={`w-full flex items-center justify-center gap-3 p-4 rounded text-black font-bold uppercase tracking-widest transition-all ${
                enviando ? 'bg-yellow-700 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]'
              }`}>
              <Save className={`w-6 h-6 ${enviando ? 'animate-spin' : ''}`} />
              {enviando ? 'SOBREESCRIBIENDO ATLAS DB...' : 'ACTUALIZAR REGISTRO'}
            </button>
          </form>
        </div>

        {/* ==========================================
            ➡️ HEMISFERIO DERECHO: SIMULADOR HOLOGRÁFICO 
            ========================================== */}
        <div className="bg-[#050505] border border-dashed border-yellow-500/50 p-6 flex flex-col h-full rounded-lg shadow-[inset_0_0_20px_rgba(234,179,8,0.05)]">
            
            <div className="flex gap-4 mb-6 border-b border-yellow-500/30 pb-4">
                <button 
                    onClick={() => setVistaActiva('radar')}
                    className={`px-4 py-2 font-bold uppercase tracking-widest text-sm transition-all ${vistaActiva === 'radar' ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'bg-transparent text-yellow-500/50 border border-yellow-500/30 hover:text-yellow-400'}`}
                >
                    [ VISTA_RADAR (Feed) ]
                </button>
                <button 
                    onClick={() => setVistaActiva('detalle')}
                    className={`px-4 py-2 font-bold uppercase tracking-widest text-sm transition-all ${vistaActiva === 'detalle' ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'bg-transparent text-yellow-500/50 border border-yellow-500/30 hover:text-yellow-400'}`}
                >
                    [ VISTA_REPORTE (Detalle) ]
                </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                
                {vistaActiva === 'radar' && (
                    <div className="max-w-md mx-auto pointer-events-none">
                        <article className="bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden flex flex-col relative">
                            <div className="h-56 overflow-hidden relative bg-gray-900 border-b border-green-500/30">
                                {previewImg ? (
                                    <img src={previewImg} alt="Preview" className="w-full h-full object-cover mix-blend-luminosity" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]">
                                        <Terminal className="w-12 h-12 text-green-900" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-gray-900/90 border border-green-500/50 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded">
                                        {formData.categoria || 'GENERAL'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-green-700 text-xs mb-4 uppercase tracking-widest">
                                    <Clock className="w-4 h-4" />
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold text-green-400 mb-3 leading-tight uppercase">
                                    &gt; {formData.titulo || 'TITULO_DE_EJEMPLO'}
                                </h3>
                                <p className="text-green-600/80 line-clamp-3 mb-6 text-sm">
                                    {formData.resumen || 'El resumen se mostrará aquí...'}
                                </p>
                            </div>
                        </article>
                    </div>
                )}

                {vistaActiva === 'detalle' && (
                    <div className="w-full pointer-events-none">
                        <header className="mb-6">
                            <div className="flex flex-wrap items-center gap-3 text-green-600/80 text-xs mb-4 uppercase tracking-widest">
                                <span className="px-2 py-1 bg-green-950/50 border border-green-500/30 text-green-400 font-bold rounded flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> {formData.categoria || 'GENERAL'}
                                </span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> HOY</span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> COMANDANTE</span>
                            </div>
                            <h1 className="text-2xl font-bold text-green-400 leading-tight mb-4 break-words">
                                &gt; {formData.titulo || 'TITULO_DEL_REPORTE'}
                            </h1>
                            <p className="text-sm text-green-500/80 italic border-l-2 border-green-500/50 pl-3 mb-6 break-words">
                                {formData.resumen || 'Resumen introductorio...'}
                            </p>
                        </header>

                        {previewImg && (
                            <div className="mb-6 w-full flex flex-col items-center">
                                <div className="w-full bg-black border border-green-500/30 rounded-lg overflow-hidden flex justify-center items-center">
                                    <img src={previewImg} alt="Preview" className="w-full h-auto max-h-[300px] object-contain mix-blend-luminosity" />
                                </div>
                                {formData.fuenteUrl && (
                                    <div className="mt-2 w-full flex items-center gap-2 text-green-500/80 text-[10px] font-mono uppercase tracking-widest border-l-2 border-green-500 pl-2">
                                        <LinkIcon className="w-3 h-3" />
                                        <span className="truncate">FUENTE: {formData.fuenteUrl}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="text-green-300 text-sm leading-relaxed whitespace-pre-wrap mb-8 break-words">
                            {formData.contenido || 'Cargando datos del informe clasificado...'}
                        </div>

                        {formData.multimediaUrl && getYouTubeId(formData.multimediaUrl) && (
                            <div className="mb-6 w-full">
                                <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest mb-2 border-b border-green-500/30 pb-1">
                                    <Youtube className="w-4 h-4 text-red-500 animate-pulse" />
                                    <span>TRANSMISIÓN_MULTIMEDIA</span>
                                </div>
                                <div className="w-full aspect-video border border-green-500/50 rounded-lg overflow-hidden bg-black flex items-center justify-center text-green-500/50 text-xs text-center p-4">
                                    [ SIMULACIÓN DE IFRAME YOUTUBE ACTIVADA PARA EL VIDEO ID: {getYouTubeId(formData.multimediaUrl)} ]
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default EditarNoticia;