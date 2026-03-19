import React, { useState } from 'react';
import api from '../api';

const PostNews = () => {
    const [formData, setFormData] = useState({ titulo: '', contenido: '', categoria: 'General' });
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
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (imagen) data.append('imagen', imagen);

        try {
            const token = localStorage.getItem('token');
            await api.post('/noticias/publicar', data, { // res eliminado
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            alert("✅ REPORTE EN ÓRBITA");
            setFormData({ titulo: '', contenido: '', categoria: 'General' });
            setImagen(null);
        } catch (err) {
            console.error("❌ Error de envío:", err);
            alert("Error al conectar con el búnker.");
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
                    placeholder="TÍTULO" 
                    onChange={handleChange} 
                    value={formData.titulo} 
                    required 
                    style={styles.input}
                />
                <textarea 
                    name="contenido" 
                    placeholder="CONTENIDO..." 
                    onChange={handleChange} 
                    value={formData.contenido} 
                    required 
                    style={styles.textarea}
                />
                <div style={styles.fileBox}>
                    <label style={styles.label}>IMAGEN DE SATÉLITE:</label>
                    <input type="file" onChange={handleFile} required style={styles.fileInput}/>
                </div>
                <button type="submit" disabled={loading} style={styles.btn}>
                    {loading ? 'TRANSMITIENDO...' : 'LANZAR NOTICIA 🚀'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: { maxWidth: '600px', margin: '2rem auto', padding: '1rem' },
    title: { color: '#00ff41', fontFamily: 'monospace', marginBottom: '1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #333' },
    input: { padding: '12px', background: '#000', color: '#00ff41', border: '1px solid #00ff41', outline: 'none', fontFamily: 'monospace' },
    textarea: { padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', minHeight: '150px', outline: 'none' },
    fileBox: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { color: '#888', fontSize: '0.8rem', fontWeight: 'bold' },
    fileInput: { color: '#888' },
    btn: { background: '#00ff41', color: '#000', fontWeight: 'bold', padding: '15px', cursor: 'pointer', border: 'none', textTransform: 'uppercase' }
};

export default PostNews;