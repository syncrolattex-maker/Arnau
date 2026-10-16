import React from 'react';
import { Sparkles, BarChart2, ShieldCheck, BookOpen, Clock } from 'lucide-react';

interface HeaderNavProps {
  currentView: 'dashboard' | 'metrics' | 'audit' | 'guide';
  onViewChange: (view: 'dashboard' | 'metrics' | 'audit' | 'guide') => void;
  coins: number;
  adhdMode: boolean;
  onToggleAdhdMode: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onViewChange,
  coins,
  adhdMode,
  onToggleAdhdMode,
}) => {
  return (
    <header className="nav-bar">
      <div
        className="container-rail"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: 0,
        }}
      >
        {/* Left: Brand Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            className="round-icon-36"
            style={{
              backgroundColor: 'var(--color-electric-iris)',
              color: '#ffffff',
              boxShadow: '0 2px 0 0 #111118',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-haas-grot-disp)',
                fontSize: '20px',
                lineHeight: 1.1,
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.4px',
              }}
            >
              Orbital 2º ESO
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '11px',
                color: '#6e6e80',
                letterSpacing: '-0.1px',
              }}
            >
              Arquitectura Digital Libre de Fricción
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <button
            onClick={() => onViewChange('dashboard')}
            className={`tag-pill ${currentView === 'dashboard' ? 'active' : ''}`}
            style={{
              cursor: 'pointer',
              fontSize: '15px',
              padding: '8px 16px',
            }}
          >
            <Clock size={16} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onViewChange('metrics')}
            className={`tag-pill ${currentView === 'metrics' ? 'active' : ''}`}
            style={{
              cursor: 'pointer',
              fontSize: '15px',
              padding: '8px 16px',
            }}
          >
            <BarChart2 size={16} />
            <span>Subject Ratio</span>
          </button>

          <button
            onClick={() => onViewChange('audit')}
            className={`tag-pill ${currentView === 'audit' ? 'active' : ''}`}
            style={{
              cursor: 'pointer',
              fontSize: '15px',
              padding: '8px 16px',
            }}
          >
            <ShieldCheck size={16} />
            <span>Auditoría 4 Preguntas</span>
          </button>

          <button
            onClick={() => onViewChange('guide')}
            className={`tag-pill ${currentView === 'guide' ? 'active' : ''}`}
            style={{
              cursor: 'pointer',
              fontSize: '15px',
              padding: '8px 16px',
            }}
          >
            <BookOpen size={16} />
            <span>Marco Pedagógico</span>
          </button>
        </nav>

        {/* Right: Coins + ADHD Disc Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* TDAH / ADHD Mode Switcher */}
          <button
            onClick={onToggleAdhdMode}
            title="Alternar modo de disco visual analógico decreciente (Time Timer) para TDAH"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-tags)',
              border: '1px solid var(--color-frost-blue)',
              backgroundColor: adhdMode ? 'var(--color-sunbeam)' : '#ffffff',
              color: 'var(--color-ink-black)',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: adhdMode ? '0 2px 0 0 #111118' : 'none',
              fontFamily: 'var(--font-haas-grot-text)',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ fontSize: '15px' }}>⏱️</span>
            <span style={{ fontSize: '13px' }}>
              Modo TDAH: {adhdMode ? 'ACTIVO' : 'Estándar'}
            </span>
          </button>

          {/* Coins Pill */}
          <div
            className="tag-mono"
            style={{
              backgroundColor: '#fff7cc',
              border: '1px solid #ffe54d',
              padding: '6px 14px',
              fontSize: '13px',
              color: '#5c4500',
              boxShadow: '0 1px 0 0 #111118',
            }}
          >
            <span style={{ fontSize: '15px' }}>🪙</span>
            <span>{coins} Monedas</span>
          </div>
        </div>
      </div>
    </header>
  );
};
