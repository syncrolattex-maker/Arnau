import { useState, useEffect } from 'react';
import { DecorativeShapes } from './components/common/DecorativeShapes';
import { AnnouncementTicker } from './components/common/AnnouncementTicker';
import { HeaderNav } from './components/common/HeaderNav';
import { FocusTimerQuadrant } from './components/dashboard/FocusTimerQuadrant';
import { PlanningQuadrant } from './components/dashboard/PlanningQuadrant';
import { RetrievalQuadrant } from './components/dashboard/RetrievalQuadrant';
import { SocialIslandQuadrant } from './components/dashboard/SocialIslandQuadrant';
import { AnalyticsModal } from './components/analytics/AnalyticsModal';
import { AuditWizardModal } from './components/audit/AuditWizardModal';
import { PedagogicalGuideModal } from './components/guide/PedagogicalGuideModal';

import {
  getStoredTasks,
  saveStoredTasks,
  getStoredExams,
  getStoredFlashcards,
  saveStoredFlashcards,
  getStoredCoins,
  saveStoredCoins,
  getStoredSessions,
  saveStoredSessions,
  getStoredFriends,
  getStoredIsland,
  saveStoredIsland,
} from './utils/storage';

import type {
  DailyTask,
  ExamCountdown,
  Flashcard,
  StudySessionRecord,
  FriendPresence,
  SharedIsland,
} from './types';

import { ShieldCheck } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'metrics' | 'audit' | 'guide'>('dashboard');
  const [adhdMode, setAdhdMode] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(getStoredCoins());
  const [tasks, setTasks] = useState<DailyTask[]>(getStoredTasks());
  const [exams] = useState<ExamCountdown[]>(getStoredExams());
  const [flashcards, setFlashcards] = useState<Flashcard[]>(getStoredFlashcards());
  const [sessions, setSessions] = useState<StudySessionRecord[]>(getStoredSessions());
  const [friends] = useState<FriendPresence[]>(getStoredFriends());
  const [island, setIsland] = useState<SharedIsland>(getStoredIsland());
  const [showCookieBar, setShowCookieBar] = useState<boolean>(true);

  // Persistence effects
  useEffect(() => {
    saveStoredCoins(coins);
  }, [coins]);

  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredFlashcards(flashcards);
  }, [flashcards]);

  useEffect(() => {
    saveStoredSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    saveStoredIsland(island);
  }, [island]);

  // Handle completed study session from Quadrant 1
  const handleSessionComplete = (session: StudySessionRecord) => {
    const updatedSessions = [session, ...sessions];
    setSessions(updatedSessions);

    // Award coins (1 minute = 1 coin)
    const earned = session.coins_earned;
    setCoins((prev) => prev + earned);

    // Update island collective minutes
    setIsland((prev) => ({
      ...prev,
      collectiveMinutesToday: prev.collectiveMinutesToday + session.net_minutes,
      totalIslandMinutes: prev.totalIslandMinutes + session.net_minutes,
      level: Math.floor((prev.totalIslandMinutes + session.net_minutes) / 300) + 1,
    }));
  };

  const handleCoinsEarned = (newCoins: number) => {
    setCoins((prev) => prev + newCoins);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask: Omit<DailyTask, 'id'>) => {
    const task: DailyTask = {
      ...newTask,
      id: 'task-' + Date.now(),
    };
    setTasks((prev) => [...prev, task]);
  };

  const handleUpdateFlashcard = (updated: Flashcard) => {
    setFlashcards((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. SuperHi Decorative Scattered Cutout Shapes Layer */}
      <DecorativeShapes />

      {/* 2. Full-bleed Announcement Ticker Bar */}
      <AnnouncementTicker />

      {/* 3. Sticky Top Navigation Bar */}
      <HeaderNav
        currentView={currentView}
        onViewChange={setCurrentView}
        coins={coins}
        adhdMode={adhdMode}
        onToggleAdhdMode={() => setAdhdMode(!adhdMode)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: '90px', position: 'relative', zIndex: 10 }}>
        <div className="container-rail" style={{ paddingTop: '40px' }}>
          {/* VIEW: DASHBOARD */}
          {currentView === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {/* Centered Hero Text Block (SuperHi Reference) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  maxWidth: '860px',
                  margin: '0 auto',
                  gap: '16px',
                }}
              >
                {/* 48px round icon mark in #2727e6 (the smiley container) */}
                <div
                  className="round-icon-48"
                  style={{ boxShadow: '0 3px 0 0 #111118' }}
                >
                  <span style={{ fontSize: '24px' }}>⚡</span>
                </div>

                {/* Headline in Haas Grot Disp 62px - 72px weight 400 */}
                <h1
                  style={{
                    fontSize: 'clamp(36px, 5.5vw, 68px)',
                    lineHeight: 1.05,
                    letterSpacing: '-2px',
                    margin: 0,
                  }}
                >
                  Aprende sin dispersión.
                  <br />
                  Foco puro para 2º de la ESO.
                </h1>

                {/* Subhead in Haas Grot Text 20px #111118 */}
                <p
                  style={{
                    fontSize: '20px',
                    lineHeight: 1.35,
                    color: 'var(--color-ink-black)',
                    maxWidth: '680px',
                  }}
                >
                  Infraestructura digital austera y libre de distracciones. Cero teatro de productividad:
                  inicia tu sesión en menos de 5 segundos, protege tu atención y consolida tu memoria
                  con evidencia científica.
                </p>

                {/* Two Pill Buttons Side by Side with 16px gap */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginTop: '8px',
                  }}
                >
                  <a
                    href="#dashboard-workspace"
                    className="btn-primary"
                  >
                    <span>Empezar a Estudiar Ahora →</span>
                  </a>

                  <button
                    onClick={() => setCurrentView('audit')}
                    className="btn-dark"
                  >
                    <ShieldCheck size={18} />
                    <span>Auditar Mis Apps</span>
                  </button>
                </div>
              </div>

              {/* The 4 Student Quadrants Grid (Section 4.1) */}
              <section id="dashboard-workspace" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: '26px', margin: 0 }}>
                      Entorno Operativo del Estudiante
                    </h2>
                    <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
                      ARQUITECTURA DE 4 CUADRANTES INTEGRADA
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setCurrentView('metrics')}
                      className="tag-pill"
                      style={{ cursor: 'pointer', fontSize: '13px' }}
                    >
                      📊 Ver Métricas 29 Días
                    </button>
                  </div>
                </div>

                <div className="dashboard-grid">
                  {/* Quadrant 1 (Top-Left): Focus & Blocker */}
                  <FocusTimerQuadrant
                    adhdMode={adhdMode}
                    onSessionComplete={handleSessionComplete}
                    onCoinsEarned={handleCoinsEarned}
                  />

                  {/* Quadrant 2 (Top-Right): Daily Planning & D-Day */}
                  <PlanningQuadrant
                    tasks={tasks}
                    exams={exams}
                    onToggleTask={handleToggleTask}
                    onAddTask={handleAddTask}
                  />

                  {/* Quadrant 3 (Bottom-Left): Memorization & SM-2 Flashcards */}
                  <RetrievalQuadrant
                    flashcards={flashcards}
                    onUpdateFlashcard={handleUpdateFlashcard}
                    onCoinsEarned={handleCoinsEarned}
                  />

                  {/* Quadrant 4 (Bottom-Right): Peer Motivation & Shared Island */}
                  <SocialIslandQuadrant
                    island={island}
                    friends={friends}
                  />
                </div>
              </section>

              {/* Featured Section Wash: Hi-Yellow or Bubblegum Highlight (SuperHi style) */}
              <section
                style={{
                  backgroundColor: 'var(--color-sunbeam)',
                  borderRadius: 'var(--radius-cards)',
                  border: '1px solid #111118',
                  boxShadow: '0 4px 0 0 #111118',
                  padding: '36px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ maxWidth: '640px' }}>
                  <div className="tag-mono" style={{ backgroundColor: '#ffffff', marginBottom: '8px' }}>
                    REGLA DE CONSOLIDACIÓN ESTRICTA
                  </div>
                  <h2 style={{ fontSize: '32px', letterSpacing: '-0.5px', marginBottom: '8px' }}>
                    ¿Atrapado en el "Teatro de Productividad"?
                  </h2>
                  <p style={{ fontSize: '17px', color: '#222233', lineHeight: 1.4 }}>
                    Tener 14 aplicaciones de estudio solo desgasta tu memoria de trabajo. Quédate con las 3
                    herramientas que verdaderamente exigen esfuerzo cognitivo activo.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setCurrentView('guide')}
                    className="btn-primary"
                    style={{ fontSize: '18px' }}
                  >
                    <span>Leer Marco Pedagógico →</span>
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* VIEW: METRICS & SUBJECT RATIO */}
          {currentView === 'metrics' && (
            <AnalyticsModal
              sessions={sessions}
              onBack={() => setCurrentView('dashboard')}
            />
          )}

          {/* VIEW: AUDIT & CLEANUP */}
          {currentView === 'audit' && (
            <AuditWizardModal
              onBack={() => setCurrentView('dashboard')}
            />
          )}

          {/* VIEW: PEDAGOGICAL GUIDE */}
          {currentView === 'guide' && (
            <PedagogicalGuideModal
              onBack={() => setCurrentView('dashboard')}
            />
          )}
        </div>
      </main>

      {/* SuperHi Cookie Consent Bar (Pinned to the bottom of the viewport) */}
      {showCookieBar && (
        <aside
          role="dialog"
          aria-label="Consentimiento de privacidad"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-ink-black)',
            padding: '16px 24px',
            color: 'var(--color-paper-white)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: '15px', color: '#ffffff', maxWidth: '750px', lineHeight: 1.4 }}>
            Este entorno digital utiliza almacenamiento local privado para calcular tus métricas SM-2 y tiempos
            de estudio. No compartimos datos con redes de publicidad ni clasificadores públicos.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowCookieBar(false)}
              style={{
                background: 'transparent',
                border: '1px solid #ffffff',
                color: '#ffffff',
                borderRadius: 'var(--radius-buttons)',
                padding: '8px 18px',
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: 'var(--font-haas-grot-text)',
              }}
            >
              Solo esenciales
            </button>

            <button
              onClick={() => setShowCookieBar(false)}
              style={{
                backgroundColor: '#ffffff',
                border: 'none',
                color: '#111118',
                borderRadius: 'var(--radius-buttons)',
                padding: '8px 20px',
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: 'var(--font-haas-grot-text)',
                boxShadow: '0 2px 0 0 #2727e6',
              }}
            >
              Entendido
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
export default App;
