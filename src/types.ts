export type HabitatId = 'garden' | 'park' | 'forest' | 'field' | 'water' | 'reed' | 'mountain';
export type RegionId = 'north' | 'central' | 'south';
export type VoiceType = 'song' | 'call' | 'alarm' | 'flight' | 'drumming';
export type LessonPhase = 'learn' | 'duel' | 'choice' | 'recall' | 'exam';
export type MasteryLabel = 'Unbekannt' | 'Gehört' | 'Erkannt' | 'Sicher' | 'Feldbereit';
export type GameMode = 'classic' | 'adaptive' | 'dawn' | 'survival' | 'soundscape' | 'clue';

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  habitats: HabitatId[];
  regions: RegionId[];
  activeMonths: number[];
  difficulty: 1 | 2 | 3;
  fact: string;
  songTip: string;
  callTip: string;
  confusions: string[];
  voiceTypes: VoiceType[];
  illustration: { palette: [string, string, string, string]; mark?: 'crest' | 'long-tail' | 'red-chest' | 'long-beak' };
  photo: string;
}

export interface Recording {
  id: string;
  speciesId: string;
  voiceType: VoiceType;
  src: string;
  durationSeconds: number;
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  changes?: string;
  bytes: number;
}

export interface PhotoCredit {
  speciesId: string;
  src: string;
  creator: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  bytes: number;
}

export interface MediaManifest {
  version: string;
  generatedAt: string;
  totalBytes: number;
  audioProcessing: { highpassHz: number; poles: number; loudnessLufs: number; fadeInMs: number; fadeOutMs: number };
  recordings: Recording[];
  photos: PhotoCredit[];
}

export interface Course {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  habitat: HabitatId | 'mixed';
  speciesIds: string[];
  voiceType: VoiceType | 'mixed';
  lessonPhases: LessonPhase[];
}

export interface ReviewItem {
  key: string;
  speciesId: string;
  voiceType: VoiceType;
  step: number;
  dueAt: number;
  correct: number;
  wrong: number;
  lapses: number;
  lastSeenAt: number;
  lastGrade: 0 | 3 | 5;
}

export interface AnswerEvent {
  speciesId: string;
  voiceType: VoiceType;
  recordingId: string;
  chosenId: string | null;
  correct: boolean;
  hintUsed: boolean;
  responseMs: number;
}

export interface SessionResult {
  id: string;
  kind: 'course' | 'mode' | 'placement' | 'review' | 'daily' | 'expedition';
  mode?: GameMode;
  courseId?: string;
  phase?: LessonPhase;
  startedAt: number;
  finishedAt: number;
  score: number;
  answers: AnswerEvent[];
}

export interface CourseProgress {
  examBest: number;
  completed: boolean;
  completedPhases: LessonPhase[];
}

export interface AppSettings {
  region: 'all' | RegionId;
  seasonal: boolean;
  spatialAudio: boolean;
  relaxed: boolean;
  contrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  weather: 'still' | 'breeze' | 'rain';
}

export interface Profile {
  version: 2;
  createdAt: number;
  dailyGoal: number;
  dailyStreak: number;
  lastDailyDate: string;
  recommendedCourseId: string;
  placementCourseId: string | null;
  totalCorrect: number;
  totalAnswers: number;
  bestStreak: number;
  achievements: string[];
  courseProgress: Record<string, CourseProgress>;
  confusions: Record<string, number>;
  settings: AppSettings;
}

export interface OfflineState {
  version: string;
  cached: string[];
  failed: string[];
  total: number;
  totalBytes: number;
  downloadedBytes: number;
  ready: boolean;
  paused: boolean;
}

export interface BackupPayload {
  format: 'zwitscher-backup';
  version: 2;
  exportedAt: string;
  profile: Profile;
  reviews: ReviewItem[];
  sessions: SessionResult[];
}
