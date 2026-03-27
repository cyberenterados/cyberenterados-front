import React, { useEffect, useState } from 'react';
import api from './api'; 

const Feed = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerNoticias = async () => {
            try {
                const res = await api.get('/api/noticias'); // Sincronizado con la nueva ruta de Marie
                setNoticias(res.data);
            } catch (err) {
                console.error("❌ FALLA EN EL RADAR:", err);
            } finally {
                setLoading(false);
            }
        };
        obtenerNoticias();
    }, []);

    if (loading) return (
        <div style={styles.loaderContainer}>
            <h2 style={styles.loaderText}>🛰️ ESCANEANDO FRECUENCIAS...</h2>
            <div style={styles.progressBar}></div>
        </div>
    );

    return (
        <div style={styles.feedContainer}>
            <h1 style={styles.title}>{'>'} REPORTES EN ÓRBITA</h1>
            
            <div style={styles.grid}>
                {noticias.map((n, index) => (
                    <React.Fragment key={n._id}>
                        {/* 🏗️ ESTRUCTURA DE NOTICIA */}
                        <article style={styles.card}>
                            <div style={styles.imageWrapper}>
                                {n.imagenUrl ? (
                                    <img 
                                        src={n.imagenUrl} 
                                        alt={n.titulo} 
                                        style={styles.image} 
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=SEÑAL+PERDIDA'; }}
                                    />
                                ) : (
                                    <div style={styles.placeholder}>[ SIN SEÑAL VISUAL ]</div>
                                )}
                            </div>
                            
                            <div style={styles.cardContent}>
                                <div style={styles.meta}>
                                    <span style={styles.tag}>{n.categoria || 'GENERAL'}</span>
                                    <small style={styles.date}>
                                        {new Date(n.fecha || n.fechaCreacion).toLocaleDateString()}
                                    </small>
                                </div>
                                <h3 style={styles.cardTitle}>{n.titulo}</h3>
                                <p style={styles.cardText}>
                                    {n.resumen || (n.contenido && n.contenido.substring(0, 100) + "...")}
                                </p>
                                <button style={styles.readMore}>LEER TRANSMISIÓN completa_</button>
                            </div>
                        </article>

                        {/* 💰 SLOT ADSENSE: Cada 3 noticias (Activar al tener la cuenta) */}
                        {/* (index + 1) % 3 === 0 && <div style={styles.adSlot}>[ ESPACIO PUBLICITARIO DISPONIBLE ]</div> */}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const styles = {
    feedContainer: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: '#050505' },
    title: { color: '#00ff41', fontFamily: 'monospace', marginBottom: '2rem', borderLeft: '4px solid #00ff41', paddingLeft: '1rem', fontSize: '1.8rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' },
    card: { background: '#111', borderRadius: '4px', overflow: 'hidden', border: '1px solid #00ff4133', transition: '0.3s', display: 'flex', flexDirection: 'column' },
    imageWrapper: { width: '100%', height: '200px', background: '#000', overflow: 'hidden', borderBottom: '1px solid #222' },
    image: { width: '100%', height: '100%', objectFit: 'cover', opacity: '0.9' },
    placeholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontFamily: 'monospace', fontSize: '0.8rem' },
    cardContent: { padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' },
    meta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    tag: { color: '#00ff41', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' },
    cardTitle: { color: '#eee', margin: '0 0 1rem 0', fontSize: '1.3rem', fontFamily: 'monospace', lineHeight: '1.2' },
    cardText: { color: '#888', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' },
    date: { color: '#444', fontSize: '0.75rem' },
    readMore: { background: 'none', border: '1px solid #00ff41', color: '#00ff41', padding: '8px', cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: 'auto', alignSelf: 'flex-start' },
    loaderContainer: { height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    loaderText: { color: '#00ff41', fontFamily: 'monospace', marginBottom: '10px' },
    progressBar: { width: '200px', height: '2px', background: '#00ff41', boxShadow: '0 0 10px #00ff41' },
    adSlot: { gridColumn: '1 / -1', height: '100px', background: '#0a0a0a', border: '1px dashed #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '0.8rem', fontFamily: 'monospace' }
};

export default Feed;