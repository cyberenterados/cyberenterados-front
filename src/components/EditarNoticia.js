import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Terminal, Save, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Youtube } from 'lucide-react';
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
    // 🚀 NUEVOS ESTADOS TÁCTICOS (V3.0)
    fuenteUrl: '',
    multimediaUrl: ''
  });
  
  const [imagenActual, setImagenActual] = useState('');
  // 🚀 Adaptado a array para soportar múltiples imágenes en la edición
  const [nuevasImagenes, setNuevasImagenes] = useState([]);

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
            // 🚀 Cargamos los nuevos datos si existen
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

  // 🚀 Adaptado para leer múltiples archivos
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
    
    // 🚀 Adjuntamos los nuevos campos si tienen contenido
    if (formData.fuenteUrl) data.append('fuenteUrl', formData.fuenteUrl);
    if (formData.multimediaUrl) data.append('multimediaUrl', formData.multimediaUrl);
    
    // 🚀 LÓGICA DE IMÁGENES CORREGIDA (Evita Error 500)
    if (nuevasImagenes.length > 0) {
      data.append('imagen', nuevasImagenes[0]); // La principal se sobreescribe
      
      // [TEMPORALMENTE DESACTIVADO HASTA ACTUALIZAR CLOUDINARY EN EL BACKEND]
      // nuevasImagenes.forEach(img => {
      //     data.append('galeria', img);
      // });
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
    return <div className="text-green-500 animate-pulse font-mono flex h-screen items-center justify-center">&gt; Desencriptando archivo seleccionado...</div>;
  }

  return (
    <div className="bg-black border border-green-500/30 p-8 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.1)] font-mono max-w-4xl mx-auto">
      
      {/* 🟢 Botón de Retirada y Encabezado */}
      <div className="flex items-center gap-4 mb-8 border-b border-green-500/30 pb-4">
        <button 
          onClick={() => navigate('/panel/noticias')}
          className="p-2 bg-green-950/30 text-green-500 hover:bg-green-500 hover:text-black rounded transition-colors border border-green-500/50"
          title="Volver al Arsenal"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <Terminal className="w-8 h-8 text-yellow-500 animate-pulse" />
        <h2 className="text-2xl font-bold text-yellow-500 tracking-widest uppercase">
          &gt; MODIFICAR_REGISTRO.exe
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título y Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-green-600 text-sm uppercase tracking-widest">&gt; Nuevo Titulo</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required
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
          <textarea name="resumen" value={formData.resumen} onChange={handleChange} required rows="2"
            className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-green-400 p-3 rounded transition-all"></textarea>
        </div>

        {/* Contenido Completo */}
        <div className="space-y-2">
          <label className="text-green-600 text-sm uppercase tracking-widest">&gt; Contenido_Principal</label>
          <textarea name="contenido" value={formData.contenido} onChange={handleChange} required rows="8"
            className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-green-400 p-3 rounded transition-all"></textarea>
        </div>

        {/* ==========================================
            🚀 NUEVOS CAMPOS MULTIMEDIA (V3.0)
            ========================================== */}
        <div className="p-4 border border-dashed border-yellow-900/50 bg-green-950/5 space-y-4 rounded">
          <h3 className="text-yellow-600/80 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Enlaces_Externos_Y_Multimedia
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fuente Original */}
            <div className="space-y-2">
              <label className="text-green-600/80 text-xs uppercase flex items-center gap-2">
                <LinkIcon className="w-3 h-3" /> URL_Fuente_Original (Opcional)
              </label>
              <input type="url" name="fuenteUrl" value={formData.fuenteUrl} onChange={handleChange}
                className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 outline-none text-green-400 p-2 rounded text-sm transition-all"
                placeholder="https://nasa.gov/..." />
            </div>

            {/* YouTube / Redes */}
            <div className="space-y-2">
              <label className="text-green-600/80 text-xs uppercase flex items-center gap-2">
                <Youtube className="w-3 h-3" /> URL_YouTube_o_Redes (Opcional)
              </label>
              <input type="url" name="multimediaUrl" value={formData.multimediaUrl} onChange={handleChange}
                className="w-full bg-green-950/10 border border-green-900 focus:border-yellow-500 outline-none text-green-400 p-2 rounded text-sm transition-all"
                placeholder="https://youtube.com/watch?v=..." />
            </div>
          </div>
          
          {/* Módulo de Imagen Múltiple */}
          <div className="pt-4 mt-4 border-t border-green-900/50">
            <div className="flex items-center gap-2 text-green-600 text-sm uppercase tracking-widest mb-2">
              <ImageIcon className="w-4 h-4" />
              <label>&gt; Cargar_Imágenes_Nuevas (Sobreescribe las actuales)</label>
            </div>
            
            {imagenActual && nuevasImagenes.length === 0 && (
              <div className="text-xs text-green-700 mb-2">
                [ Imagen actual en Cloudinary detectada. Suba nuevas para sobreescribirla. ]
              </div>
            )}

            {/* 🟢 Atributo 'multiple' agregado */}
            <input type="file" multiple name="imagen" onChange={handleFileChange} accept="image/*"
              className="w-full text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:uppercase file:bg-green-900/30 file:text-green-400 hover:file:bg-green-900/50 file:transition-colors file:cursor-pointer text-sm" />
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
  );
};

export default EditarNoticia;