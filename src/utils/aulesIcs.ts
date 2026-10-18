import type { ExamCountdown, DailyTask } from '../types';
import { SUBJECTS } from './storage';

export interface ParsedIcsEvent {
  uid: string;
  summary: string;
  description: string;
  dtstart: Date;
  dtend?: Date;
  url?: string;
  isExam: boolean;
  subjectId: string;
  subjectName: string;
  color: string;
}

/**
 * Normalizes text to match against known subjects (e.g. "Matemàtiques", "MAT", "Física")
 */
export function detectSubjectFromText(text: string) {
  const normalized = text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes('matemat') || normalized.includes('mat')) {
    return SUBJECTS.find(s => s.id === 'MAT_2ESO') || SUBJECTS[0];
  }
  if (normalized.includes('fisic') || normalized.includes('quimic') || normalized.includes('fyq')) {
    return SUBJECTS.find(s => s.id === 'FYQ_2ESO') || SUBJECTS[1];
  }
  if (normalized.includes('biolog') || normalized.includes('geolog') || normalized.includes('bio')) {
    return SUBJECTS.find(s => s.id === 'BIO_2ESO') || SUBJECTS[2];
  }
  if (normalized.includes('castell') || normalized.includes('lengua') || normalized.includes('llengua')) {
    return SUBJECTS.find(s => s.id === 'LEN_2ESO') || SUBJECTS[3];
  }
  if (normalized.includes('histor') || normalized.includes('geograf') || normalized.includes('socials') || normalized.includes('his')) {
    return SUBJECTS.find(s => s.id === 'HIS_2ESO') || SUBJECTS[4];
  }
  if (normalized.includes('angles') || normalized.includes('ingles') || normalized.includes('english') || normalized.includes('ing')) {
    return SUBJECTS.find(s => s.id === 'ING_2ESO') || SUBJECTS[5];
  }

  return SUBJECTS[0];
}

/**
 * Parses raw iCalendar (ICS) string exported from Moodle / Aules GVA.
 */
export function parseAulesIcs(icsData: string): ParsedIcsEvent[] {
  const events: ParsedIcsEvent[] = [];
  
  // Unfold ICS lines (RFC 5545 specifies lines folded with CRLF + whitespace)
  const unfolded = icsData.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '');
  const lines = unfolded.split(/\r\n|\n|\r/);

  let inEvent = false;
  let currentEvent: Record<string, string> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      currentEvent = {};
      continue;
    }
    if (line === 'END:VEVENT') {
      inEvent = false;
      if (currentEvent.UID && currentEvent.DTSTART) {
        const startDate = parseIcsDate(currentEvent.DTSTART);
        if (startDate) {
          const summary = currentEvent.SUMMARY || 'Actividad Aules';
          const description = currentEvent.DESCRIPTION || '';
          const fullText = `${summary} ${description}`;
          
          const isExam = /examen|prova|evaluac|control|cuestionario|qüestionari|parcial|test/i.test(fullText);
          const matchedSubject = detectSubjectFromText(fullText);

          events.push({
            uid: currentEvent.UID,
            summary: cleanIcsText(summary),
            description: cleanIcsText(description),
            dtstart: startDate,
            url: currentEvent.URL,
            isExam,
            subjectId: matchedSubject.id,
            subjectName: matchedSubject.name,
            color: matchedSubject.color,
          });
        }
      }
      continue;
    }

    if (inEvent) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        let key = line.substring(0, colonIdx);
        const value = line.substring(colonIdx + 1);
        // Handle parameters like DTSTART;VALUE=DATE:...
        if (key.includes(';')) {
          key = key.split(';')[0];
        }
        currentEvent[key] = value;
      }
    }
  }

  // Sort events chronologically
  return events.sort((a, b) => a.dtstart.getTime() - b.dtstart.getTime());
}

function parseIcsDate(dateStr: string): Date | null {
  // e.g. 20261025T083000Z or 20261025 or 20261025T083000
  const match = dateStr.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})Z?)?$/);
  if (!match) return null;
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);
  const hour = match[4] ? parseInt(match[4], 10) : 12;
  const min = match[5] ? parseInt(match[5], 10) : 0;
  const sec = match[6] ? parseInt(match[6], 10) : 0;
  return new Date(Date.UTC(year, month, day, hour, min, sec));
}

function cleanIcsText(text: string): string {
  return text
    .replace(/\\n/g, ' ')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim();
}

/**
 * Converts parsed ICS events into ExamCountdown objects for the D-Day widget
 */
export function convertEventsToExams(events: ParsedIcsEvent[]): ExamCountdown[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return events
    .filter(ev => ev.isExam || /entrega|plazo|vence/i.test(ev.summary))
    .map(ev => {
      const target = new Date(ev.dtstart);
      target.setHours(0, 0, 0, 0);
      const diffMs = target.getTime() - now.getTime();
      const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      const targetDate = ev.dtstart.toISOString().split('T')[0];

      return {
        id: 'aules-' + ev.uid.replace(/[^a-zA-Z0-9-]/g, ''),
        subjectId: ev.subjectId,
        subjectName: ev.subjectName,
        examTitle: ev.summary,
        targetDate,
        daysRemaining,
        color: ev.color,
      };
    });
}

/**
 * Converts parsed ICS events into DailyTask objects
 */
export function convertEventsToTasks(events: ParsedIcsEvent[]): DailyTask[] {
  return events.slice(0, 5).map(ev => {
    const hours = ev.dtstart.getHours().toString().padStart(2, '0');
    const mins = ev.dtstart.getMinutes().toString().padStart(2, '0');
    return {
      id: 'aules-task-' + ev.uid.replace(/[^a-zA-Z0-9-]/g, ''),
      title: `${ev.summary} (${ev.subjectName.split(' ')[0]})`,
      timeEstimateMinutes: 30,
      completed: false,
      subjectId: ev.subjectId,
      timeAlert: `${hours}:${mins}`,
    };
  });
}
