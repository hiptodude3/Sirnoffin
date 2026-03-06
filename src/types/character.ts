import { PrimaryStats } from './primary-stats.js';
import { DerivedStats } from './derived-stats.js';

export interface Character {
  name: string;
  level: number;
  exp: number;
  stats: PrimaryStats;
  derived: DerivedStats;
  credits: number;
}
