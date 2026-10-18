import React, { useState, useEffect, useRef } from 'react';
import type { SubjectInfo, StudySessionRecord } from '../../types';
import { getStoredSubjects } from '../../utils/storage';
import { Play, Pause, Square, Shield, ShieldAlert, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FocusTimerQuadrantProps {
  adhdMode: boolean;
  onSessionComplete: (session: StudySessionRecord) => void;
  onCoinsEarned: (coins: number) => void;
}

export const FocusTimerQuadrant: React.FC<FocusTimerQuadrantProps> = ({
  adhdMode,
  onSessionComplete,
  onCoinsEarned,
}) => {
  const subjects = getStoredSubjects();
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo>(subjects[0]);
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [blockerActive, setBlockerActive] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Session timestamps tracking for net time calculation
  const sessionStartRef = useRef<number | null>(null);
  const pauseStartRef = useRef<number | null>(null);
  const pauseIntervalsRef = useRef<Array<{ start: number; end: number }>>([]);
  const previousCoinsAwardedRef = useRef<number>(0);

  // Play subtle web audio chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  // Timer Tick Interval
  useEffect(() => {
    let timer: number | null = null;

    if (isRunning && !isPaused) {
      timer = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleCompleteSession();
            return 0;
          }

          // Check if a minute elapsed to award real-time coin
          const totalDurationSec = durationMinutes * 60;
          const elapsedSec = totalDurationSec - (prev - 1);
          const currentElapsedMinutes = Math.floor(elapsedSec / 60);
          if (currentElapsedMinutes > previousCoinsAwardedRef.current) {
            const newCoins = currentElapsedMinutes - previousCoinsAwardedRef.current;
            previousCoinsAwardedRef.current = currentElapsedMinutes;
            onCoinsEarned(newCoins);
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer !== null) window.clearInterval(timer);
    };
  }, [isRunning, isPaused, durationMinutes]);

  const handleStart = () => {
    if (!isRunning) {
      sessionStartRef.current = Date.now();
      pauseIntervalsRef.current = [];
      previousCoinsAwardedRef.current = 0;
      setIsRunning(true);
      setIsPaused(false);
      setBlockerActive(true); // Default to ACTIVE upon starting any session
    } else if (isPaused) {
      if (pauseStartRef.current) {
        pauseIntervalsRef.current.push({
          start: pauseStartRef.current,
          end: Date.now(),
        });
        pauseStartRef.current = null;
      }
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (isRunning && !isPaused) {
      pauseStartRef.current = Date.now();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      handleCompleteSession();
    }
  };

  const handleCompleteSession = () => {
    const endTimestamp = Date.now();
    const startTimestamp = sessionStartRef.current || (endTimestamp - (durationMinutes * 60 - secondsRemaining) * 1000);

    if (isPaused && pauseStartRef.current) {
      pauseIntervalsRef.current.push({
        start: pauseStartRef.current,
        end: endTimestamp,
      });
    }

    // Calculate Net active time: T_neto = (end - start) - sum(pause_end - pause_start)
    const grossMs = Math.max(0, endTimestamp - startTimestamp);
    const pauseMs = pauseIntervalsRef.current.reduce((acc, p) => acc + Math.max(0, p.end - p.start), 0);
    const netMs = Math.max(0, grossMs - pauseMs);
    const netMinutes = Math.round(netMs / 60000);

    const coinsEarned = Math.max(1, netMinutes);

    const record: StudySessionRecord = {
      id: 'session-' + Date.now(),
      student_id: 'arnau-2eso',
      subject_id: selectedSubject.id,
      start_timestamp: startTimestamp,
      end_timestamp: endTimestamp,
      pause_intervals: pauseIntervalsRef.current,
      device_os: 'Web',
      net_minutes: netMinutes || 1,
      coins_earned: coinsEarned,
      created_at: new Date().toISOString(),
    };

    onSessionComplete(record);
    playChime();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2727e6', '#ffda00', '#16ab59', '#ff4141'],
      });
    } catch {
      // Ignored
    }

    // Reset state
    setIsRunning(false);
    setIsPaused(false);
    setSecondsRemaining(durationMinutes * 60);
    sessionStartRef.current = null;
    pauseStartRef.current = null;
    pauseIntervalsRef.current = [];
    previousCoinsAwardedRef.current = 0;
  };

  const setPresetTime = (minutes: number) => {
    if (isRunning) return;
    setDurationMinutes(minutes);
    setSecondsRemaining(minutes * 60);
  };

  // Formatted digital time
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Percentage remaining for Time Timer decremental visual disk
  const totalSeconds = durationMinutes * 60;
  const fractionRemaining = secondsRemaining / totalSeconds;

  return (
    <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header: Badge and Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: selectedSubject.color,
            }}
          />
          <h2 style={{ fontSize: '22px', margin: 0 }}>
            1. Enfocament Immediat & Bloqueig
          </h2>
        </div>

        {/* Audio Cue Button */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Silenciar avisos' : 'Activar avisos sonors'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: soundEnabled ? 'var(--color-ink-black)' : '#a0a0a0',
            padding: '4px',
          }}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Subject Dropdown with Official Standard Color Coding */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          htmlFor="subject-select"
          className="font-mono"
          style={{ fontSize: '12px', color: '#555566' }}
        >
          SELECCIONA ASSIGNATURA (ARRANCADA DIRECTA &lt; 5s):
        </label>
        <div style={{ position: 'relative' }}>
          <select
            id="subject-select"
            value={selectedSubject.id}
            onChange={(e) => {
              const sub = subjects.find((s) => s.id === e.target.value);
              if (sub) setSelectedSubject(sub);
            }}
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 'var(--radius-inputs)',
              border: `2px solid ${selectedSubject.color}`,
              backgroundColor: '#ffffff',
              fontSize: '17px',
              fontWeight: 400,
              fontFamily: 'var(--font-haas-grot-text)',
              color: 'var(--color-ink-black)',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
            }}
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.icon} {sub.name} ({sub.code})
              </option>
            ))}
          </select>
          <div
            style={{
              position: 'absolute',
              right: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontSize: '14px',
              color: '#555566',
            }}
          >
            ▼
          </div>
        </div>

        {/* 1-Click Aules Direct Link Hub */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px' }}>
          <span style={{ fontSize: '12px', color: '#6e6e80' }}>
            Accés directe a l'aula virtual:
          </span>
          <a
            href={selectedSubject.aulesUrl || 'https://aules.edu.gva.es/eso46/my/'}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: selectedSubject.color,
              fontWeight: 600,
              textDecoration: 'none',
              backgroundColor: selectedSubject.color + '15',
              padding: '3px 8px',
              borderRadius: '4px',
              transition: 'opacity 0.2s',
            }}
            title={`Obrir el curs de ${selectedSubject.name} a Aules`}
          >
            <span>Obrir en Aules</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Main Timer Display: Dual mode (Standard vs TDAH Visual Disk) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 0',
          backgroundColor: 'var(--color-chalk-blue)',
          borderRadius: 'var(--radius-small)',
          border: '1px solid var(--color-frost-blue)',
        }}
      >
        {adhdMode ? (
          /* ADHD / TDAH Time Timer Decremental Disc (Sustituye dígitos numéricos) */
          <div
            style={{
              position: 'relative',
              width: '170px',
              height: '170px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '4px solid #111118',
              boxShadow: '0 3px 0 0 #111118',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* SVG Pie Disc */}
            <svg
              viewBox="0 0 100 100"
              style={{
                width: '100%',
                height: '100%',
                transform: 'rotate(-90deg)',
                borderRadius: '50%',
              }}
            >
              {/* Decremental slice */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={selectedSubject.color}
                strokeWidth="80"
                strokeDasharray={`${fractionRemaining * 251.3} 251.3`}
              />
            </svg>

            {/* Inner Center Hub */}
            <div
              style={{
                position: 'absolute',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#111118',
                border: '3px solid #ffffff',
                zIndex: 2,
              }}
            />

            {/* Subtle time label inside without anxiety */}
            <div
              className="font-mono"
              style={{
                position: 'absolute',
                bottom: '-28px',
                fontSize: '13px',
                color: '#555566',
              }}
            >
              {timeFormatted} restants
            </div>
          </div>
        ) : (
          /* Standard Digital Display */
          <div style={{ textAlign: 'center' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '56px',
                lineHeight: 1,
                letterSpacing: '-1px',
                color: 'var(--color-ink-black)',
              }}
            >
              {timeFormatted}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#6e6e80',
                marginTop: '6px',
              }}
            >
              {isRunning
                ? isPaused
                  ? '⏸️ Sessió pausada'
                  : `Enfocat en ${selectedSubject.name}`
                : 'A punt per a començar'}
            </div>
          </div>
        )}

        {/* Time Presets (only enabled when stopped) */}
        {!isRunning && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: adhdMode ? '34px' : '16px',
            }}
          >
            {[
              { label: '15m Exprés', val: 15 },
              { label: '25m Pomodoro', val: 25 },
              { label: '45m Bloc ESO', val: 45 },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setPresetTime(p.val)}
                className={`tag-pill ${durationMinutes === p.val ? 'active' : ''}`}
                style={{ cursor: 'pointer', fontSize: '13px', padding: '4px 12px' }}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* App Blocker Indicator (Section 3.2: ACTIVO verde esmeralda / INACTIVO rojo) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderRadius: 'var(--radius-inputs)',
          backgroundColor: blockerActive ? 'rgba(46, 204, 113, 0.12)' : 'rgba(231, 76, 60, 0.12)',
          border: `1px solid ${blockerActive ? '#2ecc71' : '#e74c3c'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {blockerActive ? (
            <Shield size={18} color="#27ae60" />
          ) : (
            <ShieldAlert size={18} color="#c0392b" />
          )}
          <span style={{ fontSize: '14px', color: 'var(--color-ink-black)' }}>
            Bloqueig de Xarxes (TikTok/Insta/YT):{' '}
            <strong style={{ color: blockerActive ? '#27ae60' : '#c0392b' }}>
              {blockerActive ? 'ACTIU (Límit 1 min)' : 'INACTIU'}
            </strong>
          </span>
        </div>

        <button
          onClick={() => setBlockerActive(!blockerActive)}
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-haas-grot-text)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-tags)',
            border: '1px solid #111118',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 1px 0 0 #111118',
          }}
        >
          {blockerActive ? 'Desactivar' : 'Activar'}
        </button>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="btn-primary"
            style={{ width: '100%', fontSize: '18px' }}
          >
            <Play size={20} fill="#ffffff" />
            <span>Començar Sessió d'Estudi →</span>
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={handleStart}
                className="btn-primary"
                style={{ flex: 1, fontSize: '17px' }}
              >
                <Play size={18} fill="#ffffff" />
                <span>Reprendre</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="btn-dark"
                style={{ flex: 1, fontSize: '17px' }}
              >
                <Pause size={18} />
                <span>Pausar</span>
              </button>
            )}

            <button
              onClick={handleStop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '12px 20px',
                borderRadius: 'var(--radius-buttons)',
                border: '1px solid #ff4141',
                backgroundColor: '#fff0f0',
                color: '#ff4141',
                cursor: 'pointer',
                fontFamily: 'var(--font-haas-grot-text)',
                fontSize: '16px',
                boxShadow: '0 2px 0 0 #ff4141',
              }}
            >
              <Square size={16} fill="#ff4141" />
              <span>Finalitzar</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
