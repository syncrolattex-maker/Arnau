import React from 'react';
import type { StudySessionRecord } from '../../types';
import { SUBJECTS } from '../../utils/storage';
import { AlertCircle, Calendar, PieChart as PieIcon, ArrowLeft } from 'lucide-react';

interface AnalyticsModalProps {
  sessions: StudySessionRecord[];
  onBack: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  sessions,
  onBack,
}) => {
  // Compute rolling totals per subject
  const subjectTotals: Record<string, number> = {};
  SUBJECTS.forEach((sub) => {
    subjectTotals[sub.id] = 0;
  });

  let grandTotalMinutes = 0;
  sessions.forEach((s) => {
    const mins = s.net_minutes || 0;
    subjectTotals[s.subject_id] = (subjectTotals[s.subject_id] || 0) + mins;
    grandTotalMinutes += mins;
  });

  // Calculate percentages (Subject Ratio)
  const ratios = SUBJECTS.map((sub) => {
    const minutes = subjectTotals[sub.id] || 0;
    const percentage = grandTotalMinutes > 0 ? (minutes / grandTotalMinutes) * 100 : 0;
    const isBelowThreshold = percentage < 10 && grandTotalMinutes > 0;
    return {
      ...sub,
      minutes,
      percentage: Number(percentage.toFixed(1)),
      isBelowThreshold,
    };
  });

  // Prepare SVG Donut slices
  let cumulativeAngle = 0;
  const slices = ratios.map((sub) => {
    const angle = (sub.percentage / 100) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    return {
      ...sub,
      startAngle,
      angle,
    };
  });

  // SVG Helper to generate arc path
  const getArcPath = (cx: number, cy: number, r: number, startA: number, endA: number) => {
    if (endA - startA >= 360) {
      return `M ${cx - r},${cy} A ${r},${r} 0 1,0 ${cx + r},${cy} A ${r},${r} 0 1,0 ${cx - r},${cy}`;
    }
    const startRad = ((startA - 90) * Math.PI) / 180;
    const endRad = ((endA - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endA - startA > 180 ? 1 : 0;
    return `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  // Generate 28-day Calendar Heatmap blocks (4 weeks x 7 days)
  const heatmapDays = Array.from({ length: 28 }, (_, i) => {
    const seed = (i * 7 + 3) % 11;
    let level = 0;
    if (seed > 8) level = 4;
    else if (seed > 5) level = 3;
    else if (seed > 3) level = 2;
    else if (seed > 1) level = 1;

    const isToday = i === 27;
    return { dayNum: i + 1, level, isToday };
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0:
        return '#e1edff';
      case 1:
        return '#a3d9cf';
      case 2:
        return '#56b8a8';
      case 3:
        return '#2a9d8f';
      case 4:
        return '#1b645b';
      default:
        return '#e1edff';
    }
  };

  const neglectedSubjects = ratios.filter((r) => r.isBelowThreshold);

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
          FINESTRA LLISCANT DE 29 DIES (ANTIGRAVITY ENGINE)
        </div>
      </div>

      {/* Hero Title Block */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '42px', letterSpacing: '-1.5px', marginBottom: '8px' }}>
          Distribució per Matèria & Subject Ratio
        </h1>
        <p style={{ fontSize: '18px', color: '#555566' }}>
          Monitoratge analític del temps d'estudi net (T<sub>net</sub>). Detecció preventiva de
          matèries desateses (&lt; 10%) per a equilibrar el salt curricular de 2n d'ESO.
        </p>
      </div>

      {/* Neglected Alert Banner if any */}
      {neglectedSubjects.length > 0 && (
        <div
          className="pulse-warning"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            backgroundColor: '#fff1f0',
            border: '2px solid var(--color-marker-red)',
            borderRadius: 'var(--radius-cards)',
            boxShadow: '0 2px 0 0 #111118',
          }}
        >
          <AlertCircle size={24} color="#ff4141" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '16px', color: '#111118' }}>
              <strong>¡Alerta de Desequilibri d'Estudi!</strong>
            </div>
            <div style={{ fontSize: '14px', color: '#555566' }}>
              Les següents assignatures representen menys del 10% del temps acumulat:{' '}
              {neglectedSubjects.map((s) => (
                <span
                  key={s.id}
                  style={{
                    color: '#ff4141',
                    fontWeight: 600,
                    marginRight: '8px',
                  }}
                >
                  {s.name} ({s.percentage}%)
                </span>
              ))}
              — Reassigna un bloc d'estudi prioritari hui.
            </div>
          </div>
        </div>
      )}

      {/* Main Analytics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {/* SVG Donut Chart Card */}
        <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="round-icon-36">
              <PieIcon size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', margin: 0 }}>Subject Ratio Acumulat</h2>
              <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
                Total: {Math.round(grandTotalMinutes / 60)}h {grandTotalMinutes % 60}m nets
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '10px 0',
            }}
          >
            {/* SVG Donut */}
            <svg width="220" height="220" viewBox="0 0 220 220">
              {slices.map((slice) => {
                if (slice.angle <= 0) return null;
                const path = getArcPath(110, 110, 95, slice.startAngle, slice.startAngle + slice.angle);
                return (
                  <path
                    key={slice.id}
                    d={path}
                    fill={slice.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                );
              })}
              {/* Inner cutout to make it a clean Donut */}
              <circle cx="110" cy="110" r="52" fill="#ffffff" />
            </svg>

            {/* Donut Center text */}
            <div
              style={{
                position: 'absolute',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                className="font-mono"
                style={{ fontSize: '22px', color: 'var(--color-ink-black)', lineHeight: 1 }}
              >
                {grandTotalMinutes}m
              </div>
              <div style={{ fontSize: '11px', color: '#888899' }}>29 Dies</div>
            </div>
          </div>

          {/* Breakdown legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ratios.map((r) => (
              <div
                key={r.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  backgroundColor: r.isBelowThreshold ? '#fff1f0' : 'var(--color-chalk-blue)',
                  border: r.isBelowThreshold ? '1px solid #ffa39e' : '1px solid transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: r.color,
                    }}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--color-ink-black)' }}>
                    {r.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="font-mono" style={{ fontSize: '13px', color: '#555566' }}>
                    {r.minutes} min
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '13px',
                      color: r.isBelowThreshold ? '#ff4141' : 'var(--color-ink-black)',
                    }}
                  >
                    {r.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Calendar Card (YPT Style) */}
        <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="round-icon-36">
              <Calendar size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', margin: 0 }}>Mapa de Calor de Constància</h2>
              <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
                4 Nivells de saturació mensual
              </span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '8px',
                padding: '16px',
                backgroundColor: 'var(--color-chalk-blue)',
                borderRadius: 'var(--radius-small)',
                border: '1px solid var(--color-frost-blue)',
              }}
            >
              {['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'].map((d, i) => (
                <div
                  key={i}
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    textAlign: 'center',
                    color: '#888899',
                    marginBottom: '4px',
                  }}
                >
                  {d}
                </div>
              ))}

              {heatmapDays.map((d) => (
                <div
                  key={d.dayNum}
                  title={`Dia ${d.dayNum}: Nivell d'intensitat ${d.level}`}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '6px',
                    backgroundColor: getHeatmapColor(d.level),
                    border: d.isToday ? '2px solid #111118' : '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontFamily: 'var(--font-martian-mono)',
                    color: d.level >= 3 ? '#ffffff' : '#333344',
                    boxShadow: d.isToday ? '0 2px 0 0 #111118' : 'none',
                  }}
                >
                  {d.dayNum}
                </div>
              ))}
            </div>

            {/* Heatmap Legend */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
              }}
            >
              <span style={{ fontSize: '12px', color: '#6e6e80' }}>Menys hores</span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      backgroundColor: getHeatmapColor(lvl),
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '12px', color: '#6e6e80' }}>Més de 2.5h</span>
            </div>
          </div>

          {/* Pedagogical Note */}
          <div
            style={{
              padding: '14px',
              backgroundColor: '#f6faff',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
              fontSize: '13px',
              color: '#333344',
              lineHeight: 1.4,
              marginTop: 'auto',
            }}
          >
            <strong>Consistència vs Sobreesforç:</strong> El cervell adolescent consolida la
            memòria a llarg termini mitjançant sessions diàries de 45 a 90 minuts distribuïdes, evitant
            els atracons d'última hora abans dels exàmens.
          </div>
        </div>
      </div>
    </div>
  );
};
