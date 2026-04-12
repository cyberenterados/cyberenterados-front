import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "CyberEnterados News | Red Pública", 
  description = "Red pública de información tecnológica y cibernética. Transmitiendo conocimiento encriptado para la resistencia digital.", 
  image = "https://res.cloudinary.com/dyuirjynp/image/upload/v1774823745/cyberenterados_noticias/news_1774823744512.jpg", 
  url = "https://cyberenterados-front.vercel.app/",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* 🚀 Metadatos Estándar */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* 🚀 Open Graph (Para Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="CyberEnterados" />

      {/* 🚀 Twitter Cards (Para X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Añade tu usuario de Twitter aquí si lo deseas: */}
      <meta name="twitter:site" content="@cyberenterados" /> 
    </Helmet>
  );
};

export default SEO;