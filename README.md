# 🗺️ Araguessr - Juego de Geografía de Aragón

<div align="center">

![Araguessr Banner](https://img.shields.io/badge/Araguessr-Geografia_de_Aragon-D62828?style=for-the-badge&logo=map&logoColor=white)

**Aprende la geografía de Aragón de forma divertida e interactiva**

[![Deploy](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://cloirdev.github.io/araguessr/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

[🎮 Jugar Ahora](https://cloirdev.github.io/araguessr/) • [📖 Documentación](#características) • [🐛 Reportar Bug](https://github.com/cloirdev/araguessr/issues)

</div>

---

## 📸 Preview

<div align="center">
  <img src="https://via.placeholder.com/800x450/0f0f1e/F77F00?text=Araguessr+Screenshot" alt="Araguessr Screenshot" width="100%">
</div>

## ✨ Características

### 🎮 Modos de Juego
- **🗺️ Comarcas de Aragón**: Aprende las 33 comarcas aragonesas
- **🌊 Ríos de Aragón**: Identifica los principales ríos (3 niveles de dificultad)
- **🏘️ Municipios de Aragón**: Localiza ciudades y pueblos (modo fácil y difícil)

### 🏆 Sistema de Puntuación Avanzado
- **Puntos base**: 100 puntos por acierto
- **⚡ Bonus por velocidad**: Multiplicador x1.5 por respuestas rápidas (<3 segundos)
- **🔥 Sistema de rachas**: +10% de bonus por cada acierto consecutivo
- **❌ Penalizaciones**: -10 puntos por fallo

### 🎯 Sistema de Logros (10 disponibles)
- 🎯 **Primer Triunfo** - Completa tu primera partida
- 💎 **Perfeccionista** - Completa una partida sin fallos
- 🗺️ **Maestro de Comarcas** - 100% de aciertos en comarcas
- ⚡ **Velocista** - Completa en menos de 3 minutos
- 🔥 **Racha Imparable** - 10 aciertos consecutivos
- 🧭 **Explorador** - Prueba todos los modos
- 🎮 **Dedicación** - Juega 10 partidas
- 🌊 **Experto en Ríos** - Completa ríos en difícil
- 🏘️ **Pro de Municipios** - Completa municipios en difícil
- 👑 **Leyenda de Aragón** - Desbloquea todos los logros

### 📊 Estadísticas Completas
- 📈 Récords personales por modo y dificultad
- 🎯 Precisión promedio global
- ⏱️ Tiempo promedio de partidas
- 📉 Elementos más difíciles (tracking de fallos)
- 📜 Historial de partidas

### 🔊 Efectos de Sonido
- ✅ Sonido de acierto
- ❌ Sonido de error
- 🔥 Sonido especial de racha (cada 3 aciertos)
- 🎵 Melodía de victoria
- 🔇 Toggle para activar/desactivar

### 🎨 Diseño Profesional
- 🌙 **Tema oscuro moderno** con gradientes sutiles
- ✨ **Animaciones suaves** y micro-interacciones
- 📱 **100% Responsive** - Funciona en móvil, tablet y desktop
- ♿ **Accesible** - ARIA labels, navegación por teclado
- 🎯 **Sistema de diseño cohesivo** con variables CSS

### 📱 PWA (Progressive Web App)
- 📲 Instalable en dispositivos móviles y desktop
- 🌐 Funciona offline después de la primera carga
- ⚡ Service worker para cache inteligente
- 🔄 Auto-actualización de contenido

## 🚀 Demo en Vivo

**👉 [Juega Ahora en GitHub Pages](https://cloirdev.github.io/araguessr/)**

## 🛠️ Tecnologías

- **⚛️ React 19** - Framework UI
- **⚡ Vite 7** - Build tool y dev server ultra-rápido
- **🎨 CSS3** - Variables CSS, Grid, Flexbox, Animaciones
- **🔊 Web Audio API** - Efectos de sonido sin dependencias
- **💾 LocalStorage** - Persistencia de datos
- **📱 PWA** - Progressive Web App con service worker
- **🎯 ESLint** - Linting y calidad de código

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/cloirdev/araguessr.git
cd juego-aragon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 🚀 Despliegue en GitHub Pages

El proyecto está configurado para desplegarse automáticamente en GitHub Pages:

```bash
# Desplegar manualmente
npm run deploy
```

El comando `deploy` ejecuta:
1. `npm run build` - Compila la aplicación
2. `gh-pages -d dist` - Despliega la carpeta dist a la rama gh-pages

**URL de producción**: https://cloirdev.github.io/araguessr/

## 📁 Estructura del Proyecto

```
juego-aragon/
├── public/
│   ├── favicon.svg
│   └── mapaAragon.svg
├── src/
│   ├── assets/           # SVG del mapa de Aragón
│   ├── components/       # Componentes React
│   │   ├── MapaAragon.jsx
│   │   ├── Menu.jsx
│   │   └── Stats.jsx
│   ├── constants/        # Constantes del juego
│   │   └── gameConstants.js
│   ├── data/            # Datos JSON (comarcas, ríos, municipios)
│   ├── hooks/           # Custom React hooks
│   │   ├── useGameTimer.js
│   │   └── useGameScore.js
│   ├── utils/           # Utilidades
│   │   ├── achievements.js
│   │   ├── elementos.js
│   │   ├── sounds.js
│   │   ├── storage.js
│   │   └── tiempo.js
│   ├── design-system.css  # Sistema de diseño
│   ├── App.jsx           # Componente principal
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Características Técnicas

### Sistema de Diseño
- **Variables CSS** para colores, tipografía, espaciados
- **Paleta cohesiva** con colores de Aragón (rojo, dorado, amarillo)
- **Gradientes profesionales** y efectos de glow
- **Animaciones** con curvas bezier optimizadas

### Optimizaciones
- ✅ React.memo para componentes
- ✅ useMemo para cálculos pesados
- ✅ useCallback para funciones
- ✅ useRef para timer (evita memory leaks)
- ✅ Lazy loading preparado
- ✅ Service Worker para cache

### Accesibilidad
- ✅ ARIA labels en elementos interactivos
- ✅ Roles semánticos
- ✅ Focus visible con outline personalizado
- ✅ aria-live para actualizaciones dinámicas
- ✅ Navegación por teclado

## 🎮 Cómo Jugar

1. **Introduce tu nombre** en el menú principal
2. **Selecciona un modo de juego** (Comarcas, Ríos o Municipios)
3. **Elige la dificultad** (si aplica)
4. **Lee el nombre** del elemento que aparece
5. **Haz clic** en el mapa donde crees que está
6. **Observa el feedback**:
   - 🟢 Verde = Acierto (ganas puntos)
   - 🔴 Rojo = Fallo (pierdes puntos)
7. **Continúa** hasta completar todos los elementos
8. **Revisa tus estadísticas** al finalizar

### Mecánica del Juego
- Cada elemento aparece **solo una vez**
- Aciertes o falles, **siempre avanzas** al siguiente
- Al final ves tu **porcentaje de aciertos**
- Los elementos **se marcan en el mapa** (verde/rojo)

## 📊 Sistema de Puntuación

```
Puntuación = Puntos Base × Bonus Tiempo × Multiplicador Racha

- Puntos Base: 100 por acierto
- Bonus Tiempo: ×1.5 si respondes en menos de 3 segundos
- Multiplicador Racha: 1 + (racha × 0.1)
  Ejemplo: Racha de 5 = ×1.5 (150% de puntos)
  
Penalizaciones:
- Fallo: -10 puntos
- Usar hint: -30 puntos
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Por favor asegúrate de:
- ✅ Ejecutar `npm run lint` antes de hacer commit
- ✅ Probar tu código en diferentes navegadores
- ✅ Mantener el estilo de código consistente

## 🐛 Reportar Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/cloirdev/araguessr/issues) con:
- Descripción detallada del problema
- Pasos para reproducirlo
- Navegador y versión
- Screenshots si es posible

## 📝 Roadmap

### 🚧 En desarrollo
- [ ] Modo Contra Reloj (tiempo límite global)
- [ ] Modo Multijugador Local (turnos entre jugadores)
- [ ] Sistema de Hints/Pistas con penalización
- [ ] Desafío Diario (mismo set para todos)
- [ ] Tests unitarios con Vitest
- [ ] Migración a TypeScript

### 💡 Ideas futuras
- [ ] Leaderboard global (backend requerido)
- [ ] Más regiones de España
- [ ] Modo educativo con información detallada
- [ ] Exportar/compartir resultados en redes sociales

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**CLope**
- GitHub: [@cloirdev](https://github.com/cloirdev)
- Proyecto: [Araguessr](https://github.com/cloirdev/araguessr)

## 🙏 Agradecimientos

- Datos geográficos de Aragón
- Iconos y emojis de sistema
- Comunidad de React y Vite
- Todos los que juegan y aprenden con Araguessr

---

<div align="center">

**⭐ Si te gusta el proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ en Aragón 🏔️

[⬆ Volver arriba](#-araguessr---juego-de-geografía-de-aragón)

</div>
