// Static team metadata to supplement the live API.
// Note: Rankings are approximate real-world FIFA rankings as of late 2024.
// Form is an array of latest 5 match results.

export const teamMetadata: Record<string, { ranking: number; coach: string; confederation: string; recentForm: string[] }> = {
  // Group A
  MEX: { ranking: 15, coach: 'Jaime Lozano', confederation: 'CONCACAF', recentForm: ['W', 'L', 'W', 'W', 'L'] },
  RSA: { ranking: 59, coach: 'Hugo Broos', confederation: 'CAF', recentForm: ['D', 'W', 'D', 'D', 'W'] },
  KOR: { ranking: 23, coach: 'Jürgen Klinsmann', confederation: 'AFC', recentForm: ['W', 'W', 'D', 'W', 'D'] },
  CZE: { ranking: 36, coach: 'Ivan Hašek', confederation: 'UEFA', recentForm: ['L', 'D', 'W', 'W', 'D'] },

  // Group B
  CAN: { ranking: 49, coach: 'Mauro Biello', confederation: 'CONCACAF', recentForm: ['L', 'W', 'L', 'D', 'W'] },
  BIH: { ranking: 71, coach: 'Savo Milošević', confederation: 'UEFA', recentForm: ['L', 'L', 'L', 'L', 'W'] },
  QAT: { ranking: 34, coach: 'Tintín Márquez', confederation: 'AFC', recentForm: ['W', 'W', 'W', 'W', 'D'] },
  SUI: { ranking: 19, coach: 'Murat Yakin', confederation: 'UEFA', recentForm: ['W', 'D', 'L', 'W', 'D'] },

  // Group C
  BRA: { ranking: 5, coach: 'Dorival Júnior', confederation: 'CONMEBOL', recentForm: ['D', 'W', 'L', 'L', 'W'] },
  MAR: { ranking: 12, coach: 'Walid Regragui', confederation: 'CAF', recentForm: ['W', 'W', 'D', 'W', 'W'] },
  HAI: { ranking: 85, coach: 'Gabriel Calderón Pellegrino', confederation: 'CONCACAF', recentForm: ['D', 'L', 'D', 'D', 'L'] },
  SCO: { ranking: 39, coach: 'Steve Clarke', confederation: 'UEFA', recentForm: ['L', 'L', 'D', 'L', 'W'] },

  // Group D
  USA: { ranking: 11, coach: 'Gregg Berhalter', confederation: 'CONCACAF', recentForm: ['W', 'L', 'W', 'L', 'W'] },
  PAR: { ranking: 56, coach: 'Daniel Garnero', confederation: 'CONMEBOL', recentForm: ['D', 'L', 'L', 'W', 'L'] },
  AUS: { ranking: 24, coach: 'Graham Arnold', confederation: 'AFC', recentForm: ['W', 'W', 'W', 'W', 'D'] },
  TUR: { ranking: 40, coach: 'Vincenzo Montella', confederation: 'UEFA', recentForm: ['D', 'L', 'W', 'W', 'D'] },

  // Group E
  GER: { ranking: 16, coach: 'Julian Nagelsmann', confederation: 'UEFA', recentForm: ['W', 'W', 'D', 'L', 'L'] },
  CUW: { ranking: 91, coach: 'Dick Advocaat', confederation: 'CONCACAF', recentForm: ['L', 'L', 'W', 'D', 'L'] },
  CIV: { ranking: 38, coach: 'Emerse Faé', confederation: 'CAF', recentForm: ['W', 'W', 'W', 'W', 'D'] },
  ECU: { ranking: 31, coach: 'Félix Sánchez Bas', confederation: 'CONMEBOL', recentForm: ['W', 'D', 'W', 'D', 'L'] },

  // Group F
  NED: { ranking: 7, coach: 'Ronald Koeman', confederation: 'UEFA', recentForm: ['W', 'W', 'W', 'L', 'W'] },
  JPN: { ranking: 18, coach: 'Hajime Moriyasu', confederation: 'AFC', recentForm: ['W', 'L', 'W', 'W', 'W'] },
  SWE: { ranking: 27, coach: 'Jon Dahl Tomasson', confederation: 'UEFA', recentForm: ['W', 'L', 'W', 'L', 'W'] },
  TUN: { ranking: 41, coach: 'Jalel Kadri', confederation: 'CAF', recentForm: ['D', 'D', 'L', 'W', 'W'] },

  // Group G
  BEL: { ranking: 3, coach: 'Domenico Tedesco', confederation: 'UEFA', recentForm: ['D', 'W', 'W', 'W', 'D'] },
  EGY: { ranking: 37, coach: 'Hossam Hassan', confederation: 'CAF', recentForm: ['L', 'D', 'D', 'D', 'W'] },
  IRN: { ranking: 20, coach: 'Amir Ghalenoei', confederation: 'AFC', recentForm: ['W', 'W', 'L', 'W', 'W'] },
  NZL: { ranking: 104, coach: 'Darren Bazeley', confederation: 'OFC', recentForm: ['L', 'D', 'L', 'D', 'L'] },

  // Group H
  ESP: { ranking: 8, coach: 'Luis de la Fuente', confederation: 'UEFA', recentForm: ['D', 'L', 'W', 'W', 'W'] },
  CPV: { ranking: 65, coach: 'Bubista', confederation: 'CAF', recentForm: ['L', 'D', 'W', 'D', 'W'] },
  KSA: { ranking: 53, coach: 'Roberto Mancini', confederation: 'AFC', recentForm: ['D', 'L', 'W', 'D', 'W'] },
  URU: { ranking: 15, coach: 'Marcelo Bielsa', confederation: 'CONMEBOL', recentForm: ['D', 'W', 'W', 'W', 'D'] },

  // Group I
  FRA: { ranking: 2, coach: 'Didier Deschamps', confederation: 'UEFA', recentForm: ['W', 'D', 'W', 'L', 'W'] },
  SEN: { ranking: 17, coach: 'Aliou Cissé', confederation: 'CAF', recentForm: ['D', 'W', 'W', 'D', 'W'] },
  IRQ: { ranking: 58, coach: 'Jesús Casas', confederation: 'AFC', recentForm: ['W', 'W', 'L', 'W', 'W'] },
  NOR: { ranking: 47, coach: 'Ståle Solbakken', confederation: 'UEFA', recentForm: ['D', 'L', 'D', 'L', 'W'] },

  // Group J
  ARG: { ranking: 1, coach: 'Lionel Scaloni', confederation: 'CONMEBOL', recentForm: ['W', 'W', 'L', 'W', 'W'] },
  ALG: { ranking: 43, coach: 'Vladimir Petković', confederation: 'CAF', recentForm: ['D', 'D', 'W', 'L', 'D'] },
  AUT: { ranking: 25, coach: 'Ralf Rangnick', confederation: 'UEFA', recentForm: ['W', 'W', 'W', 'W', 'W'] },
  JOR: { ranking: 70, coach: 'Hussein Ammouta', confederation: 'AFC', recentForm: ['L', 'W', 'W', 'D', 'W'] },

  // Group K
  POR: { ranking: 6, coach: 'Roberto Martínez', confederation: 'UEFA', recentForm: ['L', 'W', 'W', 'W', 'W'] },
  COD: { ranking: 63, coach: 'Sébastien Desabre', confederation: 'CAF', recentForm: ['L', 'D', 'D', 'W', 'D'] },
  UZB: { ranking: 64, coach: 'Srečko Katanec', confederation: 'AFC', recentForm: ['D', 'D', 'W', 'D', 'W'] },
  COL: { ranking: 14, coach: 'Néstor Lorenzo', confederation: 'CONMEBOL', recentForm: ['W', 'W', 'W', 'W', 'W'] },

  // Group L
  ENG: { ranking: 4, coach: 'Gareth Southgate', confederation: 'UEFA', recentForm: ['D', 'L', 'D', 'W', 'W'] },
  CRO: { ranking: 10, coach: 'Zlatko Dalić', confederation: 'UEFA', recentForm: ['W', 'W', 'W', 'W', 'L'] },
  GHA: { ranking: 68, coach: 'Otto Addo', confederation: 'CAF', recentForm: ['L', 'D', 'D', 'D', 'L'] },
  PAN: { ranking: 44, coach: 'Thomas Christiansen', confederation: 'CONCACAF', recentForm: ['L', 'L', 'W', 'W', 'L'] },
};
