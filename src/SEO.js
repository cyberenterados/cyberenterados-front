import React from 'react';
import { Helmet } from 'react-helmet'; // 🚀 Requiere react-helmet instalado

const SEO = ({ title, description, image, type, url, fecha }) => {
  const siteUrl = "https://cyberenterados.com.ar";
  const defaultImage = "https://res.cloudinary.com/dyuirjynp/image/upload/v1774823745/cyberenterados_noticias/news_1774823744512.jpg";

  // 🧠 EL NÚCLEO DE LA CIRUGÍA: Estructura JSON-LD para Googlebot
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "NewsArticle" : "WebSite",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url || siteUrl
    },
    "headline": title || "CyberEnterados News",
    "description": description || "Conocimiento encriptado para la resistencia digital.",
    "image": image ? [image] : [defaultImage],
    "author": {
      "@type": "Person",
      "name": "COMANDANTE",
      "url": "https://cyberenterados.github.io/ManuExplora-Dossier_identidad/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CyberEnterados News",
      "logo": {
        "@type": "ImageObject",
        "url": defaultImage
      }
    },
    // Si no hay fecha (Feed Principal), usa la fecha actual de los servidores
    "datePublished": fecha ? new Date(fecha).toISOString() : new Date().toISOString(),
    "dateModified": fecha ? new Date(fecha).toISOString() : new Date().toISOString()
  };

  return (
    <Helmet>
      {/* Balizas Meta Básicas y Open Graph */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image || defaultImage} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* 🚀 INYECCIÓN JSON-LD: El expediente secreto para Google News */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};

export default SEO;