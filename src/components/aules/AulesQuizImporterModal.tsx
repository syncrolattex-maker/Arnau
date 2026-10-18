import React, { useState } from 'react';
import { Sparkles, BookOpen, AlertCircle, Check, X, FileText } from 'lucide-react';
import { parseAulesQuestionsToFlashcards } from '../../utils/aulesQuizParser';
import { getStoredSubjects } from '../../utils/storage';
import { getStoredTopics } from '../../utils/topicsStorage';
import type { Flashcard } from '../../types';

interface AulesQuizImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportFlashcards: (newCards: Flashcard[]) => void;
}

export const AulesQuizImporterModal: React.FC<AulesQuizImporterModalProps> = ({
  isOpen,
  onClose,
  onImportFlashcards,
}) => {
  const subjects = getStoredSubjects();
  const topics = getStoredTopics();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0].id);
  const subjectTopics = topics.filter((t) => t.subjectId === selectedSubjectId);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(subjectTopics[0]?.id || '');
  const [rawText, setRawText] = useState<string>('');
  const [parsedCards, setParsedCards] = useState<Flashcard[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleParse = () => {
    const cards = parseAulesQuestionsToFlashcards(rawText, selectedSubjectId);
    setParsedCards(cards);
  };

  const handleConfirm = () => {
    if (parsedCards.length === 0) return;
    onImportFlashcards(parsedCards);
    setSuccessMsg(`¡${parsedCards.length} targetes importades amb èxit!`);
    setTimeout(() => {
      onClose();
      setRawText('');
      setParsedCards([]);
      setSuccessMsg(null);
    }, 1200);
  };

  const handleLoadSample = () => {
    const sample = `Què és una reacció química exotèrmica?
És aquella reacció en la qual es desprén energia en forma de calor cap a l'entorn.

Què estableix la llei de les proporcions definides de Proust?
Quan dos o més elements es combinen per a formar un compost determinat, ho fan sempre en una relació de massa constant.

P: Quines són les tres parts fonamentals d'un àtom?
R: Protons i neutrons (al nucli) i electrons (a l'escorça).`;
    setRawText(sample);
    const cards = parseAulesQuestionsToFlashcards(sample, selectedSubjectId);
    setParsedCards(cards);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(17, 17, 24, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="superhi-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          position: 'relative',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6e6e80',
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            className="round-icon-48"
            style={{
              backgroundColor: '#fef3c7',
              color: '#d97706',
              boxShadow: '0 2px 0 0 #111118',
            }}
          >
            <Sparkles size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', margin: 0 }}>Importar Qüestionaris d'Aules a Flashcards</h2>
            <p className="font-mono" style={{ fontSize: '12px', color: '#6e6e80', margin: '4px 0 0 0' }}>
              CONVERSIÓ AUTOMÀTICA A FITXES DE REPETICIÓ ESPAIADA SM-2
            </p>
          </div>
        </div>

        {/* Explanation */}
        <div
          style={{
            backgroundColor: '#f8f9fc',
            border: '1px solid var(--color-frost-blue)',
            borderRadius: 'var(--radius-small)',
            padding: '12px 14px',
            fontSize: '13px',
            lineHeight: 1.4,
            color: '#444455',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div>
            Copia i apega les preguntes i respostes d'un examen, qüestionari o resum d'Aules. El sistema les dividirà automàticament en fitxes llestes per a entrenar la teua memòria activa.
          </div>
          <button
            onClick={handleLoadSample}
            style={{
              alignSelf: 'flex-start',
              background: 'none',
              border: 'none',
              color: 'var(--color-electric-iris)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            + Provar amb un exemple de mostra
          </button>
        </div>

        {/* Subject & Topic Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
              1. ASSIGNATURA D'AULES:
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                const subTopics = topics.filter((t) => t.subjectId === e.target.value);
                const firstTopicId = subTopics[0]?.id || '';
                setSelectedTopicId(firstTopicId);
                if (rawText) {
                  setParsedCards(parseAulesQuestionsToFlashcards(rawText, e.target.value, firstTopicId, subTopics[0]?.title));
                }
              }}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-tags)',
                border: '1px solid var(--color-frost-blue)',
                backgroundColor: '#ffffff',
                fontSize: '13px',
              }}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon} {s.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
              2. TEMA / UNITAT ACTUAL:
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => {
                setSelectedTopicId(e.target.value);
                const topicObj = topics.find((t) => t.id === e.target.value);
                if (rawText) {
                  setParsedCards(parseAulesQuestionsToFlashcards(rawText, selectedSubjectId, e.target.value, topicObj?.title));
                }
              }}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-tags)',
                border: '1px solid var(--color-frost-blue)',
                backgroundColor: '#ffffff',
                fontSize: '13px',
              }}
            >
              <option value="">(Qualsevol tema / General)</option>
              {subjectTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  U.{t.unitNumber}: {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
            CONTINGUT REAL D'AULES (PREGUNTES, TASQUES, QÜESTIONARI):
          </label>
          <textarea
            rows={6}
            placeholder={`Què és una cèl·lula procariota?&#10;És una cèl·lula sense nucli delimitat per membrana, amb el seu ADN dispers en el citoplasma.`}
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              const topicObj = topics.find((t) => t.id === selectedTopicId);
              setParsedCards(parseAulesQuestionsToFlashcards(e.target.value, selectedSubjectId, selectedTopicId, topicObj?.title));
            }}
            className="superhi-input"
            style={{ fontSize: '13px', lineHeight: 1.5, resize: 'vertical' }}
          />
        </div>

        {/* Preview of Parsed Flashcards */}
        {parsedCards.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
              FITXES RECONEGUDES ({parsedCards.length}):
            </div>
            <div
              style={{
                maxHeight: '160px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingRight: '4px',
              }}
            >
              {parsedCards.map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-frost-blue)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--color-ink-black)' }}>
                    {card.question}
                  </div>
                  <div style={{ color: '#555566', marginTop: '2px' }}>
                    {card.answer}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleConfirm}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
            >
              Guardar i Incorporar al meu Repàs de Hui ({parsedCards.length})
            </button>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              backgroundColor: '#e6fffa',
              border: '1px solid #b2f5ea',
              borderRadius: 'var(--radius-small)',
              color: '#234e52',
              fontSize: '13px',
            }}
          >
            <Check size={16} />
            <span>{successMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
