import React, { useState } from 'react';
import { ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';

interface AuditWizardModalProps {
  onBack: () => void;
}

interface TestPreset {
  name: string;
  category: string;
  defaultAnswers: [boolean, boolean, boolean, boolean]; // Q1, Q2, Q3, Q4
  explanation: string;
}

const PRESET_APPS: TestPreset[] = [
  {
    name: 'Notion',
    category: 'Gestión / Notas',
    defaultAnswers: [false, true, true, false],
    explanation: 'Trampa clásica de teatro de productividad: el alumno pasa horas diseñando bases de datos, iconos y plantillas sin fijar contenidos en la memoria de trabajo.',
  },
  {
    name: 'Quizlet con IA',
    category: 'Tarjetas de Memoria',
    defaultAnswers: [true, false, false, false],
    explanation: 'Riesgo cognitivo severo: delegar la creación de tarjetas en la IA anula el 50% de la codificación activa primaria. Fichas pasivas y frágiles.',
  },
  {
    name: 'GoodNotes (Método Cornell)',
    category: 'Toma de Notas Manuscrita',
    defaultAnswers: [true, true, false, true],
    explanation: 'Herramienta aprobada: la grafomotricidad sobre lápiz digital preserva la retención neurológica y la estructura Cornell fuerza la síntesis activa.',
  },
  {
    name: 'Anki (Algoritmo SM-2 Manual)',
    category: 'Repetición Espaciada',
    defaultAnswers: [true, true, false, true],
    explanation: 'Herramienta de oro: respaldada por evidencia científica en recuperación activa. Sin florituras estéticas ni distracciones.',
  },
  {
    name: 'Habitica',
    category: 'Gamificación de Hábitos',
    defaultAnswers: [false, false, true, false],
    explanation: 'Teatro de productividad: el tiempo invertido en equipar avatares, mascotas y misiones supera ampliamente el tiempo de estudio real.',
  },
];

export const AuditWizardModal: React.FC<AuditWizardModalProps> = ({ onBack }) => {
  const [appName, setAppName] = useState('Notion');
  const [q1, setQ1] = useState<boolean>(false); // Used >= 3 times in 2 weeks for real task?
  const [q2, setQ2] = useState<boolean>(true);  // Demands mental effort instead of thinking for you?
  const [q3, setQ3] = useState<boolean>(true);  // Spend more time tweaking aesthetics than studying?
  const [q4, setQ4] = useState<boolean>(false); // If uninstalled right now, would exam grades drop?

  const loadPreset = (preset: TestPreset) => {
    setAppName(preset.name);
    setQ1(preset.defaultAnswers[0]);
    setQ2(preset.defaultAnswers[1]);
    setQ3(preset.defaultAnswers[2]);
    setQ4(preset.defaultAnswers[3]);
  };

  // Evaluation algorithm
  // Healthy tool: Q1 = YES, Q2 = YES, Q3 = NO, Q4 = YES
  let score = 0;
  if (q1) score += 1;
  if (q2) score += 2; // Critical cognitive preservation
  if (!q3) score += 2; // Low friction / no productivity theater
  if (q4) score += 1; // Real curriculum dependency

  const isSafe = score >= 5 && q2 && !q3;
  const isDangerous = q3 || !q2 || score <= 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
          PROTOCOLO DE AUDITORÍA FRICCIONANTE DE 15 MINUTOS
        </div>
      </div>

      {/* Hero Title */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '42px', letterSpacing: '-1.5px', marginBottom: '8px' }}>
          Auditoría de 4 Preguntas & Purgado Digital
        </h1>
        <p style={{ fontSize: '18px', color: '#555566' }}>
          Evalúa cualquier aplicación educativa para erradicar el "teatro de productividad" y blindar
          la regla de las <strong>Tres que se Quedan</strong>.
        </p>
      </div>

      {/* Interactive App Diagnostic Form */}
      <div
        className="superhi-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '860px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
            PRUEBA RÁPIDA DE APLICACIÓN:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESET_APPS.map((p) => (
              <button
                key={p.name}
                onClick={() => loadPreset(p)}
                className={`tag-pill ${appName === p.name ? 'active' : ''}`}
                style={{ cursor: 'pointer', fontSize: '13px' }}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="O escribe el nombre de otra aplicación..."
              className="superhi-input"
              style={{ fontSize: '15px' }}
            />
          </div>
        </div>

        {/* The 4 Friction Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Q1 */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '15px', color: 'var(--color-ink-black)' }}>
                <strong>1. Frecuencia real de uso:</strong> ¿Has abierto <em>{appName}</em> al menos 3
                veces en las últimas dos semanas para completar una tarea real de clase?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setQ1(true)}
                className={`tag-pill ${q1 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Sí
              </button>
              <button
                onClick={() => setQ1(false)}
                className={`tag-pill ${!q1 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                No
              </button>
            </div>
          </div>

          {/* Q2 */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '15px', color: 'var(--color-ink-black)' }}>
                <strong>2. Esfuerzo cognitivo activo:</strong> ¿Esta herramienta te exige el esfuerzo
                mental de resumir, sintetizar o memorizar, o está haciendo el trabajo de pensar por ti?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setQ2(true)}
                className={`tag-pill ${q2 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Me exige pensar
              </button>
              <button
                onClick={() => setQ2(false)}
                className={`tag-pill ${!q2 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Piensa por mí
              </button>
            </div>
          </div>

          {/* Q3 */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '15px', color: 'var(--color-ink-black)' }}>
                <strong>3. Parálisis estética (Teatro de Productividad):</strong> ¿Inviertes más tiempo
                configurando colores, fuentes, bases de datos o avatares que estudiando el temario?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setQ3(true)}
                className={`tag-pill ${q3 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Sí, pierdo tiempo
              </button>
              <button
                onClick={() => setQ3(false)}
                className={`tag-pill ${!q3 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                No, voy al grano
              </button>
            </div>
          </div>

          {/* Q4 */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '15px', color: 'var(--color-ink-black)' }}>
                <strong>4. Impacto académico real:</strong> Si desinstalas <em>{appName}</em> en este
                preciso instante, ¿afectará negativamente a tu calificación en los exámenes de la próxima
                semana?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setQ4(true)}
                className={`tag-pill ${q4 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Sí, me afectaría
              </button>
              <button
                onClick={() => setQ4(false)}
                className={`tag-pill ${!q4 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                No me afectaría
              </button>
            </div>
          </div>
        </div>

        {/* Verdict Box */}
        <div
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-small)',
            border: `2px solid ${isSafe ? '#16ab59' : isDangerous ? '#ff4141' : '#f4a261'}`,
            backgroundColor: isSafe ? '#f0fff4' : isDangerous ? '#fff1f0' : '#fff8f0',
            boxShadow: '0 3px 0 0 #111118',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}
        >
          {isSafe ? (
            <CheckCircle2 size={32} color="#16ab59" style={{ flexShrink: 0 }} />
          ) : (
            <Trash2 size={32} color="#ff4141" style={{ flexShrink: 0 }} />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '14px',
                color: isSafe ? '#16ab59' : '#ff4141',
              }}
            >
              DICTAMEN DE LA AUDITORÍA ({score}/6 PUNTOS):
            </div>
            <div style={{ fontSize: '18px', color: 'var(--color-ink-black)' }}>
              {isSafe ? (
                <strong>✅ APROBADA: Pertenece a las "Tres que se Quedan"</strong>
              ) : isDangerous ? (
                <strong>❌ DESINSTALAR INMEDIATAMENTE (Teatro de Productividad)</strong>
              ) : (
                <strong>⚠️ EN OBSERVACIÓN: Reducir configuración estética</strong>
              )}
            </div>
            <div style={{ fontSize: '14px', color: '#555566', marginTop: '4px', lineHeight: 1.4 }}>
              {isSafe
                ? `${appName} fomenta la codificación activa o reduce la fricción sin atrapar la atención del alumno en distracciones secundarias.`
                : `${appName} introduce sobrecarga en la memoria de trabajo y fomenta la falsa ilusión de productividad. Desinstalarla despeja la atención para 2º de la ESO.`}
            </div>
          </div>
        </div>
      </div>

      {/* 6-Week Cleanup Protocol (Section 5.2) */}
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
          Protocolo de Revisión Continua del Sistema (Cada 6 Semanas)
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              num: '1',
              title: 'Auditoría de Tiempo de Pantalla',
              desc: 'Revisar informe de Tiempo de Uso (iOS) o Bienestar Digital (Android) para identificar apps de alta permanencia y nulo valor pedagógico.',
            },
            {
              num: '2',
              title: 'Regla de las "Tres que se Quedan"',
              desc: 'Desinstalar software secundario hasta dejar solo 1 de enfoque (YPT/Forest), 1 de notas/recuperación (GoodNotes/Anki) y 1 de planificación.',
            },
            {
              num: '3',
              title: 'Purgado de Accesos Directos',
              desc: 'Eliminar de la pantalla de inicio cualquier icono de app no abierta en más de 14 días. Mantener la pantalla limpia de estímulos.',
            },
            {
              num: '4',
              title: 'Verificación de Límites del SO',
              desc: 'Comprobar que el límite de 1 minuto para redes sociales en Ajustes permanezca protegido con código confidencial de padres o tutores.',
            },
          ].map((step) => (
            <div key={step.num} className="superhi-card" style={{ padding: '16px' }}>
              <div
                className="font-mono"
                style={{
                  fontSize: '20px',
                  color: 'var(--color-electric-iris)',
                  marginBottom: '6px',
                }}
              >
                Paso 0{step.num}
              </div>
              <div style={{ fontSize: '16px', marginBottom: '6px' }}>
                <strong>{step.title}</strong>
              </div>
              <div style={{ fontSize: '13px', color: '#555566', lineHeight: 1.4 }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
