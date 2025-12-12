import React from 'react';

const SEOSchema: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MIIP - Herramientas de Networking",
    "description": "Herramientas online gratis para networking: ver IP pública, calculadora IP CIDR, generador de contraseñas, colores RJ45",
    "url": "https://miip.online",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "price": "0",
      "priceValidUntil": "2026-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": "https://miip.online/tools/my-ip",
        "query-input": "required name=search_term_string"
      }
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuál es mi IP pública?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tu IP pública es la dirección que tu proveedor de internet asigna a tu router. Puedes verla al instante usando nuestra herramienta de My IP."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la diferencia entre IP pública y privada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La IP pública es asignada por tu ISP y visible en internet. La IP privada es interna a tu red local (rango 192.168.x.x, 10.0.0.x, 172.16-31.x.x) y no es accesible desde internet."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo usar una calculadora IP CIDR?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ingresa una dirección IP y máscara de subred (ej: 192.168.1.0/24) para obtener información sobre la red: rango, broadcast, hosts disponibles, etc."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué significa T568A y T568B?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Son dos estándares diferentes para organizar los colores de cables RJ45. T568A: Blanco-Verde, Verde, Blanco-Naranja, Azul, Blanco-Azul, Naranja, Blanco-Marrón, Marrón. T568B invierte los colores naranja y verde."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo generar una contraseña segura?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Una buena contraseña debe tener al menos 12 caracteres e incluir mayúsculas, minúsculas, números y símbolos especiales. Nuestro generador crea contraseñas aleatorias y seguras automáticamente."
        }
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MIIP",
    "url": "https://miip.online",
    "description": "Herramientas online gratis para profesionales de IT y usuarios que necesitan soluciones de networking",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://miip.online/contact"
    }
  };

  return (
    <>
      {/* Web Application Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </>
  );
};

export default SEOSchema;
