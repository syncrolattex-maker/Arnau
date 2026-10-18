export type DeviceOS = 'iOS' | 'Android' | 'Web';

export interface PauseInterval {
  start: number;
  end: number;
}

export interface StudySessionPayload {
  student_id: string;
  subject_id: string; // e.g. "MAT_2ESO", "FYQ_2ESO", "BIO_2ESO"
  start_timestamp: number; // UTC Epoch ms
  end_timestamp: number;   // UTC Epoch ms
  pause_intervals: PauseInterval[];
  device_os: DeviceOS;
}

export interface StudySessionRecord extends StudySessionPayload {
  id: string;
  net_minutes: number;
  coins_earned: number;
  created_at: string;
}

export interface TopicMaterial {
  id: string;
  title: string;
  type: 'aules' | 'book' | 'pdf' | 'notes';
  url: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  unitNumber: number;
  title: string;
  summary?: string;
  materials: TopicMaterial[];
  status: 'pending' | 'in_progress' | 'mastered';
  flashcardCount: number;
}

export interface SubjectInfo {
  id: string;
  name: string;
  code: string;
  color: string;
  category: 'stem' | 'humanities' | 'language';
  icon: string;
  recommendedMinimumRatio: number; // e.g., 0.10 (10%)
  aulesUrl?: string;
  topics?: Topic[];
}

export interface DailyTask {
  id: string;
  title: string;
  timeEstimateMinutes: number;
  completed: boolean;
  subjectId: string;
  timeAlert?: string; // e.g. "17:30"
}

export interface ExamCountdown {
  id: string;
  subjectId: string;
  subjectName: string;
  examTitle: string;
  targetDate: string; // YYYY-MM-DD
  daysRemaining: number;
  color: string;
}

export interface Flashcard {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId?: string;
  topicTitle?: string;
  sourceAules?: boolean;
  question: string;
  answer: string;
  cornellKeyIdea?: string;
  interval: number; // days until next review
  repetitions: number;
  easeFactor: number; // EF initial 2.5, min 1.3
  dueDate: string; // ISO date string
  lastReviewed?: string;
}

export type ReviewRating = 0 | 3 | 4 | 5; // 0: Repetir, 3: Difícil, 4: Bien, 5: Fácil

export interface FriendPresence {
  id: string;
  name: string;
  avatar: string;
  currentSubject: string;
  subjectColor: string;
  minutesActiveToday: number;
  isLive: boolean;
  currentSessionMinutes: number;
}

export interface SharedIsland {
  name: string;
  collectiveMinutesToday: number;
  totalIslandMinutes: number;
  level: number;
  activeBuddiesCount: number;
  streakDays: number;
  status: 'flourishing' | 'growing' | 'paused';
}

export interface AuditQuestionAnswer {
  questionId: number;
  answer: boolean;
}
