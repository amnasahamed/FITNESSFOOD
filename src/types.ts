export type EventType = 'meal' | 'water' | 'workout' | 'supplement';

export interface TimelineEvent {
  id: string;
  time: string;
  type: EventType;
  title: string;
  items: string[];
  protein?: string;
  description?: string;
}

export interface UserProfile {
  age: number;
  height: string;
  weight: string;
  waist: string;
  goal: string;
  work: string;
  targetWeight: string;
  calories: string;
}
