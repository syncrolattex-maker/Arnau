# Orbital 2º ESO — Entorno de Aprendizaje Autónomo

> **Especificación Arquitectónica y Diseño de Flujo de Trabajo Digital para Alumno de 2º de la ESO**  
> Diseñado según la guía de estilo **SuperHi** (*Paper-cut shapes scattered across a pale-blue classroom wall*).

---

## 🎯 Visión y Propósito Pedagógico

Durante 2º de la Educación Secundaria Obligatoria (13-14 años), el alumnado experimenta un salto cualitativo en la exigencia curricular (materias STEM abstractas y alta carga conceptual en humanidades).

En este escenario, el alumno medio suele acumular hasta 14 aplicaciones de estudio, cayendo en el **"Teatro de Productividad"**: invertir horas en la microgestión de interfaces, bases de datos o avatares sin generar retención ni codificación cognitiva real.

**Orbital 2º ESO** implementa una arquitectura digital austera y libre de fricción gobernada por dos principios:
1. **La regla de las "Tres que se Quedan"**: 1 de enfoque/bloqueo, 1 de notas/recuperación y 1 de planificación simple.
2. **Invisibilidad tecnológica**: Inicio de la sesión de estudio en **menos de 5 segundos**.

---

## 🚀 Características Principales

### 1. Los 4 Cuadrantes del Alumno
- **⏱️ Cuadrante 1: Enfoque Inmediato & Bloqueo Activo:**
  - Selector de asignaturas con paleta estandarizada WCAG AAA.
  - Temporizador con cálculo de tiempo neto: $T_{\text{neto}} = (end - start) - \sum(pause_{\text{end}} - pause_{\text{start}})$.
  - **Modo TDAH / Déficit de Atención (Time Timer):** Disco visual analógico-digital decreciente que elimina la ceguera temporal.
  - Bloqueador visual de redes sociales (`ACTIVO / Límite 1 min`).
  - Monedas virtuales en tiempo real (1 min = 1 moneda).
- **📋 Cuadrante 2: Planificación Diaria & D-Day Exámenes:**
  - Límite estricto de **máximo 5 tareas críticas diarias** para evitar sobrecarga decisional.
  - Contadores regresivos D-Day con resaltado de urgencia (`D-2`, `D-5`).
  - Botón de entrada rápida por voz (Siri / Google Assistant).
- **🧠 Cuadrante 3: Memorización y Recuperación Activa (Anki SM-2):**
  - Implementación matemática real del algoritmo SM-2:
    $$EF' = \max\left(1.3, EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))\right)$$
  - Calificación de esfuerzo de recuperación: `0: Repetir`, `3: Difícil`, `4: Bien`, `5: Fácil`.
  - Pistas sintéticas del método Cornell.
  - Alerta pedagógica contra Quizlet AI (la IA no debe pensar por el alumno).
- **🌴 Cuadrante 4: Isla Compartida & Amigos en Directo:**
  - Isla 3D/SVG colaborativa que florece conforme el grupo suma minutos colectivos de estudio.
  - Círculo cerrado seguro (máximo 6 amigos) sin ránkings públicos para prevenir toxicidad.
  - Presencia en vivo y sala de **Body-Doubling virtual** para activar neuronas espejo.

### 2. Vistas Especializadas
- **📊 Subject Ratio (29 Días):** Gráfico Donut SVG interactivo con alerta parpadeante si alguna materia cae por debajo del 10% del tiempo acumulado, y mapa de calor mensual de 4 niveles (estilo YPT).
- **🛡️ Auditoría de 4 Preguntas:** Evaluador interactivo de software para erradicar aplicaciones superfluas y protocolo de revisión de cada 6 semanas.
- **📖 Marco Pedagógico:** Documentación exhaustiva con evidencia científica (incluyendo el estudio de la Universidad de Texas sobre el impacto del smartphone en la memoria de trabajo).

---

## 🎨 Sistema de Diseño (SuperHi Reference)

- **Lienzo:** `#f0f6ff` (Chalk Blue).
- **Superficie de Tarjetas:** `#ffffff` (Paper White) con borde `#e1edff` y sombra dura de pegatina `0 2px 0 0 #111118`.
- **Botón de Acción Principal (CTA):** `#2727e6` (Electric Iris) con flecha final `→` y sombra dura `0 4px 0 0 #111118`.
- **Capa Decorativa de Recortes (*Paper-Cut*):** Pentágonos, triángulos, semicírculos, estrellas y círculos flotantes desbordando el lienzo en colores planos: `#ffda00`, `#ff4141`, `#ffbac4`, `#91d8ec`, `#16ab59`.
- **Tipografía:** Peso uniforme 400 sin negritas artificiales (`Space Grotesk`, `Inter`) y `Martian Mono` para el *ticker* superior y metadatos.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Iconografía:** Lucide React
- **Efectos:** Canvas Confetti + Web Audio API sintético
- **Persistencia:** LocalStorage en el navegador

---

## 💻 Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/syncrolattex-maker/Arnau.git
cd Arnau

# 2. Instalar dependencias
npm install --legacy-peer-deps

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```
