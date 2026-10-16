import type {
  SubjectInfo,
  DailyTask,
  ExamCountdown,
  Flashcard,
  FriendPresence,
  SharedIsland,
  StudySessionRecord,
} from '../types';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'MAT_2ESO',
    name: 'Matemáticas',
    code: 'MAT',
    color: '#e63946',
    category: 'stem',
    icon: '📐',
    recommendedMinimumRatio: 0.15,
  },
  {
    id: 'FYQ_2ESO',
    name: 'Física y Química',
    code: 'FYQ',
    color: '#7209b7',
    category: 'stem',
    icon: '⚡',
    recommendedMinimumRatio: 0.15,
  },
  {
    id: 'BIO_2ESO',
    name: 'Biología y Geología',
    code: 'BIO',
    color: '#2a9d8f',
    category: 'stem',
    icon: '🔬',
    recommendedMinimumRatio: 0.15,
  },
  {
    id: 'LEN_2ESO',
    name: 'Lengua Castellana',
    code: 'LEN',
    color: '#f4a261',
    category: 'language',
    icon: '📖',
    recommendedMinimumRatio: 0.12,
  },
  {
    id: 'HIS_2ESO',
    name: 'Geografía e Historia',
    code: 'HIS',
    color: '#e76f51',
    category: 'humanities',
    icon: '🌍',
    recommendedMinimumRatio: 0.12,
  },
  {
    id: 'ING_2ESO',
    name: 'Inglés',
    code: 'ING',
    color: '#457b9d',
    category: 'language',
    icon: '💬',
    recommendedMinimumRatio: 0.1,
  },
];

const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    title: 'Ejercicios 3, 4 y 7 de Ecuaciones de 1º grado',
    timeEstimateMinutes: 25,
    completed: true,
    subjectId: 'MAT_2ESO',
    timeAlert: '17:00',
  },
  {
    id: 'task-2',
    title: 'Esquema Cornell: La Célula y Orgánulos Celulares',
    timeEstimateMinutes: 30,
    completed: false,
    subjectId: 'BIO_2ESO',
    timeAlert: '17:45',
  },
  {
    id: 'task-3',
    title: 'Repaso 12 fichas Anki de Formulaciones Químicas',
    timeEstimateMinutes: 15,
    completed: false,
    subjectId: 'FYQ_2ESO',
    timeAlert: '18:30',
  },
  {
    id: 'task-4',
    title: 'Análisis sintáctico: Complemento Directo vs Indirecto',
    timeEstimateMinutes: 20,
    completed: false,
    subjectId: 'LEN_2ESO',
    timeAlert: '19:00',
  },
];

const INITIAL_EXAMS: ExamCountdown[] = [
  {
    id: 'exam-1',
    subjectId: 'BIO_2ESO',
    subjectName: 'Biología y Geología',
    examTitle: 'Unidad 3: Estructura Celular y Tejidos',
    targetDate: '2026-10-18',
    daysRemaining: 2,
    color: '#2a9d8f',
  },
  {
    id: 'exam-2',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física y Química',
    examTitle: 'Estados de la Materia y Leyes de los Gases',
    targetDate: '2026-10-21',
    daysRemaining: 5,
    color: '#7209b7',
  },
  {
    id: 'exam-3',
    subjectId: 'MAT_2ESO',
    subjectName: 'Matemáticas',
    examTitle: 'Control Bloque Álgebra y Monomios',
    targetDate: '2026-10-25',
    daysRemaining: 9,
    color: '#e63946',
  },
  {
    id: 'exam-4',
    subjectId: 'HIS_2ESO',
    subjectName: 'Geografía e Historia',
    examTitle: 'Feudalismo, Vasallaje y Sociedad Estamental',
    targetDate: '2026-10-30',
    daysRemaining: 14,
    color: '#e76f51',
  },
];

const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'card-1',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física y Química',
    question: '¿Cuál es la diferencia fundamental entre un cambio físico y un cambio químico?',
    answer:
      'En el cambio físico no se altera la naturaleza de las sustancias (ej. fusión del hielo). En el cambio químico las sustancias iniciales (reactivos) se transforman en sustancias nuevas (productos) con enlaces diferentes.',
    cornellKeyIdea: 'Reactivos -> Productos con nueva naturaleza.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-16',
  },
  {
    id: 'card-2',
    subjectId: 'BIO_2ESO',
    subjectName: 'Biología y Geología',
    question: '¿Qué orgánulo es la "central energética" de la célula eucariota y qué proceso realiza?',
    answer:
      'La mitocondria. Realiza la respiración celular, oxidando nutrientes con oxígeno para obtener energía metabólica en forma de ATP, desprendiendo CO₂ y agua.',
    cornellKeyIdea: 'Mitocondria: Respiración celular + ATP.',
    interval: 2,
    repetitions: 1,
    easeFactor: 2.45,
    dueDate: '2026-10-16',
  },
  {
    id: 'card-3',
    subjectId: 'MAT_2ESO',
    subjectName: 'Matemáticas',
    question: 'Si una ecuación de 1er grado da como resultado 0x = 5, ¿cuántas soluciones tiene?',
    answer: 'No tiene solución (incompatible), ya que ningún número multiplicado por cero puede resultar en 5.',
    cornellKeyIdea: '0x = k (con k ≠ 0) -> Sin solución.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-16',
  },
  {
    id: 'card-4',
    subjectId: 'HIS_2ESO',
    subjectName: 'Geografía e Historia',
    question: '¿En qué consistía el pacto de vasallaje medieval y qué dos ceremonias incluía?',
    answer:
      'Era un contrato bilateral entre nobles: el vasallo juraba fidelidad militar y consejo al señor feudal a cambio de protección y un feudo. Se sellaba con el Homenaje (inmixtio manuum) y la Investidura (entrega de símbolo).',
    cornellKeyIdea: 'Fidelidad a cambio de feudo: Homenaje + Investidura.',
    interval: 3,
    repetitions: 2,
    easeFactor: 2.5,
    dueDate: '2026-10-16',
  },
  {
    id: 'card-5',
    subjectId: 'LEN_2ESO',
    subjectName: 'Lengua Castellana',
    question: '¿Cuál es la prueba inequívoca para identificar el Complemento Directo (CD) en una oración?',
    answer:
      '1) Se puede sustituir por los pronombres lo, la, los, las. 2) Al pasar la oración a voz pasiva, el CD se transforma en el Sujeto Paciente.',
    cornellKeyIdea: 'Pronominalización lo/la/los/las y conversión a pasiva.',
    interval: 4,
    repetitions: 2,
    easeFactor: 2.6,
    dueDate: '2026-10-16',
  },
  {
    id: 'card-6',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física y Química',
    question: '¿Qué enuncia la Ley de Conservación de la Masa de Lavoisier?',
    answer:
      'En toda reacción química en un sistema cerrado, la masa total de los reactivos es exactamente igual a la masa total de los productos: la materia ni se crea ni se destruye, solo se transforma.',
    cornellKeyIdea: 'Masa reactivos = Masa productos.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-16',
  },
];

const INITIAL_FRIENDS: FriendPresence[] = [
  {
    id: 'f-1',
    name: 'Lucía M.',
    avatar: '🌱',
    currentSubject: 'Biología y Geología',
    subjectColor: '#2a9d8f',
    minutesActiveToday: 55,
    isLive: true,
    currentSessionMinutes: 38,
  },
  {
    id: 'f-2',
    name: 'Marc S.',
    avatar: '⚡',
    currentSubject: 'Física y Química',
    subjectColor: '#7209b7',
    minutesActiveToday: 42,
    isLive: true,
    currentSessionMinutes: 42,
  },
  {
    id: 'f-3',
    name: 'Clara V.',
    avatar: '📐',
    currentSubject: 'Matemáticas',
    subjectColor: '#e63946',
    minutesActiveToday: 60,
    isLive: false,
    currentSessionMinutes: 0,
  },
  {
    id: 'f-4',
    name: 'Hugo R.',
    avatar: '🌍',
    currentSubject: 'Geografía e Historia',
    subjectColor: '#e76f51',
    minutesActiveToday: 25,
    isLive: true,
    currentSessionMinutes: 14,
  },
  {
    id: 'f-5',
    name: 'Pau T.',
    avatar: '💬',
    currentSubject: 'Inglés',
    subjectColor: '#457b9d',
    minutesActiveToday: 30,
    isLive: false,
    currentSessionMinutes: 0,
  },
];

const INITIAL_ISLAND: SharedIsland = {
  name: 'Isla Roble 2ºB',
  collectiveMinutesToday: 212,
  totalIslandMinutes: 1450,
  level: 4,
  activeBuddiesCount: 3,
  streakDays: 8,
  status: 'flourishing',
};

const INITIAL_SESSIONS: StudySessionRecord[] = [
  {
    id: 's-1',
    student_id: 'arnau-2eso',
    subject_id: 'MAT_2ESO',
    start_timestamp: Date.now() - 3600000 * 2,
    end_timestamp: Date.now() - 3600000 * 1.2,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 48,
    coins_earned: 48,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 's-2',
    student_id: 'arnau-2eso',
    subject_id: 'FYQ_2ESO',
    start_timestamp: Date.now() - 3600000 * 4,
    end_timestamp: Date.now() - 3600000 * 3.3,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 42,
    coins_earned: 42,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 's-3',
    student_id: 'arnau-2eso',
    subject_id: 'BIO_2ESO',
    start_timestamp: Date.now() - 3600000 * 24,
    end_timestamp: Date.now() - 3600000 * 23.2,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 48,
    coins_earned: 48,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 's-4',
    student_id: 'arnau-2eso',
    subject_id: 'LEN_2ESO',
    start_timestamp: Date.now() - 3600000 * 48,
    end_timestamp: Date.now() - 3600000 * 47.4,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 36,
    coins_earned: 36,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 's-5',
    student_id: 'arnau-2eso',
    subject_id: 'ING_2ESO',
    start_timestamp: Date.now() - 3600000 * 72,
    end_timestamp: Date.now() - 3600000 * 71.5,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 30,
    coins_earned: 30,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 's-6',
    student_id: 'arnau-2eso',
    subject_id: 'HIS_2ESO',
    start_timestamp: Date.now() - 3600000 * 96,
    end_timestamp: Date.now() - 3600000 * 95.8,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 12,
    coins_earned: 12,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export function getStoredTasks(): DailyTask[] {
  const data = localStorage.getItem('arnau_tasks_2eso');
  return data ? JSON.parse(data) : INITIAL_TASKS;
}

export function saveStoredTasks(tasks: DailyTask[]) {
  localStorage.setItem('arnau_tasks_2eso', JSON.stringify(tasks));
}

export function getStoredExams(): ExamCountdown[] {
  const data = localStorage.getItem('arnau_exams_2eso');
  return data ? JSON.parse(data) : INITIAL_EXAMS;
}

export function getStoredFlashcards(): Flashcard[] {
  const data = localStorage.getItem('arnau_flashcards_2eso');
  return data ? JSON.parse(data) : INITIAL_FLASHCARDS;
}

export function saveStoredFlashcards(cards: Flashcard[]) {
  localStorage.setItem('arnau_flashcards_2eso', JSON.stringify(cards));
}

export function getStoredCoins(): number {
  const data = localStorage.getItem('arnau_coins_2eso');
  return data ? parseInt(data, 10) : 185;
}

export function saveStoredCoins(coins: number) {
  localStorage.setItem('arnau_coins_2eso', coins.toString());
}

export function getStoredSessions(): StudySessionRecord[] {
  const data = localStorage.getItem('arnau_sessions_2eso');
  return data ? JSON.parse(data) : INITIAL_SESSIONS;
}

export function saveStoredSessions(sessions: StudySessionRecord[]) {
  localStorage.setItem('arnau_sessions_2eso', JSON.stringify(sessions));
}

export function getStoredFriends(): FriendPresence[] {
  return INITIAL_FRIENDS;
}

export function getStoredIsland(): SharedIsland {
  const data = localStorage.getItem('arnau_island_2eso');
  return data ? JSON.parse(data) : INITIAL_ISLAND;
}

export function saveStoredIsland(island: SharedIsland) {
  localStorage.setItem('arnau_island_2eso', JSON.stringify(island));
}
