import React, { useState } from 'react';
import api from '../api';

const PostNews = () => {
    // 1. Agregamos 'resumen' para que Google News tenga un snippet claro
    const [formData, setFormData] = useState({ 
        titulo: '', 
        resumen: '', 
        contenido: '', 
        categoria: 'Tecnología' // Categoría por defecto más atractiva para Ads
    });
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        // 2. Mapeo exacto para Marie (Back)
        data.append('titulo', formData.titulo);
        data.append('resumen', formData.resumen);
        data.append('contenido', formData.contenido);
        data.append('categoria', formData.categoria);
        
        // IMPORTANTE: Si tu backend usa Multer, el nombre aquí 'imagen' 
        // debe coincidir con upload.single('imagen') en las rutas del Back.
        if (imagen) data.append('imagen', imagen);

        try {
            const token = localStorage.getItem('token');
            // 3. Verificamos que la ruta sea /noticias (como definimos en el Excel)
            await api.post('/noticias/publicar', data, { 
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            alert("✅ REPORTE EN ÓRBITA: La noticia ya está en el núcleo Atlas.");
            setFormData({ titulo: '', resumen: '', contenido: '', categoria: 'Tecnología' });
            setImagen(null);
        } catch (err) {
            console.error("❌ ERROR EN EL PUENTE:", err.response?.data || err.message);
            alert(err.response?.data?.mensaje || "Error al conectar con el búnker.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{'>'} DESPACHO DE NOTICIAS</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    name="titulo" 
                    placeholder="TÍTULO IMPACTANTE (SEO)" 
                    onChange={handleChange} 
                    value={formData.titulo} 
                    required 
                    style={styles.input}
                />
                <input 
                    name="resumen" 
                    placeholder="RESUMEN CORTO PARA GOOGLE NEWS..." 
                    onChange={handleChange} 
                    value={formData.resumen} 
                    required 
                    style={{...styles.input, color: '#aaa', borderColor: '#333'}} 
                />
                <select 
                    name="categoria" 
                    onChange={handleChange} 
                    value={formData.categoria} 
                    style={styles.input}
                >
                    <option value="Tecnología">TECNOLOGÍA</option>
                    <option value="Cripto">CRIPTO</option>
                    <option value="IA">INTELIGENCIA ARTIFICIAL</option>
                    <option value="General">GENERAL</option>
                </select>
                <textarea 
                    name="contenido" 
                    placeholder="Escribe el cuerpo de la noticia aquí..." 
                    onChange={handleChange} 
                    value={formData.contenido} 
                    required 
                    style={styles.textarea}
                />
                <div style={styles.fileBox}>
                    <label style={styles.label}>IMAGEN DE CABECERA (Cloudinary):</label>
                    <input type="file" onChange={handleFile} required style={styles.fileInput}/>
                </div>
                <button type="submit" disabled={loading} style={styles.btn}>
                    {loading ? 'ENCRIPTANDO TRANSMISIÓN...' : 'PUBLICAR EN CYBERENTERADOS 🚀'}
                </button>
            </form>
        </div>
    );
};

// ... (tus estilos se mantienen igual, son excelentes)
const styles = {
    container: { maxWidth: '800px', margin: '2rem auto', padding: '1rem' },
    title: { color: '#00d4ff', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', background: '#0a0a0a', padding: '2rem', borderRadius: '12px', border: '1px solid #00d4ff33', boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)' },
    input: { padding: '12px', background: '#000', color: '#00d4ff', border: '1px solid #00d4ff', outline: 'none', fontFamily: 'monospace', borderRadius: '4px' },
    textarea: { padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', minHeight: '200px', outline: 'none', borderRadius: '4px', lineHeight: '1.6' },
    fileBox: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', border: '1px dashed #333' },
    label: { color: '#00d4ff', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' },
    fileInput: { color: '#888', fontSize: '0.8rem' },
    btn: { background: '#00d4ff', color: '#000', fontWeight: 'bold', padding: '15px', cursor: 'pointer', border: 'none', textTransform: 'uppercase', borderRadius: '4px', transition: '0.3s' }
};

export default PostNews;