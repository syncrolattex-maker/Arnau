import React, { useState } from 'react';
import type { Flashcard, ReviewRating } from '../../types';
import { calculateSM2 } from '../../utils/sm2';
import { Brain, RotateCw, AlertTriangle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RetrievalQuadrantProps {
  flashcards: Flashcard[];
  onUpdateFlashcard: (updatedCard: Flashcard) => void;
  onCoinsEarned: (coins: number) => void;
  onOpenAulesImport?: () => void;
}

export const RetrievalQuadrant: React.FC<RetrievalQuadrantProps> = ({
  flashcards,
  onUpdateFlashcard,
  onCoinsEarned,
  onOpenAulesImport,
}) => {
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [sessionAccuracy, setSessionAccuracy] = useState<{ total: number; correct: number }>({
    total: 6,
    correct: 5,
  });
  const [lastCalculationLog, setLastCalculationLog] = useState<string | null>(null);

  // Cards due for today
  const pendingCards = flashcards;

  const currentCard = pendingCards[currentIndex];

  const handleStartReview = () => {
    if (pendingCards.length === 0) return;
    setIsReviewing(true);
    setCurrentIndex(0);
    setShowAnswer(false);
    setLastCalculationLog(null);
  };

  const handleRate = (rating: ReviewRating) => {
    if (!currentCard) return;

    // Apply exact SM-2 computation
    const result = calculateSM2(currentCard, rating);

    const updatedCard: Flashcard = {
      ...currentCard,
      easeFactor: result.newEaseFactor,
      interval: result.newInterval,
      repetitions: result.newRepetitions,
      dueDate: result.nextDueDate,
      lastReviewed: new Date().toISOString(),
    };

    onUpdateFlashcard(updatedCard);

    // Update accuracy statistics
    setSessionAccuracy((prev) => ({
      total: prev.total + 1,
      correct: rating >= 3 ? prev.correct + 1 : prev.correct,
    }));

    // Log the calculation for student transparency
    const ratingLabels: Record<ReviewRating, string> = {
      0: 'Repetir (q=0)',
      3: 'Difícil (q=3)',
      4: 'Bé (q=4)',
      5: 'Fàcil (q=5)',
    };
    setLastCalculationLog(
      `SM-2: ${ratingLabels[rating]} → Nou EF: ${result.newEaseFactor} | Pròxim repàs en ${result.newInterval} dia(es)`
    );

    // If rated Fácil or Bien, award +2 bonus coins
    if (rating >= 4) {
      onCoinsEarned(2);
    }

    // Move to next card or finish
    if (currentIndex + 1 < pendingCards.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      // Completed review deck!
      setIsReviewing(false);
      setShowAnswer(false);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.7 },
        });
      } catch {
        // Ignored
      }
    }
  };

  const accuracyPercent = Math.round(
    (sessionAccuracy.correct / Math.max(1, sessionAccuracy.total)) * 100
  );

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
              backgroundColor: '#16ab59',
            }}
          />
          <h2 style={{ fontSize: '22px', margin: 0 }}>
            3. Memorització & Recuperació Activa (Anki SM-2)
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onOpenAulesImport && (
            <button
              onClick={onOpenAulesImport}
              title="Importar qüestionaris o preguntes d'Aules"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: '#fef3c7',
                color: '#b45309',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-tags)',
                padding: '4px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              <Sparkles size={13} />
              <span>Importar d'Aules</span>
            </button>
          )}

          <div className="tag-mono" style={{ backgroundColor: '#e1edff', color: 'var(--color-electric-iris)' }}>
            {accuracyPercent}% Encerts
          </div>
        </div>
      </div>

      {!isReviewing ? (
        /* Standby State: Direct overview & 1-click Start */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: 'var(--color-chalk-blue)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--color-frost-blue)',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', color: '#6e6e80', fontFamily: 'var(--font-martian-mono)' }}>
                FITXES PROGRAMADES PER A HUI:
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-haas-grot-disp)',
                  fontSize: '44px',
                  color: 'var(--color-ink-black)',
                  lineHeight: 1,
                  marginTop: '4px',
                }}
              >
                {pendingCards.length}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#6e6e80' }}>
                Algorisme Actiu:
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '14px',
                  color: 'var(--color-electric-iris)',
                  marginTop: '2px',
                }}
              >
                SuperMemo SM-2
              </div>
            </div>
          </div>

          {/* Anti-AI Pedagogical Alert (Section 2.3) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-small)',
              backgroundColor: '#fffbe6',
              border: '1px solid #ffe58f',
              fontSize: '12px',
              lineHeight: 1.35,
              color: '#614700',
            }}
          >
            <AlertTriangle size={18} color="#d48806" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Principi de Codificació Activa:</strong> Prohibit utilitzar IA per a crear fitxes
              automàtiques sense esforç. El 50% de la fixació de memòria es produeix redactant tu mateix la pregunta i la
              síntesi.
            </div>
          </div>

          {lastCalculationLog && (
            <div
              className="font-mono"
              style={{
                fontSize: '11px',
                color: '#2727e6',
                padding: '6px 10px',
                backgroundColor: '#f0f4ff',
                borderRadius: '6px',
              }}
            >
              {lastCalculationLog}
            </div>
          )}

          <button
            onClick={handleStartReview}
            className="btn-primary"
            style={{ width: '100%', fontSize: '18px', marginTop: '4px' }}
          >
            <Brain size={20} />
            <span>Començar Repàs de Fitxes →</span>
          </button>
        </div>
      ) : (
        /* Active Card Reviewer */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Progress Bar & Counter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: '#6e6e80' }}>
              FITXA {currentIndex + 1} DE {pendingCards.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {currentCard?.topicTitle && (
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-haas-grot-text)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    border: '1px solid #fde68a',
                  }}
                >
                  📖 {currentCard.topicTitle}
                </span>
              )}
              {currentCard?.sourceAules && (
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-martian-mono)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: '#e0e7ff',
                    color: '#3730a3',
                    fontWeight: 600,
                  }}
                  title="Fitxa generada a partir del temari oficial d'Aules GVA"
                >
                  AULES GVA
                </span>
              )}
              {currentCard && (
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-martian-mono)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#e1edff',
                    color: 'var(--color-ink-black)',
                  }}
                >
                  {currentCard.subjectName}
                </span>
              )}
            </div>
          </div>

          {/* Flashcard Box */}
          <div
            style={{
              minHeight: '190px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-small)',
              border: '2px solid #111118',
              boxShadow: '0 3px 0 0 #111118',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{ fontSize: '11px', color: '#888899', marginBottom: '6px' }}
              >
                PREGUNTA / CONCEPTE CLAU:
              </div>
              <div
                style={{
                  fontSize: '17px',
                  color: 'var(--color-ink-black)',
                  lineHeight: 1.35,
                }}
              >
                {currentCard?.question}
              </div>
            </div>

            {showAnswer ? (
              <div
                style={{
                  paddingTop: '12px',
                  borderTop: '1px dashed var(--color-frost-blue)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  className="font-mono"
                  style={{ fontSize: '11px', color: '#16ab59' }}
                >
                  RESPOSTA CONSOLIDADA:
                </div>
                <div style={{ fontSize: '15px', color: '#222233', lineHeight: 1.4 }}>
                  {currentCard?.answer}
                </div>
                {currentCard?.cornellKeyIdea && (
                  <div
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#f0f6ff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      color: 'var(--color-electric-iris)',
                      marginTop: '4px',
                    }}
                  >
                    💡 Clau Cornell: {currentCard.cornellKeyIdea}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="btn-dark"
                  style={{ fontSize: '16px', padding: '10px 20px' }}
                >
                  <RotateCw size={16} />
                  <span>Mostrar Resposta</span>
                </button>
              </div>
            )}
          </div>

          {/* SM-2 Rating Buttons (Active once answer is revealed) */}
          {showAnswer ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                className="font-mono"
                style={{ fontSize: '11px', color: '#555566', textAlign: 'center' }}
              >
                AVALUA EL TEU ESFORÇ DE RECUPERACIÓ (ALGORISME SM-2):
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                }}
              >
                <button
                  onClick={() => handleRate(0)}
                  style={{
                    backgroundColor: '#fff0f0',
                    border: '1px solid #ff4141',
                    color: '#ff4141',
                    borderRadius: 'var(--radius-buttons)',
                    padding: '8px 4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 0 0 #ff4141',
                    fontFamily: 'var(--font-haas-grot-text)',
                  }}
                >
                  Repetir (0)
                  <span style={{ display: 'block', fontSize: '10px', opacity: 0.8 }}>1 dia</span>
                </button>

                <button
                  onClick={() => handleRate(3)}
                  style={{
                    backgroundColor: '#fff8f0',
                    border: '1px solid #f4a261',
                    color: '#d46b08',
                    borderRadius: 'var(--radius-buttons)',
                    padding: '8px 4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 0 0 #f4a261',
                    fontFamily: 'var(--font-haas-grot-text)',
                  }}
                >
                  Difícil (3)
                  <span style={{ display: 'block', fontSize: '10px', opacity: 0.8 }}>Ajust EF</span>
                </button>

                <button
                  onClick={() => handleRate(4)}
                  style={{
                    backgroundColor: '#f0f6ff',
                    border: '1px solid var(--color-electric-iris)',
                    color: 'var(--color-electric-iris)',
                    borderRadius: 'var(--radius-buttons)',
                    padding: '8px 4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 0 0 var(--color-electric-iris)',
                    fontFamily: 'var(--font-haas-grot-text)',
                  }}
                >
                  Bé (4)
                  <span style={{ display: 'block', fontSize: '10px', opacity: 0.8 }}>Normal</span>
                </button>

                <button
                  onClick={() => handleRate(5)}
                  style={{
                    backgroundColor: '#f0fff4',
                    border: '1px solid #16ab59',
                    color: '#16ab59',
                    borderRadius: 'var(--radius-buttons)',
                    padding: '8px 4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 0 0 #16ab59',
                    fontFamily: 'var(--font-haas-grot-text)',
                  }}
                >
                  Fàcil (5)
                  <span style={{ display: 'block', fontSize: '10px', opacity: 0.8 }}>+Bonus</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setIsReviewing(false)}
                className="btn-ghost"
                style={{ fontSize: '14px' }}
              >
                Pausar repàs i tornar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
