# Debug Logs Reference

Se han agregado logs de debugging estratégicos en toda la aplicación para rastrear el flujo de ejecución. Cuando la página quede en blanco en Vercel, abre la consola del navegador (F12) para ver dónde se detiene la ejecución.

## Flujo esperado de logs

En orden, deberías ver estos logs en la consola:

### 1. **index.tsx** - Entry Point
```
[DEBUG] index.tsx: Starting application...
[DEBUG] index.tsx: Root element found, creating React root...
[DEBUG] index.tsx: React root created, rendering App component...
[DEBUG] index.tsx: App component render called
```

### 2. **App.tsx** - Componente Principal
```
[DEBUG] App.tsx: Module loaded
[DEBUG] App.tsx: App component rendering...
```

### 3. **LanguageContext.tsx** - Provider de Contexto
```
[DEBUG] LanguageProvider: Initializing...
[DEBUG] LanguageProvider: useEffect hook running
[DEBUG] LanguageProvider: Saved language from localStorage: (valor o null)
[DEBUG] LanguageProvider: Browser language: (idioma del navegador)
[DEBUG] LanguageProvider: Setting language to [en/es/pt] (selected)
[DEBUG] LanguageProvider: Current language state: (idioma)
```

### 4. **Layout.tsx** - Componente Layout
```
[DEBUG] Layout.tsx: Component rendering...
[DEBUG] Layout.tsx: Language context retrieved, current language: (idioma)
[DEBUG] Layout.tsx: Current location: / (ruta actual)
[DEBUG] Layout.tsx: useEffect for theme management running
[DEBUG] Layout.tsx: useEffect for menu closing on route change
[DEBUG] Layout.tsx: Rendering layout with children
```

### 5. **RouteObserver** en App.tsx
```
[DEBUG] RouteObserver: Current route: / (ruta actual)
[DEBUG] RouteObserver: Analytics logged for: / (ruta actual)
```

## Puntos donde puede fallar:

1. **Si falta el primer log** → Problema en index.tsx o en el HTML (`index.html`)
   - Verifica que exista `<div id="root"></div>` en `index.html`

2. **Si faltan logs de LanguageProvider** → Problema con imports o LanguageContext
   - Verifica que `translations.ts` se importe correctamente

3. **Si faltan logs de Layout** → Problema al obtener el contexto
   - Verifica que `useLanguage()` se llame dentro del Provider

4. **Si todo está en blanco después de los logs** → Problema en Home.tsx u otro componente de página
   - Agrega más logs en `pages/Home.tsx`

## Cómo usar:

1. Sube los cambios a Vercel
2. Abre tu sitio en el navegador
3. Presiona F12 para abrir las DevTools
4. Ve a la pestaña "Console"
5. Busca los logs que comiencen con `[DEBUG]` y `[ERROR]`
6. Identifica dónde se detiene la ejecución
7. Comparte los logs conmigo para ayudarte a depurar

## Logs adicionales para referencia:

Si necesitas agregar más logs, aquí hay puntos estratégicos:

- **pages/Home.tsx**: Agrega log al principio del componente
- **components/GoogleAnalytics.tsx**: Verifica que se inicialice correctamente
- **utils/analyticsBackend.ts**: Agrega logs en la función `logVisit()`
- **utils/translations.ts**: Verifica que los datos de traducción se carguen

---

**Nota**: Estos logs solo aparecen en desarrollo y en Vercel. Una vez resuelto el problema, puedes removerlos o dejarlos comentados.
