import React from 'react';
import { ArrowLeft, BookOpen, Brain, Smartphone, Cpu, Heart } from 'lucide-react';

interface PedagogicalGuideModalProps {
  onBack: () => void;
}

export const PedagogicalGuideModal: React.FC<PedagogicalGuideModalProps> = ({ onBack }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          className="btn-ghost"
          style={{ padding: '8px 12px', fontSize: '15px' }}
        >
          <ArrowLeft size={16} />
          <span>Volver al Dashboard</span>
        </button>

        <div className="tag-mono" style={{ backgroundColor: '#ffffff', border: '1px solid #111118' }}>
          MARCO ESTRATÉGICO & PEDAGÓGICO DE 2º DE LA ESO
        </div>
      </div>

      {/* Hero Title */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '42px', letterSpacing: '-1.5px', marginBottom: '8px' }}>
          Especificación Arquitectónica y Diseño de Flujo de Trabajo Digital
        </h1>
        <p style={{ fontSize: '18px', color: '#555566' }}>
          Guía de implementación de entornos digitales libres de fricción para alumnos de 13 a 14 años.
          Fundamentado en psicología cognitiva y evidencia empírica.
        </p>
      </div>

      {/* Section 1: Pedagogical Diagnosis & UT Texas Study */}
      <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="round-icon-36">
            <Brain size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', margin: 0 }}>
              1. Diagnóstico Pedagógico y Riesgos del "Teatro de Productividad"
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Franja etaria 13-14 años (2º ESO) · Desarrollo del córtex prefrontal
            </span>
          </div>
        </div>

        <div style={{ fontSize: '16px', lineHeight: 1.6, color: '#222233', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>
            Durante 2º de la ESO, el alumnado experimenta un salto cualitativo en la exigencia curricular:
            mayor nivel de abstracción en materias STEM (Física y Química, Matemáticas) y un volumen
            considerable de carga conceptual en asignaturas de memoria y análisis (Biología y Geología,
            Geografía e Historia, Lengua).
          </p>

          <p>
            <strong>La patología del "Teatro de Productividad":</strong> Al auditar el dispositivo de un alumno
            medio se detectan hasta 14 aplicaciones distintas (Notion, Quizlet, Habitica, Forest, Anki, Photomath,
            ChatGPT, Brainly, etc.). El estudiante invierte horas en formatear bases de datos, personalizar iconos
            y navegar entre pestañas, generando la ilusión de estar estudiando sin que se produzca codificación
            cognitiva ni fijación en la memoria a largo plazo.
          </p>
        </div>

        {/* UT Texas Study Highlight Box */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#fffbe6',
            borderRadius: 'var(--radius-small)',
            border: '2px solid #ffe58f',
            boxShadow: '0 2px 0 0 #111118',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
          }}
        >
          <Smartphone size={24} color="#d48806" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#533f03' }}>
            <strong>Hallazgo de la Universidad de Texas (Brain Drain Effect):</strong> La mera presencia física
            del smartphone sobre la mesa de estudio —incluso apagado, boca abajo o en silencio— reduce
            significativamente la capacidad de la memoria de trabajo. El cerebro del adolescente agota recursos
            atencionales de forma subconsciente inhibiendo el impulso de consultar notificaciones. Por tanto, el
            móvil debe salir físicamente del área de estudio o aislarse en límites infranqueables de 1 minuto.
          </div>
        </div>
      </div>

      {/* Section 2: Three That Stay & Comparison Matrix */}
      <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="round-icon-36">
            <BookOpen size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', margin: 0 }}>
              2. La Regla de las "Tres que se Quedan" & Matriz de Herramientas
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Consolidación e invisibilidad operativa
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
              fontFamily: 'var(--font-haas-grot-text)',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--color-chalk-blue)', textAlign: 'left' }}>
                <th style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontFamily: 'var(--font-martian-mono)', fontSize: '12px' }}>
                  CATEGORÍA
                </th>
                <th style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontFamily: 'var(--font-martian-mono)', fontSize: '12px' }}>
                  HERRAMIENTA
                </th>
                <th style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontFamily: 'var(--font-martian-mono)', fontSize: '12px' }}>
                  MECANISMO COGNITIVO
                </th>
                <th style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontFamily: 'var(--font-martian-mono)', fontSize: '12px', color: '#ff4141' }}>
                  RIESGO A EVITAR
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Enfoque y Tiempo
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  YPT / Forest / Time Timer
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Reducción de carga atencional mediante intervalos estructurados y bloqueo activo de apps.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Perder horas diseñando avatares o mecánicas complejas en Habitica.
                </td>
              </tr>
              <tr style={{ backgroundColor: '#fafcff' }}>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Toma de Notas
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  GoodNotes / Notability (Cornell)
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Codificación activa mediante grafomotricidad digital manuscrita y estructuración sintética Cornell.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Configurar interminables bases de datos y propiedades cosméticas en Notion.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Memorización
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Anki (Algoritmo SM-2)
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Repetición espaciada y recuperación activa matemática en el momento óptimo de la curva del olvido.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Usar Quizlet AI para autogenerar tarjetas: se anula el 50% de la codificación inicial.
                </td>
              </tr>
              <tr style={{ backgroundColor: '#fafcff' }}>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Planificación
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Apple Reminders / Google Cal
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Externalización inmediata de la memoria de trabajo con activación por voz y cero fricción.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Gestores de tareas sobrecargados que se abandonan tras cambiar la primera fecha.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Apoyo con IA
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  NotebookLM / Khanmigo
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Tutoría socrática guiada paso a paso que verifica la comprensión conceptual sin dar respuestas directas.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Delegar la redacción en ChatGPT o Claude, suprimiendo el pensamiento del estudiante.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Technical Architecture Antigravity & Stitch */}
      <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="round-icon-36">
            <Cpu size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', margin: 0 }}>
              3. Pipeline de Especificación Técnica: Antigravity & Stitch
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Separación tajante de backend algorítmico e interfaz limpia
            </span>
          </div>
        </div>

        {/* ASCII/Box Diagram from Section 3 */}
        <div
          className="font-mono"
          style={{
            backgroundColor: '#111118',
            color: '#91d8ec',
            padding: '18px',
            borderRadius: 'var(--radius-small)',
            fontSize: '12px',
            lineHeight: 1.4,
            overflowX: 'auto',
          }}
        >
          <pre>{`+-----------------------------------------------------------------------------------+
| PIPELINE DE ESPECIFICACIÓN TÉCNICA Y FLUJO DE DATOS                               |
+-----------------------------------------------------------------------------------+
| [ FRONTEND: STITCH ]                                                              |
|   ├── Componente Temporizador (Selección Asignatura / Estado Bloqueo)              |
|   ├── Dashboard Visual (Gráficos Subject Ratio / Mapa de Calor / D-Day)           |
|   └── Feed Social Privado (Estado en tiempo real / Isla 3D compartida)           |
+-----------------------------------------------------------------------------------+
                                         │
                         (REST API / WebSockets JSON)
                                         ▼
+-----------------------------------------------------------------------------------+
| [ BACKEND: ANTIGRAVITY ]                                                          |
|   ├── Processing Engine: Cómputo de Tiempos Netos e Intervalos                    |
|   ├── Spaced Repetition Engine: Algoritmo SM-2 (Cálculo de EF e Intervalos)       |
|   ├── Gamification Service: Conversión Tiempos -> Monedas / Crecimiento Jardín    |
|   └── Social & Privacy Controller: Leaderboards Privados (Filtro Anti-Toxicidad) |
+-----------------------------------------------------------------------------------+`}</pre>
        </div>

        <div style={{ fontSize: '15px', color: '#333344', lineHeight: 1.5 }}>
          <strong>Lógica de Negocio y Reglas Críticas:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <strong>Tiempo Neto Activo:</strong> <code>T_neto = (end - start) - sum(pause_end - pause_start)</code>.
            </li>
            <li>
              <strong>Conversión Gamificada:</strong> 1 minuto de estudio enfocado = 1 Moneda Virtual.
            </li>
            <li>
              <strong>Fórmula SM-2:</strong> <code>EF' = max(1.3, EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))</code>.
            </li>
            <li>
              <strong>Protección Psicológica:</strong> Ránkings estrictamente privados (grupos de 6-8 amigos), vetando marcadores públicos globales para prevenir desmotivación y acoso escolar.
            </li>
          </ul>
        </div>
      </div>

      {/* Section 4: ADHD Adaptations */}
      <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="round-icon-36">
            <Heart size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', margin: 0 }}>
              4. Adaptaciones Específicas para Alumnos con TDAH / ADHD
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Externalización de la estructura temporal y minimización del coste ejecutivo
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
            }}
          >
            <div style={{ fontSize: '16px', marginBottom: '6px' }}>
              <strong>1. Disco Visual Decreciente (Time Timer)</strong>
            </div>
            <div style={{ fontSize: '13px', color: '#555566', lineHeight: 1.4 }}>
              Sustituye cifras numéricas regresivas (que generan ansiedad o ceguera temporal) por un
              sector circular que se vacía suavemente. Permite percibir el paso del tiempo de forma visual
              e intuitiva.
            </div>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
            }}
          >
            <div style={{ fontSize: '16px', marginBottom: '6px' }}>
              <strong>2. Captura por Comandos de Voz</strong>
            </div>
            <div style={{ fontSize: '13px', color: '#555566', lineHeight: 1.4 }}>
              La memoria de trabajo no retiene la apertura de apps manuales. El dictado inmediato a Siri o al
              Asistente de Google elimina la barrera motriz y agenda recordatorios con hora exacta en la pantalla
              de bloqueo.
            </div>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
            }}
          >
            <div style={{ fontSize: '16px', marginBottom: '6px' }}>
              <strong>3. Sala Silenciosa de Body-Doubling</strong>
            </div>
            <div style={{ fontSize: '13px', color: '#555566', lineHeight: 1.4 }}>
              Trabajar en paralelo y en silencio mientras se percibe la presencia activa de un compañero activa
              las neuronas espejo, reduce la divagación atencional y neutraliza la parálisis de inicio.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
