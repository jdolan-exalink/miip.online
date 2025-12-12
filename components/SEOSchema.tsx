import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SEOSchema: React.FC = () => {
  const { language } = useLanguage();
  const [locale, setLocale] = useState('es');

  useEffect(() => {
    setLocale(language);
  }, [language]);

  // Language-specific content
  const schemas = {
    en: {
      title: 'MIIP - Networking Tools Online',
      description: 'Free online networking tools: What is my IP, Subnet Calculator, Secure Password Generator, RJ45 Wiring Guide, DNS Lookup, Port Checker.',
      org: 'MIIP'
    },
    es: {
      title: 'MIIP - Herramientas de Networking Online',
      description: 'Herramientas online gratis: Cuál es mi IP, Calculadora IP, Generador de Contraseñas, Guía RJ45, Búsqueda DNS, Probador de Puertos.',
      org: 'MIIP'
    },
    pt: {
      title: 'MIIP - Ferramentas de Rede Online',
      description: 'Ferramentas de rede online grátis: Qual é meu IP, Calculadora IP, Gerador de Senhas, Guia RJ45, Consulta DNS, Verificador de Portas.',
      org: 'MIIP'
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": schemas[locale as keyof typeof schemas]?.title || schemas.en.title,
    "description": schemas[locale as keyof typeof schemas]?.description || schemas.en.description,
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
    }
  };

  const faqDataEn = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is my public IP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your public IP is the address that your internet service provider (ISP) assigns to your router. You can see it instantly using our My IP tool."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between public and private IP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your public IP is assigned by your ISP and visible on the internet. Your private IP is internal to your local network (ranges like 192.168.x.x, 10.0.0.x, 172.16-31.x.x) and not accessible from the internet."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use an IP CIDR calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter an IP address and subnet mask (e.g., 192.168.1.0/24) to get network information: range, broadcast, available hosts, etc."
        }
      },
      {
        "@type": "Question",
        "name": "What does T568A and T568B mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "These are two different standards for organizing RJ45 cable colors. T568A: White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown. T568B reverses the orange and green colors."
        }
      },
      {
        "@type": "Question",
        "name": "How do I generate a secure password?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A good password should have at least 12 characters and include uppercase, lowercase, numbers and special symbols. Our generator creates random and secure passwords automatically."
        }
      }
    ]
  };

  const faqDataEs = {
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

  const faqDataPt = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qual é meu IP público?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Seu IP público é o endereço que seu provedor de internet (ISP) atribui ao seu roteador. Você pode vê-lo instantaneamente usando nossa ferramenta My IP."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a diferença entre IP público e privado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Seu IP público é atribuído pelo seu ISP e visível na internet. Seu IP privado é interno à sua rede local (faixa 192.168.x.x, 10.0.0.x, 172.16-31.x.x) e não é acessível pela internet."
        }
      },
      {
        "@type": "Question",
        "name": "Como usar uma calculadora IP CIDR?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Digite um endereço IP e máscara de sub-rede (ex: 192.168.1.0/24) para obter informações de rede: intervalo, broadcast, hosts disponíveis, etc."
        }
      },
      {
        "@type": "Question",
        "name": "O que significa T568A e T568B?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "São dois padrões diferentes para organizar as cores dos cabos RJ45. T568A: Branco-Verde, Verde, Branco-Laranja, Azul, Branco-Azul, Laranja, Branco-Marrom, Marrom. T568B inverte as cores laranja e verde."
        }
      },
      {
        "@type": "Question",
        "name": "Como gerar uma senha segura?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uma boa senha deve ter pelo menos 12 caracteres e incluir maiúsculas, minúsculas, números e símbolos especiais. Nosso gerador cria senhas aleatórias e seguras automaticamente."
        }
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MIIP",
    "url": "https://miip.online",
    "description": "Free online networking tools for IT professionals and users",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://miip.online/contact"
    }
  };

  // Select FAQ based on language
  const faqData = locale === 'es' ? faqDataEs : locale === 'pt' ? faqDataPt : faqDataEn;

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
