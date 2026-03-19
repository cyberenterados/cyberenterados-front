import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Salida fluida sin alertas molestas
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>{'>_'} CYBER-NEWS</Link>
            
            <div style={styles.links}>
                {token ? (
                    <div style={styles.authGroup}>
                        <span style={styles.welcome}>Comandante 🎖️</span>
                        {/* 🚀 Atajo rápido al formulario de noticias */}
                        <Link to="/publicar" style={styles.postBtn}>+ NOTICIA</Link>
                        <button onClick={handleLogout} style={styles.logoutBtn}>SALIR</button>
                    </div>
                ) : (
                    <Link to="/login" style={styles.loginLink}>INGRESAR</Link>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0.8rem 2rem', 
        background: '#0a0a0a', 
        borderBottom: '2px solid #00ff41',
        boxShadow: '0 4px 10px rgba(0, 255, 65, 0.1)'
    },
    logo: { 
        color: '#00ff41', 
        textDecoration: 'none', 
        fontWeight: '900', 
        fontSize: '1.4rem',
        fontFamily: 'monospace' 
    },
    authGroup: { display: 'flex', alignItems: 'center', gap: '15px' },
    welcome: { color: '#fff', fontSize: '0.9rem', opacity: 0.8 },
    postBtn: { 
        background: '#00ff41', 
        color: '#000', 
        textDecoration: 'none', 
        padding: '5px 12px', 
        borderRadius: '4px', 
        fontSize: '0.8rem', 
        fontWeight: 'bold' 
    },
    logoutBtn: { 
        background: 'transparent', 
        color: '#ff4b2b', 
        border: '1px solid #ff4b2b', 
        padding: '4px 10px', 
        cursor: 'pointer', 
        borderRadius: '4px',
        fontSize: '0.8rem'
    },
    loginLink: { color: '#00ff41', textDecoration: 'none', fontWeight: 'bold' }
};

export default Navbar;