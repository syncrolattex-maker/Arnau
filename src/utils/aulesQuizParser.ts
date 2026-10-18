import type { Flashcard } from '../types';
import { detectSubjectFromText } from './aulesIcs';

/**
 * Parses raw text copied from an Aules quiz, exam review, or teacher summary,
 * or Moodle Gift / XML question formats.
 *
 * Supported formats:
 * 1. Q&A Lines:
 *    P: ¿Qué es una mitocondria?
 *    R: La central energética celular.
 *
 * 2. Question with ? followed by answer:
 *    ¿Cuáles son las capas de la geosfera?
 *    Corteza, manto y núcleo.
 *
 * 3. Standard colon separated:
 *    Tema 2 - Cambio químico: Transformación de reactivos en productos.
 */
export function parseAulesQuestionsToFlashcards(
  rawText: string,
  defaultSubjectId?: string,
  topicId?: string,
  topicTitle?: string
): Flashcard[] {
  const cards: Flashcard[] = [];
  const trimmed = rawText.trim();
  if (!trimmed) return cards;

  // Split by double newline or numbered items
  const blocks = trimmed.split(/\n\s*\n+/);

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    let question = '';
    let answer = '';

    // Check pattern 1: P: / R: or Pregunta: / Respuesta:
    const qLine = lines.find(l => /^(?:p(?:regunta)?|q(?:uestion)?)\s*[:.-]/i.test(l));
    const aLine = lines.find(l => /^(?:r(?:espuesta)?|a(?:nswer)?)\s*[:.-]/i.test(l));

    if (qLine && aLine) {
      question = qLine.replace(/^(?:p(?:regunta)?|q(?:uestion)?)\s*[:.-]\s*/i, '').trim();
      answer = aLine.replace(/^(?:r(?:espuesta)?|a(?:nswer)?)\s*[:.-]\s*/i, '').trim();
    } else {
      // Pattern 2: First line has question mark or is line 0, second line is answer
      question = lines[0].replace(/^\d+[\s.)-]+\s*/, '').trim();
      answer = lines.slice(1).join(' ').trim();
    }

    if (question && answer) {
      const subject = detectSubjectFromText(question + ' ' + answer);
      const subjectId = defaultSubjectId || subject.id;

      cards.push({
        id: 'aules-card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        subjectId,
        subjectName: subject.name,
        topicId,
        topicTitle: topicTitle || (topicId ? 'Tema de Aules' : undefined),
        sourceAules: true,
        question,
        answer,
        cornellKeyIdea: topicTitle ? `${topicTitle}: ${question.slice(0, 30)}...` : `Aules: ${question.slice(0, 35)}...`,
        interval: 1,
        repetitions: 0,
        easeFactor: 2.5,
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
  }

  return cards;
}
