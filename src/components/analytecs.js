import ReactGA from 'react-ga4';

// 📡 Inicializar el Radar con su ID de Medición de Google
export const initRadar = () => {
  // Reemplace 'G-XXXXXXXXXX' con su código real de Google Analytics
  const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'; 
  ReactGA.initialize(MEASUREMENT_ID);
  console.log('✅ Radar GA4 Inicializado y a la espera de señales.');
};

// 📡 Disparar un pulso al satélite de Google
export const sendPulse = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};