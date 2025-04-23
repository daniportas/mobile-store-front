# 📱 Mobile Store - SPA en React

Esta aplicación es una **Single Page Application (SPA)** desarrollada con **React** y **TailwindCSS**, cuyo objetivo es simular una tienda online de dispositivos móviles.

🌍 **Prueba la demo online**: 👉 [https://silly-zabaione-0aba4c.netlify.app/](https://silly-zabaione-0aba4c.netlify.app/)

Incluye funcionalidades como listado y detalle de productos, gestión de carrito, filtros, ordenación, tests y más.

---

## 📖 Índice

- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-cómo-ejecutar-el-proyecto)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Arquitectura y patrones](#-arquitectura-y-patrones)
- [Decisiones de diseño](#-decisiones-de-diseño)
- [Gestión del estado](#-gestión-del-estado)
- [Cacheo de datos](#-cacheo-de-datos)
- [Tests](#-tests)
- [Responsividad y estilos](#-responsividad-y-estilos)
- [Mejoras realizadas](#-mejoras-realizadas)
- [Por hacer](#-por-hacer)
- [Conclusiones](#-conclusiones)
- [Notas adicionales](#-notas-adicionales)

---

## 🚀 Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [React Hot Toast](https://react-hot-toast.com/)

---

## 🔧 Cómo ejecutar el proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/daniportas/mobile-store.git
cd mobile-store
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta en modo desarrollo:
```bash
npm run start
```

---

## 📦 Scripts disponibles

```bash
npm run start     # Arranca la app en modo desarrollo
npm run build     # Genera el build para producción
npm run lint      # Ejecuta el linter con ESLint
npm run test      # Ejecuta tests unitarios/integración con Vitest
npm run test:e2e  # Ejecuta tests e2e con Playwright (requiere que la app esté corriendo)
```

---

## 🧱 Estructura del proyecto

```
playwright/            # Tests e2e con Playwright
src/
├── __tests__/         # Tests integración (Vitest)
├── api/               # Lógica de API y cache
├── components/        # Componentes reutilizables
├── context/           # Context API (Carrito, producto actual)
├── pages/             # Vistas PLP y PDP
├── routes/            # Enrutado centralizado
├── utils/             # Funciones utilitarias (filtros, orden)
├── App.jsx            # Layout principal
└── main.jsx           # Punto de entrada
```

---

## 🏛️ Arquitectura y patrones

Se ha optado por una **arquitectura por capas** con separación de responsabilidades clara:

- **api/**: acceso a datos + lógica de cache.
- **components/**: presentación desacoplada, reutilizable.
- **context/**: lógica de estado global.
- **pages/**: vistas acopladas a rutas.
- **utils/**: lógica independiente de la UI.

**Patrones usados**:

- Container/Presentational
- Custom Hooks
- Principios **SOLID**, especialmente SRP y OCP.

---

## 💡 Decisiones de diseño

- Uso de **React Router** para navegación SPA sin recarga.
- Lógica de presentación separada en componentes reutilizables.
- Estilos con **TailwindCSS desde cero** para evitar dependencias externas.
- Fallback de error e icono visual en errores de carga.
- Botón “vaciar carrito” en hover como mejora UX.

---

## 🗂️ Gestión del estado

Se utiliza **Context API** para globalizar:

- Carrito (`CartContext`): contador + persistencia.
- Detalle de producto (`ProductContext`): compartición entre rutas.

Evita el uso de Redux por simplicidad y escalabilidad suficiente.

---

## 📦 Cacheo de datos

La lógica en `api/products.js` implementa cache manual:

- Guarda los resultados de llamadas `GET` en `localStorage`.
- Añade un `timestamp` con fecha de expiración (1 hora).
- Evita recargas innecesarias del mismo producto o listado.

---

---

## 🧪 Tests

Se han implementado distintos tipos de tests para asegurar el buen funcionamiento y la mantenibilidad de la aplicación:

### ✅ Unitarios

**Herramientas**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

Se testean de forma aislada:

- **Hooks personalizados**:
  - `useFilteredProducts`, `useProductSorting`, `useLocalStorage`, `useProductDetail`
  - Validación de filtros, ordenación, cacheo y actualizaciones de estado.

- **Componentes de UI**:
  - `SearchBar`, `Pagination`, `ProductCard`, `ProductFilters`, `ProductTabs`, `ProductOptions`, `ApiError`, `Breadcrumb`, etc.
  - Renderizado correcto, respuesta a props y accesibilidad básica (`aria-*`, roles, etc).

---

### ✅ Tests de integración

Se testea la interacción entre componentes, rutas, contexto y API simulada:

- Página de listado (`PageProductList`):
  - Carga inicial de productos.
  - Búsqueda por nombre.
  - Filtro por marca.
  - Cambio de página en la paginación.

- Página de detalle (`PageProductDetail`):
  - Renderizado completo del producto.
  - Selección de color y almacenamiento.
  - Añadir al carrito.

---

### ✅ Tests end-to-end (E2E)

**Herramienta**: [Playwright](https://playwright.dev/)

Simulación de flujo completo de usuario real:

- Carga inicial de listado.
- Uso del buscador.
- Aplicación de filtros.
- Acceso al detalle del producto.
- Interacción con el carrito.
- Validación de mensajes visuales (toasts).

```bash
npm run test:e2e
```

---

## 📱 Responsividad y estilos

- 100% **responsive**, tanto en PLP como PDP.
- Estilado desde cero con **TailwindCSS**, sin UI kits externos.
- Se emplean clases semánticas y utilidades para legibilidad.

---

## 🚀 Mejoras realizadas

- Header siempre visible con carrito.
- Botón de vaciado del carrito al hacer hover.
- Página de error 404 personalizada con mensaje y navegación.
- Iconos visuales para mensajes de error.
- Filtro y ordenación en tiempo real.
- Navegación entre rutas fluida con React Router.
- Tests E2E completos.
- Consola limpia de errores y advertencias.
- Separación estricta de lógica y presentación.
- Uso de `eslint` + `prettier`.

---

## 📋 Por hacer

- Añadir favoritos en header.
- Internacionalización.
- Gestión de carrito
- Migración a **TypeScript** para tipado completo.
- Optimización de build con `mode production`.

---

## ✅ Conclusiones

La aplicación ha sido diseñada con foco en la **modularidad**, **escalabilidad** y **buena experiencia de usuario**. El código está separado en capas, probado y con decisiones razonadas que demuestran conocimiento profundo del stack. Es una base sólida para una aplicación real en producción.

---

## 📝 Notas adicionales

- Aunque se prefiere el uso de **TypeScript** por los beneficios que aporta en escalabilidad y mantenimiento, el enunciado de la prueba especificaba no usarlo. Por tanto, todo el código ha sido escrito en JavaScript con validación manual y PropTypes en su caso.

- Las funcionalidades de **paginación**, **búsqueda** y **filtros** se han implementado en el **frontend** por limitación del endpoint proporcionado. En un entorno real, esta lógica debería delegarse al servidor para optimizar rendimiento y carga de datos.

- El sistema de **cacheo en localStorage** mejora la experiencia de usuario al evitar solicitudes innecesarias, aunque en una arquitectura robusta se debería combinar con SWR/React Query u otra herramienta dedicada.

- Algunas funcionalidades adicionales (como multidioma o carrito avanzado) no se han implementado aún por cuestiones de tiempo y alcance. Sin embargo, la arquitectura actual permite una fácil integración de estas mejoras en el futuro.

---

> Si tienes dudas o sugerencias, ¡no dudes en contactar! 🚀
