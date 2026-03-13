export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  questions: Question[];
}

export interface Subject {
  id: string;
  title: string;
  author: string;
  year: number;
  image: string;
  topics: Topic[];
}

export interface Player {
  id: string;
  name: string;
  subjectId: string;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  usedQuestions: Record<string, Set<string>>; // topicId -> Set of questionIds
}
