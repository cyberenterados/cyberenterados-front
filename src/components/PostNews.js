import React, { useState, useRef } from 'react';
import api from '../api';

const PostNews = () => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({ 
        titulo: '', 
        resumen: '', 
        contenido: '', 
        categoria: 'Tecnología',
        // 🚀 NUEVOS CAMPOS TÁCTICOS (V3.0)
        fuenteUrl: '',
        multimediaUrl: ''
    });
    // Modificamos el estado para soportar un array de archivos
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Adaptado para leer múltiples archivos
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
        
        // 🚀 LÓGICA DE IMÁGENES ACTUALIZADA
        if (imagenes.length > 0) {
            // Mantenemos la primera imagen como 'imagen' principal (portada)
            data.append('imagen', imagenes[0]);
            
            // Adjuntamos todas al nuevo array 'galeria' para el backend
            imagenes.forEach(img => {
                data.append('galeria', img);
            });
        }

        try {
            const token = localStorage.getItem('token');
            
            // 🛰️ LANZAMIENTO HACIA RENDER
            await api.post('/noticias/publicar', data, { 
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token // 🔑 Llave de acceso obligatoria
                }
            });

            alert("✅ REPORTE EN ÓRBITA: La noticia ya vive en la nube.");
            // Reseteo de campos incluyendo los nuevos
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
        <div style={styles.container}>
            <h2 style={styles.title}>{'>'} CONSOLA_DE_DESPACHO_NUBE_V3.0</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input name="titulo" placeholder="TÍTULO SEO..." onChange={handleChange} value={formData.titulo} required style={styles.input} />
                <input name="resumen" placeholder="RESUMEN GOOGLE NEWS..." onChange={handleChange} value={formData.resumen} required style={styles.input} />
                
                <div style={styles.row}>
                    <select name="categoria" onChange={handleChange} value={formData.categoria} style={{...styles.input, flex: 1}}>
                        <option value="Tecnología">📡 TECNOLOGÍA</option>
                        <option value="Ciberseguridad">🛡️ CIBERSEGURIDAD</option>
                        <option value="Espacio">🚀 ESPACIO</option>
                        <option value="IA">🤖 I.A.</option>
                    </select>
                    {/* 🟢 Atributo 'multiple' agregado al input de archivo */}
                    <input ref={fileInputRef} type="file" multiple onChange={handleFile} required style={styles.fileInput} title="Puede seleccionar varias imágenes" />
                </div>

                {/* 🚀 NUEVOS INPUTS MULTIMEDIA */}
                <input name="fuenteUrl" type="url" placeholder="URL FUENTE ORIGINAL (Opcional)..." onChange={handleChange} value={formData.fuenteUrl} style={styles.input} />
                <input name="multimediaUrl" type="url" placeholder="URL YOUTUBE / REDES (Opcional)..." onChange={handleChange} value={formData.multimediaUrl} style={styles.input} />

                <textarea name="contenido" placeholder="Cuerpo del reporte..." onChange={handleChange} value={formData.contenido} required style={styles.textarea} />
                
                <button type="submit" disabled={loading} style={styles.btn}>
                    {loading ? '--- ENCRIPTANDO PAQUETE ---' : 'TRANSMITIR A LA RED 🚀'}
                </button>
            </form>
        </div>
    );
};

// 🛡️ ESTILOS INTACTOS
const styles = {
    container: { maxWidth: '800px', margin: '2rem auto', fontFamily: 'monospace' },
    title: { color: '#00ff41', textAlign: 'center', letterSpacing: '2px' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', background: '#000', padding: '2rem', border: '1px solid #00ff41' },
    input: { padding: '12px', background: '#0a0a0a', color: '#00ff41', border: '1px solid #222', outline: 'none' },
    textarea: { padding: '12px', background: '#0a0a0a', color: '#fff', border: '1px solid #222', minHeight: '150px', outline: 'none' },
    row: { display: 'flex', gap: '10px', alignItems: 'center' },
    fileInput: { color: '#00ff41', fontSize: '0.8rem' },
    btn: { background: '#00ff41', color: '#000', fontWeight: 'bold', padding: '15px', cursor: 'pointer', border: 'none' }
};

export default PostNews;