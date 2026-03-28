import React, { useEffect, useState } from 'react';
import api from './api'; 

const Feed = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerNoticias = async () => {
            try {
                // ✅ CORRECCIÓN CRÍTICA: Quitamos el primer /api/
                // api.js ya tiene la base: https://cyberenteradosnews.onrender.com/api
                const res = await api.get('/noticias'); 
                
                setNoticias(res.data);
            } catch (err) {
                console.error("❌ FALLA EN EL RADAR:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };
        obtenerNoticias();
    }, []);

    if (loading) return (
        <div style={styles.loaderContainer}>
            <h2 style={styles.loaderText}>{'>'} ESCANEANDO FRECUENCIAS...</h2>
            <div style={styles.progressBar}></div>
        </div>
    );

    return (
        <div style={styles.feedContainer}>
            <h1 style={styles.title}>{'>'} REPORTES_EN_ORBITA_V1.0</h1>
            
            <div style={styles.grid}>
                {noticias.length > 0 ? (
                    noticias.map((n, index) => (
                        <React.Fragment key={n._id || index}>
                            <article style={styles.card}>
                                <div style={styles.imageWrapper}>
                                    {n.imagenUrl ? (
                                        <img 
                                            src={n.imagenUrl} 
                                            alt={n.titulo} 
                                            style={styles.image} 
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=FALLA+DE+VIDEO'; }}
                                        />
                                    ) : (
                                        <div style={styles.placeholder}>[ SIN SEÑAL VISUAL ]</div>
                                    )}
                                </div>
                                
                                <div style={styles.cardContent}>
                                    <div style={styles.meta}>
                                        <span style={styles.tag}>{n.categoria || 'GENERAL'}</span>
                                        <small style={styles.date}>
                                            {n.fecha ? new Date(n.fecha).toLocaleDateString() : 'FECHA_DESCONOCIDA'}
                                        </small>
                                    </div>
                                    <h3 style={styles.cardTitle}>{n.titulo}</h3>
                                    <p style={styles.cardText}>
                                        {n.resumen || (n.contenido && n.contenido.substring(0, 100) + "...")}
                                    </p>
                                    <button style={styles.readMore}>LEER_TRANSMISION_</button>
                                </div>
                            </article>
                        </React.Fragment>
                    ))
                ) : (
                    <div style={styles.noData}>
                        <p style={{color: '#444'}}>[ ESPERANDO TRANSMISIONES DESDE EL BÚNKER... ]</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// 🎨 Estilos optimizados para alto contraste y estética Cyber
const styles = {
    feedContainer: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: '#050505', minHeight: '100vh' },
    title: { color: '#00ff41', fontFamily: 'monospace', marginBottom: '2rem', borderLeft: '4px solid #00ff41', paddingLeft: '1rem', fontSize: '1.8rem', textShadow: '0 0 10px rgba(0,255,65,0.2)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' },
    card: { background: '#0a0a0a', borderRadius: '0px', overflow: 'hidden', border: '1px solid #1a1a1a', transition: '0.3s', display: 'flex', flexDirection: 'column', hover: {borderColor: '#00ff41'} },
    imageWrapper: { width: '100%', height: '180px', background: '#000', overflow: 'hidden', borderBottom: '1px solid #1a1a1a' },
    image: { width: '100%', height: '100%', objectFit: 'cover', opacity: '0.8' },
    placeholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#222', fontFamily: 'monospace', fontSize: '0.7rem' },
    cardContent: { padding: '1.2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' },
    meta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' },
    tag: { color: '#00ff41', fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', border: '1px solid #00ff4133', padding: '2px 6px' },
    cardTitle: { color: '#fff', margin: '0 0 1rem 0', fontSize: '1.2rem', fontFamily: 'monospace', lineHeight: '1.3' },
    cardText: { color: '#777', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' },
    date: { color: '#333', fontSize: '0.7rem', fontFamily: 'monospace' },
    readMore: { background: 'none', border: '1px solid #333', color: '#555', padding: '6px 10px', cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.75rem', alignSelf: 'flex-start', transition: '0.3s' },
    loaderContainer: { height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#050505' },
    loaderText: { color: '#00ff41', fontFamily: 'monospace', marginBottom: '15px', letterSpacing: '2px' },
    progressBar: { width: '150px', height: '1px', background: '#00ff41', boxShadow: '0 0 15px #00ff41' },
    noData: { gridColumn: '1/-1', textAlign: 'center', padding: '4rem', fontFamily: 'monospace' }
};

export default Feed;