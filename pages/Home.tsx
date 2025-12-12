import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Calculator, Cable, Radio, Search, Shield, ArrowRight, MapPin, Server, AlertCircle, Copy, Check } from 'lucide-react';
import AdsenseBlock from '../components/AdsenseBlock';
import { useLanguage } from '../context/LanguageContext';
import { IpInfo } from '../types';
import { getPublicIpInfo } from '../utils/networkLogic';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [quickIp, setQuickIp] = useState<IpInfo | null>(null);
  const [loadingIp, setLoadingIp] = useState(true);
  const [copied, setCopied] = useState(false);

  // Tools definition with dynamic text access (done in render to update on lang change)
  const getTools = () => [
    { id: 'my-ip', name: t.tools.myIp.name, desc: t.tools.myIp.desc, icon: Globe, path: '/tools/my-ip', color: 'text-blue-500' },
    { id: 'subnet', name: t.tools.subnet.name, desc: t.tools.subnet.desc, icon: Calculator, path: '/tools/subnet', color: 'text-indigo-500' },
    { id: 'rj45', name: t.tools.rj45.name, desc: t.tools.rj45.desc, icon: Cable, path: '/tools/rj45', color: 'text-orange-500' },
    { id: 'dns', name: t.tools.dns.name, desc: t.tools.dns.desc, icon: Search, path: '/tools/dns', color: 'text-purple-500' },
    { id: 'port', name: t.tools.port.name, desc: t.tools.port.desc, icon: Radio, path: '/tools/port', color: 'text-red-500' },
    { id: 'pass', name: t.tools.password.name, desc: t.tools.password.desc, icon: Shield, path: '/tools/password', color: 'text-emerald-500' },
  ];

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const data = await getPublicIpInfo();
        setQuickIp(data);
      } catch (e) {
        console.error("IP Fetch failed", e);
      } finally {
        setLoadingIp(false);
      }
    };
    fetchIp();
  }, []);

  const copyIp = () => {
    if (quickIp?.ip) {
      navigator.clipboard.writeText(quickIp.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero */}
      <div className="text-center space-y-4 py-4 md:py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          miip<span className="text-primary-600 dark:text-primary-500">.online</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          {t.home.desc}
        </p>
      </div>

      {/* Quick IP Widget - Showing Immediately on Enter */}
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 shadow-lg text-white p-6 md:p-8">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Globe size={120} />
           </div>
           
           <div className="relative z-10">
              <h2 className="text-blue-100 font-medium text-sm uppercase tracking-wide mb-2">{t.home.quickIp.title}</h2>
              {loadingIp ? (
                <div className="flex gap-4 items-center">
                    <div className="animate-pulse h-12 w-48 bg-white/20 rounded"></div>
                    <div className="animate-pulse h-6 w-32 bg-white/20 rounded"></div>
                </div>
              ) : quickIp ? (
                 <div className="flex flex-col md:flex-row md:items-end gap-6">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                           <div className="text-4xl md:text-5xl font-mono font-bold tracking-tight">{quickIp.ip}</div>
                           <button 
                             onClick={copyIp} 
                             className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 transition backdrop-blur-sm flex items-center gap-2"
                             title={t.tools.password.copy}
                           >
                              {copied ? <Check size={20} className="text-green-300" /> : <Copy size={20} />}
                              {copied && <span className="text-sm font-medium text-green-300">{t.tools.password.copied}</span>}
                           </button>
                       </div>
                       <div className="flex flex-wrap gap-4 text-sm md:text-base text-blue-100">
                          <span className="flex items-center gap-1.5"><Server size={16}/> {quickIp.org}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={16}/> {quickIp.city}, {quickIp.country_name}</span>
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="flex items-center gap-2 text-red-200 bg-red-900/30 p-3 rounded-lg border border-red-500/30 inline-flex">
                    <AlertCircle size={20} />
                    {t.home.quickIp.error}
                 </div>
              )}
           </div>
        </div>
      </div>

      <AdsenseBlock slotId="home-hero-1" className="max-w-3xl mx-auto" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getTools().map((tool) => (
          <Link 
            key={tool.id} 
            to={tool.path}
            className="group relative bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div className={`inline-flex p-3 rounded-lg bg-gray-50 dark:bg-dark-800 ${tool.color} mb-4`}>
              <tool.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 h-10 line-clamp-2">
              {tool.desc}
            </p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              {t.home.openTool} <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <AdsenseBlock slotId="home-footer-1" />

      {/* SEO Content Section */}
      <div className="max-w-3xl mx-auto space-y-8 mt-12 border-t border-gray-200 dark:border-gray-800 pt-12">
        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Herramientas de Networking Online - Cuál es mi IP
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            En <strong>MIIP</strong>, ofrecemos una colección completa de herramientas online gratis para profesionales de IT, estudiantes y usuarios que necesitan soluciones rápidas y confiables de networking.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            ¿Quieres saber cuál es tu IP pública? Nuestro servicio te muestra tu dirección IP al instante, junto con información sobre tu ubicación geográfica, proveedor de internet (ISP) y más. Todo sin necesidad de registrarte, completamente gratis y seguro.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Por qué usar MIIP
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-primary-600 font-bold mt-1">✓</span>
              <span><strong>Herramientas gratuitas sin límites:</strong> Acceso ilimitado a todas nuestras utilidades sin costo</span>
            </li>
            <li className="flex gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-primary-600 font-bold mt-1">✓</span>
              <span><strong>Información inmediata:</strong> Obtén tu IP pública en milisegundos con detalles completos</span>
            </li>
            <li className="flex gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-primary-600 font-bold mt-1">✓</span>
              <span><strong>Calculadora IP profesional:</strong> Calcula subnets, CIDR, máscaras y rangos con precisión</span>
            </li>
            <li className="flex gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-primary-600 font-bold mt-1">✓</span>
              <span><strong>Generador de contraseñas seguras:</strong> Crea passwords fuertes y aleatorias con un click</span>
            </li>
            <li className="flex gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-primary-600 font-bold mt-1">✓</span>
              <span><strong>Guía RJ45 interactiva:</strong> Aprende los colores de cables T568A y T568B con visualización en vivo</span>
            </li>
            <li className="flex gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-primary-600 font-bold mt-1">✓</span>
              <span><strong>Privacidad garantizada:</strong> No almacenamos datos personales, todo ocurre en tu navegador</span>
            </li>
          </ul>
        </div>

        {/* Tools Overview */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nuestras Herramientas de Networking
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ver mi IP Pública</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Descubre tu dirección IP pública al instante. Obtén información sobre tu ISP, ciudad, país, coordenadas geográficas y más. Perfecta para diagnosticar problemas de conexión, comprobar si tu IP está siendo bloqueada o simplemente entender tu infraestructura de red.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Calculadora IP / CIDR</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Herramienta profesional para administradores de red. Calcula subnets, máscaras de red, direcciones de broadcast, cantidad de hosts disponibles y mucho más. Soporta notación CIDR (ej: 192.168.1.0/24) para un trabajo rápido y eficiente.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Generador de Contraseñas Seguras</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Crea contraseñas criptográficamente seguras en segundos. Personaliza la longitud, incluye mayúsculas, minúsculas, números y símbolos. Ideal para proteger tus cuentas, servidores y aplicaciones contra accesos no autorizados.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tabla de Colores RJ45 (T568A / T568B)</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Guía visual interactiva de los dos estándares de cableado Ethernet. Aprende cómo ordenar los colores correctamente: Blanco-Verde, Verde, Blanco-Naranja, Azul, Blanco-Azul, Naranja, Blanco-Marrón, Marrón. Indispensable para técnicos de cableado y profesionales de redes.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Consultas DNS</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Realiza búsquedas DNS profundas de cualquier dominio. Obtén registros A, AAAA, MX, TXT, NS, CNAME y más. Útil para debugging de dominios, verificación de configuración de correo y diagnóstico de problemas de conectividad.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verificador de Puertos</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Comprueba si un puerto está abierto o cerrado en un servidor. Diagnóstico rápido para verificar firewalls, configuración de routers y servicios en ejecución. Esencial para administración de servidores y troubleshooting de conectividad.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Preguntas Frecuentes
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">¿Cuál es la diferencia entre IP pública y privada?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Tu <strong>IP pública</strong> es la dirección asignada por tu proveedor de internet (ISP) y es visible en todo internet. Tu <strong>IP privada</strong> (como 192.168.1.x o 10.0.0.x) está restringida a tu red local y no es accesible desde internet. Puedes ver ambas en nuestra herramienta.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">¿Cómo funciona la notación CIDR?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                CIDR (Classless Inter-Domain Routing) es una forma compacta de expresar redes IP. Por ejemplo, 192.168.1.0/24 significa: dirección base 192.168.1.0 con una máscara de 24 bits (255.255.255.0). Nuestra calculadora convierte automáticamente entre CIDR y notación de máscara tradicional.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">¿Qué hace que una contraseña sea segura?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Una buena contraseña debe tener: al menos 12-16 caracteres, mezcla de mayúsculas y minúsculas, números y símbolos especiales. Nuestro generador crea contraseñas criptográficamente aleatorias que son prácticamente imposibles de adivinar.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">¿Cuándo usar T568A vs T568B?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Ambos estándares funcionan correctamente. Lo importante es ser consistente en todo tu instalación. T568A es más común en nuevas instalaciones. T568B se usa a menudo en instalaciones legacy. Nuestra guía interactiva te muestra ambos órdenes visualmente.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">¿Es seguro usar herramientas online para obtener mi IP?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Sí. Tu IP pública es información que ya es visible en internet. No compartimos ni guardamos datos personales. Todos nuestros cálculos ocurren en tu navegador, sin enviar información a servidores externos (excepto la consulta de IP que es pública por naturaleza).
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-primary-200 dark:border-primary-800 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Necesitas más herramientas?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explora nuestra colección completa de utilidades de networking, diseñadas para profesionales de IT y entusiastas de seguridad informática.
          </p>
          <Link 
            to="/tutorials"
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Ver Tutoriales
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;