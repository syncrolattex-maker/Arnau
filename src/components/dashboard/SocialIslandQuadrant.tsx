import React, { useState } from 'react';
import type { FriendPresence, SharedIsland } from '../../types';
import { Users, Trees, ShieldCheck, HeartHandshake } from 'lucide-react';

interface SocialIslandQuadrantProps {
  island: SharedIsland;
  friends: FriendPresence[];
}

export const SocialIslandQuadrant: React.FC<SocialIslandQuadrantProps> = ({
  island,
  friends,
}) => {
  const [activeTab, setActiveTab] = useState<'island' | 'leaderboard'>('island');
  const [bodyDoublingActive, setBodyDoublingActive] = useState<boolean>(false);

  // Growth calculation based on collective minutes
  const levelProgress = Math.min(100, Math.round((island.collectiveMinutesToday / 300) * 100));

  return (
    <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-sunbeam)',
            }}
          />
          <h2 style={{ fontSize: '22px', margin: 0 }}>
            4. Isla Compartida & Amigos
          </h2>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('island')}
            className={`tag-pill ${activeTab === 'island' ? 'active' : ''}`}
            style={{ cursor: 'pointer', fontSize: '13px', padding: '4px 10px' }}
          >
            <Trees size={14} />
            <span>Isla 3D</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`tag-pill ${activeTab === 'leaderboard' ? 'active' : ''}`}
            style={{ cursor: 'pointer', fontSize: '13px', padding: '4px 10px' }}
          >
            <Users size={14} />
            <span>Círculo Privado</span>
          </button>
        </div>
      </div>

      {activeTab === 'island' ? (
        /* Virtual Island View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* SVG Animated Island Canvas */}
          <div
            style={{
              height: '180px',
              backgroundColor: 'var(--color-frost-blue)',
              borderRadius: 'var(--radius-small)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #c2dbff',
            }}
          >
            {/* Sun / Clouds */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '24px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#ffda00',
                boxShadow: '0 2px 0 0 #111118',
              }}
            />

            {/* Clouds */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: '#ffffff',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                color: '#6e6e80',
                fontFamily: 'var(--font-martian-mono)',
              }}
            >
              ☁️ Isla Comunitaria Nivel {island.level}
            </div>

            {/* Stylized Island Ground */}
            <svg
              viewBox="0 0 400 160"
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '140px',
              }}
            >
              {/* Island Mound */}
              <path
                d="M 40,160 Q 200,60 360,160 Z"
                fill="#16ab59"
              />
              <path
                d="M 60,160 Q 200,85 340,160 Z"
                fill="#27ae60"
              />

              {/* Tree 1 */}
              <rect x="140" y="70" width="10" height="30" fill="#795548" />
              <polygon points="125,75 145,35 165,75" fill="#2ecc71" />
              <polygon points="130,55 145,25 160,55" fill="#58d68d" />

              {/* Tree 2 (Central Oak) */}
              <rect x="195" y="55" width="14" height="40" fill="#5d4037" />
              <circle cx="202" cy="45" r="30" fill="#27ae60" />
              <circle cx="188" cy="40" r="18" fill="#2ecc71" />
              <circle cx="216" cy="40" r="18" fill="#58d68d" />

              {/* Tree 3 */}
              <rect x="250" y="75" width="10" height="25" fill="#795548" />
              <circle cx="255" cy="70" r="20" fill="#2ecc71" />

              {/* Little Study Hut or Campfire */}
              <polygon points="100,120 115,100 130,120" fill="#e67e22" />
              <rect x="108" y="112" width="14" height="12" fill="#d35400" />
            </svg>

            {/* Island Level & Streak Status Banner */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '4px 14px',
                borderRadius: 'var(--radius-tags)',
                fontSize: '12px',
                boxShadow: '0 1px 0 0 #111118',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🌱 <strong>{island.name}</strong></span>
              <span>•</span>
              <span className="font-mono">Racha: {island.streakDays} días</span>
            </div>
          </div>

          {/* Collective Progress Bar */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                marginBottom: '4px',
              }}
            >
              <span className="font-mono" style={{ color: '#555566' }}>
                PROGRESO COLECTIVO DE HOY:
              </span>
              <span className="font-mono" style={{ color: 'var(--color-ink-black)' }}>
                {island.collectiveMinutesToday} / 300 min ({levelProgress}%)
              </span>
            </div>
            <div
              style={{
                height: '8px',
                backgroundColor: 'var(--color-frost-blue)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${levelProgress}%`,
                  height: '100%',
                  backgroundColor: '#16ab59',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>

          {/* Body Doubling Simulator Toggle (ADHD Section 5.1) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: bodyDoublingActive ? '#eafbf0' : '#ffffff',
              borderRadius: 'var(--radius-small)',
              border: `1px solid ${bodyDoublingActive ? '#16ab59' : 'var(--color-frost-blue)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartHandshake
                size={18}
                color={bodyDoublingActive ? '#16ab59' : 'var(--color-electric-iris)'}
              />
              <div>
                <div style={{ fontSize: '13px', lineHeight: 1.2 }}>
                  <strong>Doble Cuerpo Virtual (Body-Doubling)</strong>
                </div>
                <div style={{ fontSize: '11px', color: '#6e6e80' }}>
                  {bodyDoublingActive
                    ? '3 compañeros en sala silenciosa activa neuronas espejo'
                    : 'Estudio en silencio sincronizado (estrategia TDAH)'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setBodyDoublingActive(!bodyDoublingActive)}
              className="btn-compact"
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                backgroundColor: bodyDoublingActive ? '#16ab59' : 'var(--color-electric-iris)',
              }}
            >
              {bodyDoublingActive ? 'Conectado ✓' : 'Unirme'}
            </button>
          </div>
        </div>
      ) : (
        /* Private Leaderboard View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Safeguard banner: Anti-toxicity (Section 3.1 & 4.2) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              backgroundColor: '#f0f6ff',
              borderRadius: '6px',
              fontSize: '11px',
              color: 'var(--color-electric-iris)',
              border: '1px solid var(--color-frost-blue)',
            }}
          >
            <ShieldCheck size={14} />
            <span>
              <strong>Grupo Cerrado Seguro:</strong> Máximo 6 amigos. Sin ránkings públicos para
              prevenir toxicidad o desmotivación.
            </span>
          </div>

          {/* Friends List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {friends.map((friend, idx) => (
              <div
                key={friend.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-small)',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-frost-blue)',
                  boxShadow: '0 1px 0 0 #111118',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="font-mono" style={{ fontSize: '12px', color: '#888899', width: '16px' }}>
                    #{idx + 1}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-frost-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}
                  >
                    {friend.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', lineHeight: 1.2 }}>{friend.name}</div>
                    <div style={{ fontSize: '11px', color: '#6e6e80' }}>
                      {friend.isLive ? (
                        <span style={{ color: '#16ab59' }}>
                          🟢 Estudiando {friend.currentSubject} ({friend.currentSessionMinutes}m)
                        </span>
                      ) : (
                        <span>Desconectado</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="font-mono" style={{ fontSize: '13px', color: 'var(--color-ink-black)' }}>
                  {friend.minutesActiveToday} min
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
