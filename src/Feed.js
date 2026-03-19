import React, { useEffect, useState } from 'react';
import api from './api'; // 🛰️ Importamos nuestra antena personalizada

const Feed = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerNoticias = async () => {
            try {
                // 📡 Marie ahora sabe a dónde apuntar automáticamente
                const res = await api.get('/noticias'); 
                setNoticias(res.data);
            } catch (err) {
                console.error("❌ FALLA EN EL RADAR:", err);
            } finally {
                setLoading(false);
            }
        };
        obtenerNoticias();
    }, []);

    // ... (El resto de tu código de renderizado y estilos se mantiene igual)

    if (loading) return <h2 style={{color: '#00ff41', textAlign: 'center'}}>🛰️ ESCANEANDO FRECUENCIAS...</h2>;

    return (
        <div style={styles.feedContainer}>
            <h1 style={styles.title}>{'>'} REPORTES EN ÓRBITA</h1>
            <div style={styles.grid}>
                {noticias.map((n) => (
                    <div key={n._id} style={styles.card}>
                        <div style={styles.imageWrapper}>
                            <img src={n.imagenUrl} alt={n.titulo} style={styles.image} />
                        </div>
                        <div style={styles.cardContent}>
                            <span style={styles.tag}>{n.categoria}</span>
                            <h3 style={styles.cardTitle}>{n.titulo}</h3>
                            <p style={styles.cardText}>{n.contenido.substring(0, 100)}...</p>
                            <small style={styles.date}>{new Date(n.fechaCreacion).toLocaleDateString()}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    feedContainer: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    title: { color: '#00ff41', fontFamily: 'monospace', marginBottom: '2rem', borderLeft: '4px solid #00ff41', paddingLeft: '1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' },
    card: { background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', transition: '0.3s' },
    imageWrapper: { width: '100%', height: '200px', overflow: 'hidden' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    cardContent: { padding: '1.5rem' },
    tag: { background: '#00ff41', color: '#000', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 'bold', borderRadius: '4px' },
    cardTitle: { color: '#fff', margin: '1rem 0 0.5rem 0', fontSize: '1.2rem' },
    cardText: { color: '#aaa', fontSize: '0.9rem', lineHeight: '1.4' },
    date: { color: '#555', marginTop: '1rem', display: 'block' }
};

export default Feed;