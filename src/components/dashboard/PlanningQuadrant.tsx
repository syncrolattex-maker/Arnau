import React, { useState } from 'react';
import type { DailyTask, ExamCountdown } from '../../types';
import { SUBJECTS } from '../../utils/storage';
import { CheckCircle2, Circle, Mic, Plus } from 'lucide-react';

interface PlanningQuadrantProps {
  tasks: DailyTask[];
  exams: ExamCountdown[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<DailyTask, 'id'>) => void;
}

export const PlanningQuadrant: React.FC<PlanningQuadrantProps> = ({
  tasks,
  exams,
  onToggleTask,
  onAddTask,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubjectId, setNewSubjectId] = useState(SUBJECTS[0].id);
  const [newTimeAlert, setNewTimeAlert] = useState('17:30');
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (tasks.length >= 5) {
      alert('Regla pedagógica: Máximo 5 tareas críticas diarias para evitar sobrecarga decisional.');
      return;
    }
    onAddTask({
      title: newTitle.trim(),
      timeEstimateMinutes: 25,
      completed: false,
      subjectId: newSubjectId,
      timeAlert: newTimeAlert,
    });
    setNewTitle('');
    setShowAddForm(false);
  };

  const handleSimulateVoiceInput = () => {
    setIsVoiceListening(true);
    // Simulate Siri / Google Assistant voice recognition
    setTimeout(() => {
      const voiceTemplates = [
        { text: 'Estudiar 20 min leyes de los gases en Física', sub: 'FYQ_2ESO' },
        { text: 'Resolver 3 problemas de ecuaciones en Matemáticas', sub: 'MAT_2ESO' },
        { text: 'Repasar esquema de la célula eucariota en Biología', sub: 'BIO_2ESO' },
        { text: 'Repaso vocabulario unit 4 de Inglés', sub: 'ING_2ESO' },
      ];
      const randomT = voiceTemplates[Math.floor(Math.random() * voiceTemplates.length)];
      if (tasks.length < 5) {
        onAddTask({
          title: randomT.text,
          timeEstimateMinutes: 20,
          completed: false,
          subjectId: randomT.sub,
          timeAlert: '18:00',
        });
      }
      setIsVoiceListening(false);
    }, 1200);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-electric-iris)',
            }}
          />
          <h2 style={{ fontSize: '22px', margin: 0 }}>
            2. Planificación & D-Day Exámenes
          </h2>
        </div>

        {/* Voice Trigger (Siri / Asistente) */}
        <button
          onClick={handleSimulateVoiceInput}
          title="Captura rápida por comando de voz (Siri / Asistente de Google)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: isVoiceListening ? '#ff4141' : '#f0f6ff',
            color: isVoiceListening ? '#ffffff' : 'var(--color-electric-iris)',
            border: '1px solid var(--color-frost-blue)',
            borderRadius: 'var(--radius-tags)',
            padding: '6px 12px',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Mic size={15} />
          <span>{isVoiceListening ? 'Escuchando...' : 'Entrada por Voz'}</span>
        </button>
      </div>

      {/* D-Day Countdown Cards Row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
          EVALUACIONES INMINENTES (D-DAY):
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
          }}
        >
          {exams.slice(0, 4).map((exam) => {
            const isUrgent = exam.daysRemaining <= 3;
            return (
              <div
                key={exam.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-small)',
                  border: `2px solid ${isUrgent ? 'var(--color-marker-red)' : exam.color}`,
                  padding: '10px 12px',
                  boxShadow: isUrgent ? '0 2px 0 0 #ff4141' : '0 2px 0 0 #111118',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '16px',
                      color: isUrgent ? 'var(--color-marker-red)' : 'var(--color-ink-black)',
                    }}
                  >
                    D-{exam.daysRemaining}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: exam.color + '22',
                      color: exam.color,
                      fontFamily: 'var(--font-martian-mono)',
                    }}
                  >
                    {exam.subjectName.split(' ')[0]}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    lineHeight: '1.2',
                    color: '#333344',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={exam.examTitle}
                >
                  {exam.examTitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Tasks List (Max 5 items rule) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
            TAREAS CRÍTICAS DEL DÍA ({completedCount}/{tasks.length} — MÁX 5):
          </div>
          {tasks.length < 5 && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: 'var(--color-electric-iris)',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'var(--font-haas-grot-text)',
              }}
            >
              <Plus size={14} />
              <span>Añadir tarea</span>
            </button>
          )}
        </div>

        {/* Task items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tasks.map((task) => {
            const subject = SUBJECTS.find((s) => s.id === task.subjectId);
            return (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-small)',
                  backgroundColor: task.completed ? '#f6faff' : '#ffffff',
                  border: '1px solid var(--color-frost-blue)',
                  boxShadow: '0 1px 0 0 #111118',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: task.completed ? '#16ab59' : '#a0a0a0',
                  }}
                >
                  {task.completed ? (
                    <CheckCircle2 size={20} color="#16ab59" />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '15px',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#888899' : 'var(--color-ink-black)',
                      lineHeight: 1.3,
                    }}
                  >
                    {task.title}
                  </div>
                </div>

                {task.timeAlert && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      color: '#666677',
                      backgroundColor: 'var(--color-chalk-blue)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {task.timeAlert}
                  </span>
                )}

                {subject && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: subject.color,
                    }}
                    title={subject.name}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <form
            onSubmit={handleCreateTask}
            style={{
              padding: '12px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '4px',
            }}
          >
            <input
              type="text"
              placeholder="Ej. Resumen Cornell de Historia pág. 45"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="superhi-input"
              autoFocus
              style={{ fontSize: '14px', padding: '8px 14px' }}
            />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select
                value={newSubjectId}
                onChange={(e) => setNewSubjectId(e.target.value)}
                style={{
                  flex: 1,
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-tags)',
                  border: '1px solid var(--color-frost-blue)',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                }}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <input
                type="time"
                value={newTimeAlert}
                onChange={(e) => setNewTimeAlert(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-tags)',
                  border: '1px solid var(--color-frost-blue)',
                  fontSize: '13px',
                }}
              />

              <button type="submit" className="btn-compact">
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#666677',
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
