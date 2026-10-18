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
    category: 'Gestió / Notes',
    defaultAnswers: [false, true, true, false],
    explanation: 'Parany clàssic de teatre de productivitat: l\'alumne passa hores dissenyant bases de dades, icones i plantilles sense fixar continguts a la memòria de treball.',
  },
  {
    name: 'Quizlet amb IA',
    category: 'Targetes de Memòria',
    defaultAnswers: [true, false, false, false],
    explanation: 'Risc cognitiu sever: delegar la creació de targetes a la IA anul·la el 50% de la codificació activa primària. Fitxes passives i fràgils.',
  },
  {
    name: 'GoodNotes (Mètode Cornell)',
    category: 'Presa de Notes Manuscrita',
    defaultAnswers: [true, true, false, true],
    explanation: 'Eina aprovada: la grafomotricitat amb llapis digital preserva la retenció neurològica i l\'estructura Cornell força la síntesi activa.',
  },
  {
    name: 'Anki (Algorisme SM-2 Manual)',
    category: 'Repetició Espaiada',
    defaultAnswers: [true, true, false, true],
    explanation: 'Eina d\'or: recolzada per evidència científica en recuperació activa. Sense floritures estètiques ni distraccions.',
  },
  {
    name: 'Habitica',
    category: 'Gamificació d\'Hàbits',
    defaultAnswers: [false, false, true, false],
    explanation: 'Teatre de productivitat: el temps invertit a equipar avatars, mascotes i missions supera amb escreix el temps d\'estudi real.',
  },
];

export const AuditWizardModal: React.FC<AuditWizardModalProps> = ({ onBack }) => {
  const [appName, setAppName] = useState('Notion');
  const [q1, setQ1] = useState<boolean>(false);
  const [q2, setQ2] = useState<boolean>(true);
  const [q3, setQ3] = useState<boolean>(true);
  const [q4, setQ4] = useState<boolean>(false);

  const loadPreset = (preset: TestPreset) => {
    setAppName(preset.name);
    setQ1(preset.defaultAnswers[0]);
    setQ2(preset.defaultAnswers[1]);
    setQ3(preset.defaultAnswers[2]);
    setQ4(preset.defaultAnswers[3]);
  };

  // Evaluation algorithm
  let score = 0;
  if (q1) score += 1;
  if (q2) score += 2;
  if (!q3) score += 2;
  if (q4) score += 1;

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
          <span>Tornar al Tauler</span>
        </button>

        <div className="tag-mono" style={{ backgroundColor: '#ffffff', border: '1px solid #111118' }}>
          PROTOCOL D'AUDITORIA FRICCIONANT DE 15 MINUTS
        </div>
      </div>

      {/* Hero Title */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '42px', letterSpacing: '-1.5px', marginBottom: '8px' }}>
          Auditoria de 4 Preguntes & Purga Digital
        </h1>
        <p style={{ fontSize: '18px', color: '#555566' }}>
          Avalua qualsevol aplicació educativa per a erradicar el "teatre de productivitat" i blindar
          la regla de les <strong>Tres que es Queden</strong>.
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
            PROVA RÀPIDA D'APLICACIÓ:
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
              placeholder="O escriu el nom d'una altra aplicació..."
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
                <strong>1. Freqüència real d'ús:</strong> Has obert <em>{appName}</em> almenys 3
                vegades en les últimes dues setmanes per a completar una tasca real de classe?
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
                <strong>2. Esforç cognitiu actiu:</strong> Aquesta eina t'exigeix l'esforç
                mental de resumir, sintetitzar o memoritzar, o està fent la faena de pensar per tu?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setQ2(true)}
                className={`tag-pill ${q2 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                M'exigeix pensar
              </button>
              <button
                onClick={() => setQ2(false)}
                className={`tag-pill ${!q2 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Pensa per mi
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
                <strong>3. Paràlisi estètica (Teatre de Productivitat):</strong> Inverteixes més temps
                configurant colors, fonts, bases de dades o avatars que estudiant el temari?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setQ3(true)}
                className={`tag-pill ${q3 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Sí, perd temps
              </button>
              <button
                onClick={() => setQ3(false)}
                className={`tag-pill ${!q3 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                No, vaig al gra
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
                <strong>4. Impacte acadèmic real:</strong> Si desinstal·les <em>{appName}</em> en aquest
                precís instant, afectarà negativament la teua qualificació en els exàmens de la pròxima
                setmana?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setQ4(true)}
                className={`tag-pill ${q4 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                Sí, m'afectaria
              </button>
              <button
                onClick={() => setQ4(false)}
                className={`tag-pill ${!q4 ? 'active' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px' }}
              >
                No m'afectaria
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
              DICTAMEN DE L'AUDITORIA ({score}/6 PUNTS):
            </div>
            <div style={{ fontSize: '18px', color: 'var(--color-ink-black)' }}>
              {isSafe ? (
                <strong>✅ APROVADA: Pertany a les "Tres que es Queden"</strong>
              ) : isDangerous ? (
                <strong>❌ DESINSTAL·LAR IMMEDIATAMENT (Teatre de Productivitat)</strong>
              ) : (
                <strong>⚠️ EN OBSERVACIÓ: Reduir configuració estètica</strong>
              )}
            </div>
            <div style={{ fontSize: '14px', color: '#555566', marginTop: '4px', lineHeight: 1.4 }}>
              {isSafe
                ? `${appName} fomenta la codificació activa o redueix la fricció sense atrapar l'atenció de l'alumne en distraccions secundàries.`
                : `${appName} introdueix sobrecàrrega a la memòria de treball i fomenta la falsa il·lusió de productivitat. Desinstal·lar-la aclareix l'atenció per a 2n d'ESO.`}
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
          Protocol de Revisió Contínua del Sistema (Cada 6 Setmanes)
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
              title: 'Auditoria de Temps de Pantalla',
              desc: 'Revisar informe de Temps d\'Ús (iOS) o Benestar Digital (Android) per a identificar apps d\'alta permanència i nul valor pedagògic.',
            },
            {
              num: '2',
              title: 'Regla de les "Tres que es Queden"',
              desc: 'Desinstal·lar programari secundari fins a deixar només 1 d\'enfocament (YPT/Forest), 1 de notes/recuperació (GoodNotes/Anki) i 1 de planificació.',
            },
            {
              num: '3',
              title: 'Purga d\'Accessos Directes',
              desc: 'Eliminar de la pantalla d\'inici qualsevol icona d\'app no oberta en més de 14 dies. Mantindre la pantalla neta d\'estímuls.',
            },
            {
              num: '4',
              title: 'Verificació de Límits del SO',
              desc: 'Comprovar que el límit d\'1 minut per a xarxes socials en Paràmetres romanga protegit amb codi confidencial de pares o tutors.',
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
                Pas 0{step.num}
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
