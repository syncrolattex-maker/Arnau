import React, { useState } from 'react';
import type { SubjectInfo, Topic, TopicMaterial } from '../../types';
import { BookOpen, ExternalLink, Plus, CheckCircle, Clock, AlertCircle, FileText, ArrowLeft, Link as LinkIcon, Trash2 } from 'lucide-react';
import { getStoredTopics, saveStoredTopics } from '../../utils/topicsStorage';

interface TopicsCurriculumViewProps {
  subjects: SubjectInfo[];
  onBack: () => void;
  onStartStudyWithTopic?: (subjectId: string, topicTitle: string) => void;
}

export const TopicsCurriculumView: React.FC<TopicsCurriculumViewProps> = ({
  subjects,
  onBack,
  onStartStudyWithTopic,
}) => {
  const [topics, setTopics] = useState<Topic[]>(getStoredTopics());
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0].id);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Form states to add a new topic
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [newUnitNum, setNewUnitNum] = useState<number>(4);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');

  // Form states to add material to a topic
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<TopicMaterial['type']>('aules');
  const [matUrl, setMatUrl] = useState('');

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const subjectTopics = topics.filter((t) => t.subjectId === selectedSubjectId);
  const activeTopic = subjectTopics.find((t) => t.id === selectedTopicId) || subjectTopics[0];

  const handleUpdateTopicStatus = (topicId: string, newStatus: Topic['status']) => {
    const updated = topics.map((t) => (t.id === topicId ? { ...t, status: newStatus } : t));
    setTopics(updated);
    saveStoredTopics(updated);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTopic: Topic = {
      id: `${currentSubject.code.toLowerCase()}-t${Date.now()}`,
      subjectId: selectedSubjectId,
      unitNumber: newUnitNum,
      title: newTitle.trim(),
      summary: newSummary.trim() || undefined,
      materials: [
        {
          id: 'mat-' + Date.now(),
          title: 'Carpeta Aules',
          type: 'aules',
          url: currentSubject.aulesUrl || 'https://aules.edu.gva.es/eso46/my/',
        },
      ],
      status: 'pending',
      flashcardCount: 0,
    };

    const updated = [...topics, newTopic];
    setTopics(updated);
    saveStoredTopics(updated);
    setNewTitle('');
    setNewSummary('');
    setShowAddTopic(false);
    setSelectedTopicId(newTopic.id);
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTopic || !matTitle.trim() || !matUrl.trim()) return;

    const newMat: TopicMaterial = {
      id: 'mat-' + Date.now(),
      title: matTitle.trim(),
      type: matType,
      url: matUrl.trim(),
    };

    const updated = topics.map((t) =>
      t.id === activeTopic.id ? { ...t, materials: [...t.materials, newMat] } : t
    );
    setTopics(updated);
    saveStoredTopics(updated);
    setMatTitle('');
    setMatUrl('');
    setShowAddMaterial(false);
  };

  const handleDeleteMaterial = (topicId: string, materialId: string) => {
    const updated = topics.map((t) =>
      t.id === topicId
        ? { ...t, materials: t.materials.filter((m) => m.id !== materialId) }
        : t
    );
    setTopics(updated);
    saveStoredTopics(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Bar with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-frost-blue)',
            borderRadius: 'var(--radius-tags)',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 1px 0 0 #111118',
          }}
        >
          <ArrowLeft size={16} />
          <span>Tornar al Tauler</span>
        </button>

        <div className="tag-mono" style={{ backgroundColor: '#eef2ff', color: 'var(--color-electric-iris)' }}>
          TEMARI CURRICULAR 2n D'ESO & AULES GVA
        </div>
      </div>

      {/* Subject Filter Bar */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {subjects.map((sub) => {
          const isSelected = sub.id === selectedSubjectId;
          const subCount = topics.filter((t) => t.subjectId === sub.id).length;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                setSelectedTopicId(null);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-buttons)',
                backgroundColor: isSelected ? sub.color : '#ffffff',
                color: isSelected ? '#ffffff' : 'var(--color-ink-black)',
                border: `2px solid ${sub.color}`,
                cursor: 'pointer',
                fontSize: '15px',
                boxShadow: isSelected ? '0 3px 0 0 #111118' : '0 1px 0 0 #111118',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{sub.icon}</span>
              <span style={{ fontWeight: 500 }}>{sub.name}</span>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : '#f0f0f5',
                  color: isSelected ? '#ffffff' : '#666677',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-martian-mono)',
                }}
              >
                {subCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Split 2 columns (Topics List on Left, Active Topic Details on Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Topics List */}
        <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '20px', margin: 0 }}>
                Unitats Didàctiques ({subjectTopics.length})
              </h2>
              <span className="font-mono" style={{ fontSize: '11px', color: '#6e6e80' }}>
                {currentSubject.name.toUpperCase()} · 2n D'ESO
              </span>
            </div>

            <button
              onClick={() => setShowAddTopic(!showAddTopic)}
              className="btn-compact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={14} />
              <span>Afegir Unitat</span>
            </button>
          </div>

          {/* Add Topic Form */}
          {showAddTopic && (
            <form
              onSubmit={handleCreateTopic}
              style={{
                backgroundColor: 'var(--color-chalk-blue)',
                padding: '16px',
                borderRadius: 'var(--radius-small)',
                border: '1px solid var(--color-frost-blue)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={newUnitNum}
                  onChange={(e) => setNewUnitNum(parseInt(e.target.value) || 1)}
                  style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                  title="Número d'unitat"
                />
                <input
                  type="text"
                  placeholder="Títol del Tema (ex. El Mètode Científic)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="superhi-input"
                  style={{ flex: 1, fontSize: '13px' }}
                  autoFocus
                />
              </div>
              <textarea
                placeholder="Resum o conceptes clau a avaluar..."
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                className="superhi-input"
                rows={2}
                style={{ fontSize: '12px' }}
              />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowAddTopic(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
                  Cancel·lar
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                  Guardar Tema
                </button>
              </div>
            </form>
          )}

          {/* Topic Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {subjectTopics.map((topic) => {
              const isActive = activeTopic && activeTopic.id === topic.id;
              const statusColors = {
                mastered: { bg: '#e6fffa', text: '#047857', border: '#a7f3d0', label: 'Dominat' },
                in_progress: { bg: '#fffbeb', text: '#b45309', border: '#fde68a', label: 'En estudi' },
                pending: { bg: '#f3f4f6', text: '#4b5563', border: '#e5e7eb', label: 'Pendent' },
              };
              const status = statusColors[topic.status];

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-small)',
                    border: `2px solid ${isActive ? currentSubject.color : 'var(--color-frost-blue)'}`,
                    backgroundColor: isActive ? '#ffffff' : '#fafbff',
                    boxShadow: isActive ? `0 2px 0 0 ${currentSubject.color}` : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: currentSubject.color }}>
                      U.{topic.unitNumber}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: status.bg,
                        color: status.text,
                        border: `1px solid ${status.border}`,
                        fontFamily: 'var(--font-martian-mono)',
                      }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-ink-black)' }}>
                    {topic.title}
                  </div>

                  {topic.summary && (
                    <div style={{ fontSize: '12px', color: '#6e6e80', lineHeight: 1.3 }}>
                      {topic.summary}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', fontSize: '11px', color: '#888899' }}>
                    <span>🔗 {topic.materials.length} materials</span>
                    <span>🧠 {topic.flashcardCount} fitxes SM-2</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Topic Detail & Materials */}
        {activeTopic ? (
          <div className="superhi-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header of Active Topic */}
            <div style={{ borderBottom: '1px solid var(--color-frost-blue)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-mono" style={{ fontSize: '13px', color: currentSubject.color }}>
                  UNITAT DIDÀCTICA {activeTopic.unitNumber}
                </span>
                <span style={{ color: '#ccc' }}>•</span>
                <span style={{ fontSize: '13px', color: '#666' }}>{currentSubject.name}</span>
              </div>
              <h2 style={{ fontSize: '24px', margin: '6px 0 0 0' }}>
                {activeTopic.title}
              </h2>
              {activeTopic.summary && (
                <p style={{ fontSize: '14px', color: '#444455', margin: '8px 0 0 0', lineHeight: 1.4 }}>
                  {activeTopic.summary}
                </p>
              )}

              {/* Status Switcher & Study Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>Estat:</span>
                  {(['pending', 'in_progress', 'mastered'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateTopicStatus(activeTopic.id, st)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor: activeTopic.status === st ? currentSubject.color : '#ffffff',
                        color: activeTopic.status === st ? '#ffffff' : '#444',
                        fontSize: '11px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-haas-grot-text)',
                      }}
                    >
                      {st === 'mastered' ? 'Dominat' : st === 'in_progress' ? 'En estudi' : 'Pendent'}
                    </button>
                  ))}
                </div>

                {onStartStudyWithTopic && (
                  <button
                    onClick={() => onStartStudyWithTopic(currentSubject.id, activeTopic.title)}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <span>⚡ Iniciar Estudi d'aquest Tema →</span>
                  </button>
                )}
              </div>
            </div>

            {/* Materials and Books Linked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
                  MATERIALS VINCULATS (AULES / LLIBRE / APUNTS):
                </div>
                <button
                  onClick={() => setShowAddMaterial(!showAddMaterial)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-electric-iris)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  + Vincular nou enllaç
                </button>
              </div>

              {/* Add Material Form */}
              {showAddMaterial && (
                <form
                  onSubmit={handleAddMaterial}
                  style={{
                    backgroundColor: '#f8faff',
                    padding: '14px',
                    borderRadius: 'var(--radius-small)',
                    border: '1px solid var(--color-frost-blue)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Títol del recurs (ex. Tema 2 a Aules, Llibre pàg. 45)"
                    value={matTitle}
                    onChange={(e) => setMatTitle(e.target.value)}
                    className="superhi-input"
                    style={{ fontSize: '13px' }}
                    autoFocus
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={matType}
                      onChange={(e) => setMatType(e.target.value as TopicMaterial['type'])}
                      style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px' }}
                    >
                      <option value="aules">Aula Virtual (Aules GVA)</option>
                      <option value="book">Llibre de Text Digital</option>
                      <option value="pdf">Document / PDF</option>
                      <option value="notes">Apunts / Cornell</option>
                    </select>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={matUrl}
                      onChange={(e) => setMatUrl(e.target.value)}
                      className="superhi-input"
                      style={{ flex: 1, fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button type="button" onClick={() => setShowAddMaterial(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
                      Cancel·lar
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                      Vincular Recurs
                    </button>
                  </div>
                </form>
              )}

              {/* Material Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeTopic.materials.map((mat) => {
                  const typeIcons = {
                    aules: '🎓',
                    book: '📖',
                    pdf: '📄',
                    notes: '✍️',
                  };
                  return (
                    <div
                      key={mat.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-small)',
                        border: '1px solid var(--color-frost-blue)',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px' }}>{typeIcons[mat.type]}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-ink-black)' }}>
                            {mat.title}
                          </div>
                          <span className="font-mono" style={{ fontSize: '11px', color: '#888899' }}>
                            {mat.type.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <a
                          href={mat.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-compact"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            textDecoration: 'none',
                          }}
                        >
                          <span>Obrir</span>
                          <ExternalLink size={12} />
                        </a>
                        <button
                          onClick={() => handleDeleteMaterial(activeTopic.id, mat.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#a0a0b0',
                            padding: '4px',
                          }}
                          title="Eliminar recurs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="superhi-card" style={{ textAlign: 'center', padding: '40px 20px', color: '#6e6e80' }}>
            Selecciona una unitat didàctica per a veure o vincular els seus materials d'Aules i llibres de text.
          </div>
        )}
      </div>
    </div>
  );
};
