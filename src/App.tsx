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
import { AulesSyncModal } from './components/aules/AulesSyncModal';
import { AulesQuizImporterModal } from './components/aules/AulesQuizImporterModal';
import { AulesAnnouncementsModal } from './components/aules/AulesAnnouncementsModal';

import { TopicsCurriculumView } from './components/curriculum/TopicsCurriculumView';

import {
  getStoredTasks,
  saveStoredTasks,
  getStoredExams,
  saveStoredExams,
  getStoredFlashcards,
  saveStoredFlashcards,
  getStoredCoins,
  saveStoredCoins,
  getStoredSessions,
  saveStoredSessions,
  getStoredFriends,
  getStoredIsland,
  saveStoredIsland,
  getStoredSubjects,
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
  const [currentView, setCurrentView] = useState<'dashboard' | 'topics' | 'metrics' | 'audit' | 'guide'>('dashboard');
  const [adhdMode, setAdhdMode] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(getStoredCoins());
  const [tasks, setTasks] = useState<DailyTask[]>(getStoredTasks());
  const [exams, setExams] = useState<ExamCountdown[]>(getStoredExams());
  const [flashcards, setFlashcards] = useState<Flashcard[]>(getStoredFlashcards());
  const [sessions, setSessions] = useState<StudySessionRecord[]>(getStoredSessions());
  const [friends] = useState<FriendPresence[]>(getStoredFriends());
  const [island, setIsland] = useState<SharedIsland>(getStoredIsland());
  const [showCookieBar, setShowCookieBar] = useState<boolean>(true);
  const [showAulesSync, setShowAulesSync] = useState<boolean>(false);
  const [showAulesQuiz, setShowAulesQuiz] = useState<boolean>(false);
  const [showAulesAnnouncements, setShowAulesAnnouncements] = useState<boolean>(false);

  // Persistence effects
  useEffect(() => {
    saveStoredCoins(coins);
  }, [coins]);

  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredExams(exams);
  }, [exams]);

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

  const handleSyncExamsAndTasks = (newExams: ExamCountdown[], newTasks: DailyTask[]) => {
    if (newExams.length > 0) {
      setExams(newExams);
    }
    if (newTasks.length > 0) {
      // Merge unique tasks up to 5
      setTasks((prev) => {
        const combined = [...prev, ...newTasks];
        const unique = Array.from(new Map(combined.map((item) => [item.title, item])).values());
        return unique.slice(0, 5);
      });
    }
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
        onOpenAnnouncements={() => setShowAulesAnnouncements(true)}
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
                  Aprèn sense dispersió.
                  <br />
                  Foc pur per a 2n d'ESO.
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
                  Infraestructura digital austera i lliure de distraccions. Zero teatre de productivitat:
                  inicia la teua sessió en menys de 5 segons, protegeix la teua atenció i consolida la memòria
                  amb evidència científica.
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
                    <span>Comença a Estudiar Ara →</span>
                  </a>

                  <button
                    onClick={() => setCurrentView('audit')}
                    className="btn-dark"
                  >
                    <ShieldCheck size={18} />
                    <span>Auditar les Meues Apps</span>
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
                      Entorn Operatiu de l'Alumne
                    </h2>
                    <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
                      ARQUITECTURA DE 4 QUADRANTS INTEGRADA
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setCurrentView('metrics')}
                      className="tag-pill"
                      style={{ cursor: 'pointer', fontSize: '13px' }}
                    >
                      📊 Veure Mètriques 29 Dies
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
                    onOpenAulesSync={() => setShowAulesSync(true)}
                  />

                  {/* Quadrant 3 (Bottom-Left): Memorization & SM-2 Flashcards */}
                  <RetrievalQuadrant
                    flashcards={flashcards}
                    onUpdateFlashcard={handleUpdateFlashcard}
                    onCoinsEarned={handleCoinsEarned}
                    onOpenAulesImport={() => setShowAulesQuiz(true)}
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
                    REGLA DE CONSOLIDACIÓ ESTRICTA
                  </div>
                  <h2 style={{ fontSize: '32px', letterSpacing: '-0.5px', marginBottom: '8px' }}>
                    Atrapat en el "Teatre de Productivitat"?
                  </h2>
                  <p style={{ fontSize: '17px', color: '#222233', lineHeight: 1.4 }}>
                    Tindre 14 aplicacions d'estudi només desgasta la teua memòria de treball. Queda't amb les 3
                    eines que veritablement exigeixen esforç cognitiu actiu.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setCurrentView('guide')}
                    className="btn-primary"
                    style={{ fontSize: '18px' }}
                  >
                    <span>Llegir Marc Pedagògic →</span>
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* VIEW: TOPICS & CURRICULUM */}
          {currentView === 'topics' && (
            <TopicsCurriculumView
              subjects={getStoredSubjects()}
              onBack={() => setCurrentView('dashboard')}
              onStartStudyWithTopic={(subjectId, topicTitle) => {
                // Return to dashboard and prep topic
                setCurrentView('dashboard');
                // Scroll smoothly to timer
                setTimeout(() => {
                  const el = document.getElementById('dashboard-workspace');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
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

          {/* MODAL: AULES GVA SYNC */}
          <AulesSyncModal
            isOpen={showAulesSync}
            onClose={() => setShowAulesSync(false)}
            onSyncExamsAndTasks={handleSyncExamsAndTasks}
          />

          {/* MODAL: AULES QUIZ / FLASHCARDS IMPORTER */}
          <AulesQuizImporterModal
            isOpen={showAulesQuiz}
            onClose={() => setShowAulesQuiz(false)}
            onImportFlashcards={(newCards) => setFlashcards((prev) => [...prev, ...newCards])}
          />

          {/* MODAL: AULES ANNOUNCEMENTS & RSS */}
          <AulesAnnouncementsModal
            isOpen={showAulesAnnouncements}
            onClose={() => setShowAulesAnnouncements(false)}
          />
        </div>
      </main>

      {/* SuperHi Cookie Consent Bar (Pinned to the bottom of the viewport) */}
      {showCookieBar && (
        <aside
          role="dialog"
          aria-label="Consentiment de privacitat"
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
            Aquest entorn digital utilitza emmagatzematge local privat per a calcular les teues mètriques SM-2 i temps
            d'estudi. No compartim dades amb xarxes de publicitat ni classificadors públics.
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
              Només essencials
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
              Entés
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
export default App;
