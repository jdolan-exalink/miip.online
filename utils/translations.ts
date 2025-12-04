export type Language = 'en' | 'es' | 'pt';

export const translations = {
  en: {
    nav: {
      tools: 'Tools',
      tutorials: 'Tutorials',
      contact: 'Contact',
      footer: 'Simple, fast, and secure network tools.',
    },
    home: {
      title: 'Tools for',
      subtitle: 'miip.online',
      desc: 'Essential utilities, calculators, and reference guides for your daily workflow. Fast, free, and privacy-focused.',
      openTool: 'Open Tool',
      quickIp: {
        title: 'Your Connection',
        loading: 'Detecting...',
        error: 'Could not detect IP',
        provider: 'Provider',
        location: 'Location',
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have a question or suggestion? Send us a message.',
      form: {
        name: 'Name',
        email: 'Email Address',
        message: 'Inquiry / Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message. Please try again.',
        note: 'This form sends your inquiry directly to our support team.',
      }
    },
    tools: {
      myIp: {
        name: 'What is my IP',
        desc: 'Detailed public IP and geolocation info.',
        title: 'My Connection Details',
        publicIp: 'Public IPv4',
        location: 'Location',
        isp: 'Provider / ASN',
        country: 'Country',
        city: 'City',
        ipv4: 'IPv4 Address',
        ipv6: 'IPv6 Address',
        notDetected: 'Not Detected / Unavailable',
      },
      subnet: {
        name: 'Subnet Calculator',
        desc: 'CIDR to mask, broadcast, and range.',
      },
      rj45: {
        name: 'RJ45 Visualizer',
        desc: 'T568A vs T568B wiring schemes.',
      },
      dns: {
        name: 'DNS Lookup',
        desc: 'Check A, MX, NS records instantly.',
      },
      port: {
        name: 'Port Checker',
        desc: 'Test open ports on an external IP.',
      },
      password: {
        name: 'Secure Password',
        desc: 'Generate strong, random credentials.',
        title: 'Secure Password Generator',
        generate: 'Generate New',
        copy: 'Copy',
        copied: 'Copied!',
        length: 'Length',
        settings: 'Settings',
        uppercase: 'A-Z Uppercase',
        lowercase: 'a-z Lowercase',
        numbers: '0-9 Numbers',
        symbols: '!@# Symbols',
      }
    }
  },
  es: {
    nav: {
      tools: 'Herramientas',
      tutorials: 'Tutoriales',
      contact: 'Contacto',
      footer: 'Herramientas de red simples, rápidas y seguras.',
    },
    home: {
      title: 'Herramientas para',
      subtitle: 'miip.online',
      desc: 'Utilidades esenciales, calculadoras y guías de referencia para tu flujo de trabajo diario. Rápido, gratis y privado.',
      openTool: 'Abrir Herramienta',
      quickIp: {
        title: 'Tu Conexión',
        loading: 'Detectando...',
        error: 'No se pudo detectar IP',
        provider: 'Proveedor',
        location: 'Ubicación',
      }
    },
    contact: {
      title: 'Contáctanos',
      subtitle: '¿Tienes una consulta o sugerencia? Envíanos un mensaje.',
      form: {
        name: 'Nombre',
        email: 'Correo Electrónico',
        message: 'Consulta',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado con éxito!',
        error: 'Error al enviar. Intente nuevamente.',
        note: 'Este formulario envía tu consulta directamente a nuestro equipo de soporte.',
      }
    },
    tools: {
      myIp: {
        name: 'Cuál es mi IP',
        desc: 'Información detallada de IP pública y geolocalización.',
        title: 'Detalles de mi Conexión',
        publicIp: 'IPv4 Pública',
        location: 'Ubicación',
        isp: 'Proveedor / ASN',
        country: 'País',
        city: 'Ciudad',
        ipv4: 'Dirección IPv4',
        ipv6: 'Dirección IPv6',
        notDetected: 'No Detectado / No Disponible',
      },
      subnet: {
        name: 'Calculadora IP',
        desc: 'CIDR a máscara, broadcast y rango.',
      },
      rj45: {
        name: 'Esquema RJ45',
        desc: 'Esquemas de cableado T568A vs T568B.',
      },
      dns: {
        name: 'Búsqueda DNS',
        desc: 'Verifica registros A, MX, NS al instante.',
      },
      port: {
        name: 'Probador de Puertos',
        desc: 'Prueba puertos abiertos en una IP externa.',
      },
      password: {
        name: 'Contraseña Segura',
        desc: 'Genera credenciales fuertes y aleatorias.',
        title: 'Generador de Contraseñas',
        generate: 'Generar Nueva',
        copy: 'Copiar',
        copied: '¡Copiado!',
        length: 'Longitud',
        settings: 'Configuración',
        uppercase: 'A-Z Mayúsculas',
        lowercase: 'a-z Minúsculas',
        numbers: '0-9 Números',
        symbols: '!@# Símbolos',
      }
    }
  },
  pt: {
    nav: {
      tools: 'Ferramentas',
      tutorials: 'Tutoriais',
      contact: 'Contato',
      footer: 'Ferramentas de rede simples, rápidas e seguras.',
    },
    home: {
      title: 'Ferramentas para',
      subtitle: 'miip.online',
      desc: 'Utilitários essenciais, calculadoras e guias de referência para seu fluxo de trabalho diário. Rápido, gratuito e privado.',
      openTool: 'Abrir Ferramenta',
      quickIp: {
        title: 'Sua Conexão',
        loading: 'Detectando...',
        error: 'Não foi possível detectar IP',
        provider: 'Provedor',
        location: 'Localização',
      }
    },
    contact: {
      title: 'Contate-nos',
      subtitle: 'Tem alguma dúvida ou sugestão? Envie-nos uma mensagem.',
      form: {
        name: 'Nome',
        email: 'E-mail',
        message: 'Consulta',
        submit: 'Enviar Mensagem',
        sending: 'Enviando...',
        success: 'Mensagem enviada com sucesso!',
        error: 'Erro ao enviar. Tente novamente.',
        note: 'Este formulário envia sua consulta diretamente para nossa equipe de suporte.',
      }
    },
    tools: {
      myIp: {
        name: 'Qual é meu IP',
        desc: 'Informações detalhadas de IP público e geolocalização.',
        title: 'Detalhes da minha Conexão',
        publicIp: 'IPv4 Público',
        location: 'Localização',
        isp: 'Provedor / ASN',
        country: 'País',
        city: 'Cidade',
        ipv4: 'Endereço IPv4',
        ipv6: 'Endereço IPv6',
        notDetected: 'Não Detectado / Indisponível',
      },
      subnet: {
        name: 'Calculadora IP',
        desc: 'CIDR para máscara, broadcast e intervalo.',
      },
      rj45: {
        name: 'Visualizador RJ45',
        desc: 'Esquemas de fiação T568A vs T568B.',
      },
      dns: {
        name: 'Consulta DNS',
        desc: 'Verifique registros A, MX, NS instantaneamente.',
      },
      port: {
        name: 'Verificador de Portas',
        desc: 'Teste portas abertas em um IP externo.',
      },
      password: {
        name: 'Senha Segura',
        desc: 'Gere credenciais fortes e aleatórias.',
        title: 'Gerador de Senhas',
        generate: 'Gerar Nova',
        copy: 'Copiar',
        copied: 'Copiado!',
        length: 'Comprimento',
        settings: 'Configurações',
        uppercase: 'A-Z Maiúsculas',
        lowercase: 'a-z Minúsculas',
        numbers: '0-9 Números',
        symbols: '!@# Símbolos',
      }
    }
  }
};