import React, { useState } from 'react';
import api from '../api'; // 🛰️ Antena universal (asegúrate de que api.js esté en src/)

const PostNews = () => {
    // 1. Definición de Estados (Los sensores)
    const [formData, setFormData] = useState({ titulo: '', contenido: '', categoria: 'General' });
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);

    // 2. Manejador de texto (handleChange)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Manejador de archivos (handleFile)
    const handleFile = (e) => {
        setImagen(e.target.files[0]);
    };

    // 4. Lógica de envío (handleSubmit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('titulo', formData.titulo);
        data.append('contenido', formData.contenido);
        data.append('categoria', formData.categoria);
        data.append('imagen', imagen);

        try {
            const token = localStorage.getItem('token');
            const res = await api.post('/noticias/publicar', data, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            alert("✅ REPORTE EN ÓRBITA EXITOSAMENTE");
            // Limpiar formulario tras el éxito
            setFormData({ titulo: '', contenido: '', categoria: 'General' });
            setImagen(null);
        } catch (err) {
            console.error("❌ FALLA EN EL LANZAMIENTO:", err);
            alert("Error al conectar con el búnker de Marie.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{'>'} NUEVA TRANSMISIÓN</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    name="titulo" 
                    placeholder="TÍTULO DEL REPORTE" 
                    onChange={handleChange} 
                    value={formData.titulo} 
                    required 
                    style={styles.input}
                />
                <textarea 
                    name="contenido" 
                    placeholder="CONTENIDO TÁCTICO..." 
                    onChange={handleChange} 
                    value={formData.contenido} 
                    required 
                    style={styles.textarea}
                />
                <div style={styles.fileBox}>
                    <label style={styles.label}>SELECCIONAR IMAGEN DE SATÉLITE:</label>
                    <input type="file" onChange={handleFile} required style={styles.fileInput}/>
                </div>
                <button type="submit" disabled={loading} style={styles.btn}>
                    {loading ? 'ENVIANDO A LA NUBE...' : 'LANZAR NOTICIA 🚀'}
                </button>
            </form>
        </div>
    );
};

// 🎨 Estilos Estilo Terminal
const styles = {
    container: { maxWidth: '600px', margin: '2rem auto', padding: '1rem' },
    title: { color: '#00ff41', fontFamily: 'monospace', marginBottom: '1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #333' },
    input: { padding: '12px', background: '#000', color: '#00ff41', border: '1px solid #00ff41', outline: 'none', fontFamily: 'monospace' },
    textarea: { padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', minHeight: '150px', outline: 'none' },
    fileBox: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { color: '#888', fontSize: '0.8rem', fontWeight: 'bold' },
    fileInput: { color: '#888' },
    btn: { background: '#00ff41', color: '#000', fontWeight: 'bold', padding: '15px', cursor: 'pointer', border: 'none', transition: '0.3s', textTransform: 'uppercase' }
};

export default PostNews;