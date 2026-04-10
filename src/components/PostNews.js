import React, { useState, useRef, useEffect } from 'react';
import api from '../api';
import { Clock, Terminal, User, Tag, Link as LinkIcon, Youtube } from 'lucide-react'; // 🚀 Importaciones tácticas para el simulador

const PostNews = () => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({ 
        titulo: '', 
        resumen: '', 
        contenido: '', 
        categoria: 'Tecnología',
        fuenteUrl: '',
        multimediaUrl: ''
    });
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(false);
    
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

    // 👁️ Generador de Holograma de Imagen en Vivo
    useEffect(() => {
        if (imagenes.length > 0) {
            const objectUrl = URL.createObjectURL(imagenes[0]);
            setPreviewImg(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewImg(null);
        }
    }, [imagenes]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImagenes(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        
        if (imagenes.length > 0) {
            data.append('imagen', imagenes[0]);
        }

        try {
            const token = localStorage.getItem('token');
            
            await api.post('/noticias/publicar', data, { 
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token 
                }
            });

            alert("✅ REPORTE EN ÓRBITA: La noticia ya vive en la nube.");
            setFormData({ titulo: '', resumen: '', contenido: '', categoria: 'Tecnología', fuenteUrl: '', multimediaUrl: '' });
            setImagenes([]);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (err) {
            console.error("❌ FALLA EN EL PUENTE:", err.response?.data || err.message);
            const msg = err.response?.data?.msg || err.response?.data?.error || "Error de conexión.";
            alert(`⚠️ TRANSMISIÓN FALLIDA: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 p-4 md:p-8 font-mono">
            <h2 style={{...styles.title, marginBottom: '2rem'}}>{'>'} CONSOLA_DE_DESPACHO_NUBE_V3.1_DOS_HEMISFERIOS</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1600px] mx-auto">
                
                {/* ==========================================
                    ⬅️ HEMISFERIO IZQUIERDO: CONSOLA DE CARGA 
                    ========================================== */}
                <div>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div className="mb-4 text-green-500 font-bold uppercase tracking-widest border-b border-green-500/30 pb-2">
                            [ MÓDULO_DE_REDACCIÓN ]
                        </div>
                        
                        {/* 🟢 Agregamos spellCheck={true} para el corrector nativo */}
                        <input name="titulo" placeholder="TÍTULO SEO..." onChange={handleChange} value={formData.titulo} required spellCheck={true} style={styles.input} />
                        <input name="resumen" placeholder="RESUMEN GOOGLE NEWS..." onChange={handleChange} value={formData.resumen} required spellCheck={true} style={styles.input} />
                        
                        <div style={styles.row}>
                            <select name="categoria" onChange={handleChange} value={formData.categoria} style={{...styles.input, flex: 1}}>
                                <option value="Tecnología">📡 TECNOLOGÍA</option>
                                <option value="Ciberseguridad">🛡️ CIBERSEGURIDAD</option>
                                <option value="Espacio">🚀 ESPACIO</option>
                                <option value="IA">🤖 I.A.</option>
                            </select>
                            <input ref={fileInputRef} type="file" multiple onChange={handleFile} required style={styles.fileInput} title="Puede seleccionar varias imágenes" />
                        </div>

                        <input name="fuenteUrl" type="url" placeholder="URL FUENTE ORIGINAL (Opcional)..." onChange={handleChange} value={formData.fuenteUrl} style={styles.input} />
                        <input name="multimediaUrl" type="url" placeholder="URL YOUTUBE / REDES (Opcional)..." onChange={handleChange} value={formData.multimediaUrl} style={styles.input} />

                        <textarea name="contenido" placeholder="Cuerpo del reporte (Se revisará la ortografía automáticamente)..." onChange={handleChange} value={formData.contenido} required spellCheck={true} style={styles.textarea} />
                        
                        <button type="submit" disabled={loading} style={styles.btn}>
                            {loading ? '--- ENCRIPTANDO PAQUETE ---' : 'TRANSMITIR A LA RED 🚀'}
                        </button>
                    </form>
                </div>

                {/* ==========================================
                    ➡️ HEMISFERIO DERECHO: SIMULADOR HOLOGRÁFICO 
                    ========================================== */}
                <div className="bg-[#050505] border border-dashed border-green-500/50 p-6 flex flex-col h-full rounded-lg shadow-[inset_0_0_20px_rgba(0,255,0,0.05)]">
                    
                    {/* Botonera de Pestañas */}
                    <div className="flex gap-4 mb-6 border-b border-green-500/30 pb-4">
                        <button 
                            onClick={() => setVistaActiva('radar')}
                            className={`px-4 py-2 font-bold uppercase tracking-widest text-sm transition-all ${vistaActiva === 'radar' ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(0,255,0,0.5)]' : 'bg-transparent text-green-500/50 border border-green-500/30 hover:text-green-400'}`}
                        >
                            [ VISTA_RADAR (Feed) ]
                        </button>
                        <button 
                            onClick={() => setVistaActiva('detalle')}
                            className={`px-4 py-2 font-bold uppercase tracking-widest text-sm transition-all ${vistaActiva === 'detalle' ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(0,255,0,0.5)]' : 'bg-transparent text-green-500/50 border border-green-500/30 hover:text-green-400'}`}
                        >
                            [ VISTA_REPORTE (Detalle) ]
                        </button>
                    </div>

                    {/* Contenedor del Simulador */}
                    <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        
                        {/* 📡 RENDERIZADO: VISTA RADAR (Mismo diseño que FeedNoticias.js) */}
                        {vistaActiva === 'radar' && (
                            <div className="max-w-md mx-auto">
                                <article className="bg-gray-800 border border-green-500/30 rounded-lg overflow-hidden flex flex-col relative pointer-events-none">
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
                                            {formData.resumen || 'El resumen se mostrará aquí para atraer a los civiles...'}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        )}

                        {/* 🎯 RENDERIZADO: VISTA REPORTE (Mismo diseño que NoticiaDetalle.js) */}
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
                                    {formData.contenido || 'Inicia la redacción del reporte en la terminal de la izquierda para ver el contenido simulado en este bloque...'}
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

// 🛡️ ESTILOS INTACTOS (Expandidos solo para mantener la coherencia)
const styles = {
    title: { color: '#00ff41', textAlign: 'center', letterSpacing: '2px' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', background: '#000', padding: '2rem', border: '1px solid #00ff41', borderRadius: '0.5rem', boxShadow: '0 0 15px rgba(0,255,0,0.1)' },
    input: { padding: '12px', background: '#0a0a0a', color: '#00ff41', border: '1px solid #222', outline: 'none' },
    textarea: { padding: '12px', background: '#0a0a0a', color: '#fff', border: '1px solid #222', minHeight: '300px', outline: 'none' },
    row: { display: 'flex', gap: '10px', alignItems: 'center' },
    fileInput: { color: '#00ff41', fontSize: '0.8rem' },
    btn: { background: '#00ff41', color: '#000', fontWeight: 'bold', padding: '15px', cursor: 'pointer', border: 'none', textTransform: 'uppercase', tracking: 'widest', transition: 'all 0.3s' }
};

export default PostNews;