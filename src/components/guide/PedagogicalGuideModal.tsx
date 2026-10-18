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
          <span>Tornar al Tauler</span>
        </button>

        <div className="tag-mono" style={{ backgroundColor: '#ffffff', border: '1px solid #111118' }}>
          MARC ESTRATÈGIC & PEDAGÒGIC DE 2n D'ESO
        </div>
      </div>

      {/* Hero Title */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '42px', letterSpacing: '-1.5px', marginBottom: '8px' }}>
          Especificació Arquitectònica i Disseny de Flux de Treball Digital
        </h1>
        <p style={{ fontSize: '18px', color: '#555566' }}>
          Guia d'implementació d'entorns digitals lliures de fricció per a alumnes de 13 a 14 anys.
          Fonamentat en psicologia cognitiva i evidència empírica.
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
              1. Diagnòstic Pedagògic i Riscos del "Teatre de Productivitat"
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Franja d'edat 13-14 anys (2n ESO) · Desenvolupament del còrtex prefrontal
            </span>
          </div>
        </div>

        <div style={{ fontSize: '16px', lineHeight: 1.6, color: '#222233', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>
            Durant 2n d'ESO, l'alumnat experimenta un salt qualitatiu en l'exigència curricular:
            major nivell d'abstracció en matèries STEM (Física i Química, Matemàtiques) i un volum
            considerable de càrrega conceptual en assignatures de memòria i anàlisi (Geografia i Història,
            Valencià, Castellà).
          </p>

          <p>
            <strong>La patologia del "Teatre de Productivitat":</strong> En auditar el dispositiu d'un alumne
            mitjà es detecten fins a 14 aplicacions diferents (Notion, Quizlet, Habitica, Forest, Anki, Photomath,
            ChatGPT, Brainly, etc.). L'estudiant inverteix hores a formatar bases de dades, personalitzar icones
            i navegar entre pestanyes, generant la il·lusió d'estar estudiant sense que es produïsca codificació
            cognitiva ni fixació a la memòria a llarg termini.
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
            <strong>Troballa de la Universitat de Texas (Brain Drain Effect):</strong> La mera presència física
            de l'smartphone sobre la taula d'estudi —fins i tot apagat, de bocaterrosa o en silenci— redueix
            significativament la capacitat de la memòria de treball. El cervell de l'adolescent esgota recursos
            atencionals de forma subconscient inhibint l'impuls de consultar notificacions. Per tant, el
            mòbil ha d'eixir físicament de l'àrea d'estudi o aïllar-se en límits infranquejables d'1 minut.
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
              2. La Regla de les "Tres que es Queden" & Matriu d'Eines
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Consolidació i invisibilitat operativa
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
                  CATEGORIA
                </th>
                <th style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontFamily: 'var(--font-martian-mono)', fontSize: '12px' }}>
                  EINA
                </th>
                <th style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontFamily: 'var(--font-martian-mono)', fontSize: '12px' }}>
                  MECANISME COGNITIU
                </th>
                <th style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontFamily: 'var(--font-martian-mono)', fontSize: '12px', color: '#ff4141' }}>
                  RISC A EVITAR
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Enfocament i Temps
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  YPT / Forest / Time Timer
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Reducció de càrrega atencional mitjançant intervals estructurats i bloqueig actiu d'apps.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Perdre hores dissenyant avatars o mecàniques complexes en Habitica.
                </td>
              </tr>
              <tr style={{ backgroundColor: '#fafcff' }}>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Presa de Notes
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  GoodNotes / Notability (Cornell)
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Codificació activa mitjançant grafomotricitat digital manuscrita i estructuració sintètica Cornell.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Configurar interminables bases de dades i propietats cosmètiques en Notion.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Memorització
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Anki (Algorisme SM-2)
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Repetició espaiada i recuperació activa matemàtica en el moment òptim de la corba de l'oblit.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Utilitzar Quizlet AI per a autogenerar targetes: s'anul·la el 50% de la codificació inicial.
                </td>
              </tr>
              <tr style={{ backgroundColor: '#fafcff' }}>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Planificació
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Apple Reminders / Google Cal
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Externalització immediata de la memòria de treball amb activació per veu i zero fricció.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Gestors de tasques sobrecarregats que s'abandonen després de canviar la primera data.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', fontWeight: 600 }}>
                  Suport amb IA
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  NotebookLM / Khanmigo
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)' }}>
                  Tutoria socràtica guiada pas a pas que verifica la comprensió conceptual sense donar respostes directes.
                </td>
                <td style={{ padding: '12px', border: '1px solid var(--color-frost-blue)', color: '#ff4141' }}>
                  Delegar la redacció a ChatGPT o Claude, suprimint el pensament de l'estudiant.
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
              3. Pipeline d'Especificació Tècnica: Antigravity & Stitch
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Separació clara de backend algorítmic i interfície neta
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
| PIPELINE D'ESPECIFICACIÓ TÈCNICA I FLUX DE DADES                                  |
+-----------------------------------------------------------------------------------+
| [ FRONTEND: STITCH ]                                                              |
|   ├── Component Temporitzador (Selecció Assignatura / Estat Bloqueig)              |
|   ├── Tauler Visual (Gràfics Subject Ratio / Mapa de Calor / D-Day)               |
|   └── Feed Social Privat (Estat en temps real / Illa 3D compartida)              |
+-----------------------------------------------------------------------------------+
                                         │
                         (REST API / WebSockets JSON)
                                         ▼
+-----------------------------------------------------------------------------------+
| [ BACKEND: ANTIGRAVITY ]                                                          |
|   ├── Processing Engine: Còmput de Temps Nets i Intervals                         |
|   ├── Spaced Repetition Engine: Algorisme SM-2 (Càlcul d'EF i Intervals)          |
|   ├── Gamification Service: Conversió Temps -> Monedes / Creixement Jardí         |
|   └── Social & Privacy Controller: Leaderboards Privats (Filtre Anti-Toxicitat)   |
+-----------------------------------------------------------------------------------+`}</pre>
        </div>

        <div style={{ fontSize: '15px', color: '#333344', lineHeight: 1.5 }}>
          <strong>Lògica de Negoci i Regles Crítiques:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <strong>Temps Net Actiu:</strong> <code>T_net = (end - start) - sum(pause_end - pause_start)</code>.
            </li>
            <li>
              <strong>Conversió Gamificada:</strong> 1 minut d'estudi enfocat = 1 Moneda Virtual.
            </li>
            <li>
              <strong>Fórmula SM-2:</strong> <code>EF' = max(1.3, EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))</code>.
            </li>
            <li>
              <strong>Protecció Psicològica:</strong> Rànquings estrictament privats (grups de 6-8 companys), vetant marcadors públics globals per a previndre desmotivació i assetjament escolar.
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
              4. Adaptacions Específiques per a Alumnes amb TDAH / ADHD
            </h2>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              Externalització de l'estructura temporal i minimització del cost executiu
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
              <strong>1. Disc Visual Decreixent (Time Timer)</strong>
            </div>
            <div style={{ fontSize: '13px', color: '#555566', lineHeight: 1.4 }}>
              Substitueix xifres numèriques regressives (que generen ansietat o ceguesa temporal) per un
              sector circular que es buida suaument. Permet percebre el pas del temps de forma visual
              i intuïtiva.
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
              <strong>2. Captura per Comandaments de Veu</strong>
            </div>
            <div style={{ fontSize: '13px', color: '#555566', lineHeight: 1.4 }}>
              La memòria de treball no reté l'obertura d'apps manuals. El dictat immediat a Siri o a
              l'Assistent de Google elimina la barrera motriu i agenda recordatoris amb hora exacta a la pantalla
              de bloqueig.
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
              Treballar en paral·lel i en silenci mentre es percep la presència activa d'un company activa
              les neurones espill, redueix la divagació atencional i neutralitza la paràlisi d'inici.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
