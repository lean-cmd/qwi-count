/**
 * i18n.ts
 *
 * Translations for the 10 most popular languages.
 * All UI strings are keyed here and accessed via useTranslation hook.
 *
 * @author claude — 2026-03-22
 */

export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar' | 'hi';

export interface TranslationStrings {
  // App
  appName: string;
  appTagline: string;

  // Navigation / Home
  game: string;
  newGame: string;
  resumeGame: string;
  rules: string;

  // Player setup
  howManyPlayers: string;
  dragToReorder: string;
  whoStarts: string;
  whoStartsDesc: string;
  startGame: string;
  next: string;
  back: string;
  cancel: string;

  // Game
  round: string;
  turn: string;
  custom: string;
  perfectLine: string;
  undo: string;
  skip: string;
  end: string;
  endGame: string;
  endGameDesc: string;
  pendingPoints: string;
  autoAdded: string;
  endNoBonus: string;
  noActiveGame: string;
  startNewGame: string;

  // Game over
  wins: string;
  bestTurn: string;
  perfectLines: string;
  shareScores: string;
  home: string;
  finalScores: string;
  winner: string;
  playAt: string;

  // Stats
  scoreProgression: string;
  gameStats: string;
  roundsPlayed: string;
  totalPoints: string;
  biggestTurn: string;
  inRound: string;
  highestAverage: string;
  ptsPerTurn: string;
  mostConsistent: string;
  leadChanges: string;
  dominantVictory: string;
  neckAndNeck: string;
  competitiveGame: string;

  // Settings
  settings: string;
  soundEffects: string;
  soundDesc: string;
  hapticFeedback: string;
  hapticDesc: string;
  theme: string;
  system: string;
  light: string;
  dark: string;
  language: string;
  languageDesc: string;

  // Rules headings
  howToPlay: string;
  setup: string;
  onYourTurn: string;
  scoring: string;
  scoringExamples: string;
  endGameRules: string;
  perfectLineBonus: string;

  // Rules body
  ruleSetup1: string;
  ruleSetup2: string;
  ruleSetup3: string;
  ruleTurn1: string;
  ruleTurn2: string;
  ruleTurn3: string;
  ruleTurn4: string;
  ruleScore1: string;
  ruleScore2: string;
  ruleScore3: string;
  ruleExample1Title: string;
  ruleExample1Score: string;
  ruleExample2Title: string;
  ruleExample2Score: string;
  ruleExample3Title: string;
  ruleExample3Score: string;
  rulePerfect1: string;
  rulePerfect2: string;
  ruleEnd1: string;
  ruleEnd2: string;
  ruleEnd3: string;
}

const en: TranslationStrings = {
  appName: 'Qwi Count',
  appTagline: 'Track scores for your tile games',
  game: 'Game',
  newGame: 'New Game',
  resumeGame: 'Resume Game',
  rules: 'Rules',
  howManyPlayers: 'How many players?',
  dragToReorder: 'Drag to set turn order',
  whoStarts: 'Who starts?',
  whoStartsDesc: 'The player with the best opening move goes first',
  startGame: 'Start Game',
  next: 'Next',
  back: 'Back',
  cancel: 'Cancel',
  round: 'Round',
  turn: 'turn',
  custom: 'Custom',
  perfectLine: 'PERFECT LINE!',
  undo: 'Undo',
  skip: 'Skip',
  end: 'End',
  endGame: 'End Game?',
  endGameDesc: 'Award +6 end-game bonus to a player, or end without bonus.',
  pendingPoints: 'has pending points',
  autoAdded: 'these will be added automatically.',
  endNoBonus: 'End (no bonus)',
  noActiveGame: 'No active game',
  startNewGame: 'Start a new game',
  wins: 'wins!',
  bestTurn: 'Best',
  perfectLines: 'perfect line',
  shareScores: 'Share Scores',
  home: 'Home',
  finalScores: 'Final Scores',
  winner: 'Winner',
  playAt: 'Play at',
  scoreProgression: 'Score Progression',
  gameStats: 'Game Stats',
  roundsPlayed: 'Rounds Played',
  totalPoints: 'total points',
  biggestTurn: 'Biggest Turn',
  inRound: 'in round',
  highestAverage: 'Highest Average',
  ptsPerTurn: 'pts/turn',
  mostConsistent: 'Most Consistent',
  leadChanges: 'Lead Changes',
  dominantVictory: 'Dominant victory',
  neckAndNeck: 'Neck and neck!',
  competitiveGame: 'Competitive game',
  settings: 'Settings',
  soundEffects: 'Sound Effects',
  soundDesc: 'Score chimes and celebrations',
  hapticFeedback: 'Haptic Feedback',
  hapticDesc: 'Vibration on native devices',
  theme: 'Theme',
  system: 'system',
  light: 'light',
  dark: 'dark',
  language: 'Language',
  languageDesc: 'Choose your language',
  howToPlay: 'How to Play',
  setup: 'Setup',
  onYourTurn: 'On Your Turn',
  scoring: 'Scoring',
  scoringExamples: 'Scoring Examples',
  endGameRules: 'End Game',
  perfectLineBonus: '+6 bonus',
  ruleSetup1: '2–4 players, 108 tiles (6 shapes x 6 colors x 3 copies)',
  ruleSetup2: 'Each player draws 6 tiles',
  ruleSetup3: 'First player: whoever can play the most tiles',
  ruleTurn1: 'Place 1+ tiles in a single line, OR trade tiles (score 0)',
  ruleTurn2: 'All tiles in a line must share exactly one attribute (same color OR same shape)',
  ruleTurn3: 'No duplicates in a line, max 6 tiles per line',
  ruleTurn4: 'Draw back to 6 tiles after placing',
  ruleScore1: 'Each tile placed scores 1 point per tile in the line (including existing tiles)',
  ruleScore2: 'If a tile touches two lines, both lines score',
  ruleScore3: 'A single tile next to one existing tile = 2 points minimum',
  ruleExample1Title: 'Place 1 tile extending a line of 3:',
  ruleExample1Score: 'Score: 4 points (4 tiles in the line)',
  ruleExample2Title: 'Place 2 tiles extending a line of 2:',
  ruleExample2Score: 'Score: 4 points (4 tiles in the line)',
  ruleExample3Title: 'Place 1 tile that touches two lines (3 and 4):',
  ruleExample3Score: 'Score: 3 + 4 = 7 points',
  rulePerfect1: 'Complete a line of exactly 6 tiles = 6 points for the line + 6 bonus = 12 total',
  rulePerfect2: 'Complete two perpendicular lines of 6 = 24 points',
  ruleEnd1: 'Game ends when no more tiles can be drawn and a player empties their hand',
  ruleEnd2: 'That player gets +6 bonus points',
  ruleEnd3: 'Highest score wins!',
};

const es: TranslationStrings = {
  appName: 'Qwi Count',
  appTagline: 'Registra puntuaciones de tus juegos de fichas',
  game: 'Juego',
  newGame: 'Nueva Partida',
  resumeGame: 'Continuar Partida',
  rules: 'Reglas',
  howManyPlayers: '\u00bfCu\u00e1ntos jugadores?',
  dragToReorder: 'Arrastra para ordenar turnos',
  whoStarts: '\u00bfQui\u00e9n empieza?',
  whoStartsDesc: 'El jugador con la mejor jugada inicial empieza primero',
  startGame: 'Iniciar Partida',
  next: 'Siguiente',
  back: 'Atr\u00e1s',
  cancel: 'Cancelar',
  round: 'Ronda',
  turn: 'turno',
  custom: 'Personalizado',
  perfectLine: '\u00a1L\u00cdNEA PERFECTA!',
  undo: 'Deshacer',
  skip: 'Pasar',
  end: 'Fin',
  endGame: '\u00bfTerminar partida?',
  endGameDesc: 'Otorga +6 de bonus final a un jugador, o termina sin bonus.',
  pendingPoints: 'tiene puntos pendientes',
  autoAdded: 'se a\u00f1adir\u00e1n autom\u00e1ticamente.',
  endNoBonus: 'Terminar (sin bonus)',
  noActiveGame: 'Sin partida activa',
  startNewGame: 'Iniciar nueva partida',
  wins: '\u00a1gana!',
  bestTurn: 'Mejor',
  perfectLines: 'l\u00ednea perfecta',
  shareScores: 'Compartir Puntuaciones',
  home: 'Inicio',
  finalScores: 'Puntuaciones Finales',
  winner: 'Ganador',
  playAt: 'Juega en',
  scoreProgression: 'Progreso de Puntuaci\u00f3n',
  gameStats: 'Estad\u00edsticas',
  roundsPlayed: 'Rondas Jugadas',
  totalPoints: 'puntos totales',
  biggestTurn: 'Mayor Turno',
  inRound: 'en ronda',
  highestAverage: 'Mayor Promedio',
  ptsPerTurn: 'pts/turno',
  mostConsistent: 'M\u00e1s Consistente',
  leadChanges: 'Cambios de L\u00edder',
  dominantVictory: 'Victoria dominante',
  neckAndNeck: '\u00a1Muy re\u00f1ido!',
  competitiveGame: 'Partida competitiva',
  settings: 'Ajustes',
  soundEffects: 'Efectos de Sonido',
  soundDesc: 'Sonidos de puntuaci\u00f3n y celebraciones',
  hapticFeedback: 'Vibraci\u00f3n',
  hapticDesc: 'Vibraci\u00f3n en dispositivos nativos',
  theme: 'Tema',
  system: 'sistema',
  light: 'claro',
  dark: 'oscuro',
  language: 'Idioma',
  languageDesc: 'Elige tu idioma',
  howToPlay: 'C\u00f3mo Jugar',
  setup: 'Preparaci\u00f3n',
  onYourTurn: 'En Tu Turno',
  scoring: 'Puntuaci\u00f3n',
  scoringExamples: 'Ejemplos de Puntuaci\u00f3n',
  endGameRules: 'Fin del Juego',
  perfectLineBonus: '+6 bonus',
  ruleSetup1: '2\u20134 jugadores, 108 fichas (6 formas x 6 colores x 3 copias)',
  ruleSetup2: 'Cada jugador roba 6 fichas',
  ruleSetup3: 'Primer jugador: quien pueda colocar m\u00e1s fichas',
  ruleTurn1: 'Coloca 1+ fichas en una l\u00ednea, O intercambia fichas (0 puntos)',
  ruleTurn2: 'Todas las fichas en una l\u00ednea deben compartir exactamente un atributo (mismo color O misma forma)',
  ruleTurn3: 'Sin duplicados en una l\u00ednea, m\u00e1ximo 6 fichas por l\u00ednea',
  ruleTurn4: 'Roba hasta tener 6 fichas despu\u00e9s de colocar',
  ruleScore1: 'Cada ficha colocada suma 1 punto por ficha en la l\u00ednea (incluyendo existentes)',
  ruleScore2: 'Si una ficha toca dos l\u00edneas, ambas punt\u00faan',
  ruleScore3: 'Una ficha junto a una existente = 2 puntos m\u00ednimo',
  ruleExample1Title: 'Coloca 1 ficha extendiendo una l\u00ednea de 3:',
  ruleExample1Score: 'Puntuaci\u00f3n: 4 puntos (4 fichas en la l\u00ednea)',
  ruleExample2Title: 'Coloca 2 fichas extendiendo una l\u00ednea de 2:',
  ruleExample2Score: 'Puntuaci\u00f3n: 4 puntos (4 fichas en la l\u00ednea)',
  ruleExample3Title: 'Coloca 1 ficha que toca dos l\u00edneas (3 y 4):',
  ruleExample3Score: 'Puntuaci\u00f3n: 3 + 4 = 7 puntos',
  rulePerfect1: 'Completa una l\u00ednea de 6 fichas = 6 puntos + 6 bonus = 12 total',
  rulePerfect2: 'Completa dos l\u00edneas perpendiculares de 6 = 24 puntos',
  ruleEnd1: 'El juego termina cuando no quedan fichas y un jugador vac\u00eda su mano',
  ruleEnd2: 'Ese jugador recibe +6 puntos de bonus',
  ruleEnd3: '\u00a1La puntuaci\u00f3n m\u00e1s alta gana!',
};

const fr: TranslationStrings = {
  appName: 'Qwi Count',
  appTagline: 'Suivez les scores de vos jeux de tuiles',
  game: 'Jeu',
  newGame: 'Nouvelle Partie',
  resumeGame: 'Reprendre',
  rules: 'R\u00e8gles',
  howManyPlayers: 'Combien de joueurs\u00a0?',
  dragToReorder: "Glissez pour d\u00e9finir l'ordre",
  whoStarts: 'Qui commence\u00a0?',
  whoStartsDesc: 'Le joueur avec le meilleur coup initial commence',
  startGame: 'Commencer',
  next: 'Suivant',
  back: 'Retour',
  cancel: 'Annuler',
  round: 'Manche',
  turn: 'tour',
  custom: 'Personnalis\u00e9',
  perfectLine: 'LIGNE PARFAITE\u00a0!',
  undo: 'Annuler',
  skip: 'Passer',
  end: 'Fin',
  endGame: 'Terminer la partie\u00a0?',
  endGameDesc: 'Attribuez +6 bonus de fin \u00e0 un joueur, ou terminez sans bonus.',
  pendingPoints: 'a des points en attente',
  autoAdded: 'ils seront ajout\u00e9s automatiquement.',
  endNoBonus: 'Terminer (sans bonus)',
  noActiveGame: 'Aucune partie en cours',
  startNewGame: 'Nouvelle partie',
  wins: 'gagne\u00a0!',
  bestTurn: 'Meilleur',
  perfectLines: 'ligne parfaite',
  shareScores: 'Partager les Scores',
  home: 'Accueil',
  finalScores: 'Scores Finaux',
  winner: 'Gagnant',
  playAt: 'Jouez sur',
  scoreProgression: 'Progression des Scores',
  gameStats: 'Statistiques',
  roundsPlayed: 'Manches Jou\u00e9es',
  totalPoints: 'points au total',
  biggestTurn: 'Meilleur Tour',
  inRound: 'en manche',
  highestAverage: 'Meilleure Moyenne',
  ptsPerTurn: 'pts/tour',
  mostConsistent: 'Plus R\u00e9gulier',
  leadChanges: 'Changements de Leader',
  dominantVictory: 'Victoire dominante',
  neckAndNeck: 'Au coude \u00e0 coude\u00a0!',
  competitiveGame: 'Partie comp\u00e9titive',
  settings: 'Param\u00e8tres',
  soundEffects: 'Effets Sonores',
  soundDesc: 'Sons de score et c\u00e9l\u00e9brations',
  hapticFeedback: 'Retour Haptique',
  hapticDesc: 'Vibration sur appareils natifs',
  theme: 'Th\u00e8me',
  system: 'syst\u00e8me',
  light: 'clair',
  dark: 'sombre',
  language: 'Langue',
  languageDesc: 'Choisissez votre langue',
  howToPlay: 'Comment Jouer',
  setup: 'Pr\u00e9paration',
  onYourTurn: '\u00c0 Votre Tour',
  scoring: 'Points',
  scoringExamples: 'Exemples de Score',
  endGameRules: 'Fin de Partie',
  perfectLineBonus: '+6 bonus',
  ruleSetup1: '2–4 joueurs, 108 tuiles (6 formes x 6 couleurs x 3 exemplaires)',
  ruleSetup2: 'Chaque joueur pioche 6 tuiles',
  ruleSetup3: 'Premier joueur : celui qui peut jouer le plus de tuiles',
  ruleTurn1: 'Posez 1+ tuiles sur une seule ligne, OU échangez des tuiles (0 point)',
  ruleTurn2: 'Toutes les tuiles d’une ligne doivent partager un seul attribut (même couleur OU même forme)',
  ruleTurn3: 'Pas de doublons dans une ligne, max 6 tuiles par ligne',
  ruleTurn4: 'Piochez jusqu’à 6 tuiles après avoir posé',
  ruleScore1: 'Chaque tuile posée rapporte 1 point par tuile dans la ligne (y compris les existantes)',
  ruleScore2: 'Si une tuile touche deux lignes, les deux comptent',
  ruleScore3: 'Une tuile à côté d’une existante = 2 points minimum',
  ruleExample1Title: 'Posez 1 tuile pour prolonger une ligne de 3 :',
  ruleExample1Score: 'Score : 4 points (4 tuiles dans la ligne)',
  ruleExample2Title: 'Posez 2 tuiles pour prolonger une ligne de 2 :',
  ruleExample2Score: 'Score : 4 points (4 tuiles dans la ligne)',
  ruleExample3Title: 'Posez 1 tuile qui touche deux lignes (3 et 4) :',
  ruleExample3Score: 'Score : 3 + 4 = 7 points',
  rulePerfect1: 'Complétez une ligne de 6 tuiles = 6 points + 6 bonus = 12 au total',
  rulePerfect2: 'Complétez deux lignes perpendiculaires de 6 = 24 points',
  ruleEnd1: 'Le jeu se termine quand il n’y a plus de tuiles et qu’un joueur vide sa main',
  ruleEnd2: 'Ce joueur reçoit +6 points bonus',
  ruleEnd3: 'Le score le plus élevé gagne !',
};

const de: TranslationStrings = {
  appName: 'Qwi Count', appTagline: 'Punkte z\u00e4hlen f\u00fcr deine Legespiele',
  game: 'Spiel', newGame: 'Neues Spiel', resumeGame: 'Fortsetzen', rules: 'Regeln',
  howManyPlayers: 'Wie viele Spieler?', dragToReorder: 'Ziehen zum Umsortieren',
  whoStarts: 'Wer f\u00e4ngt an?', whoStartsDesc: 'Der Spieler mit dem besten Er\u00f6ffnungszug beginnt',
  startGame: 'Spiel starten', next: 'Weiter', back: 'Zur\u00fcck', cancel: 'Abbrechen',
  round: 'Runde', turn: 'Zug', custom: 'Eigener Wert', perfectLine: 'PERFEKTE REIHE!',
  undo: 'R\u00fcckg\u00e4ngig', skip: '\u00dcberspringen', end: 'Ende',
  endGame: 'Spiel beenden?', endGameDesc: 'Vergib +6 Endbonus an einen Spieler oder beende ohne Bonus.',
  pendingPoints: 'hat ausstehende Punkte', autoAdded: 'werden automatisch hinzugef\u00fcgt.',
  endNoBonus: 'Beenden (ohne Bonus)', noActiveGame: 'Kein aktives Spiel', startNewGame: 'Neues Spiel starten',
  wins: 'gewinnt!', bestTurn: 'Beste', perfectLines: 'perfekte Reihe',
  shareScores: 'Ergebnis teilen', home: 'Start',
  finalScores: 'Endergebnis', winner: 'Gewinner', playAt: 'Spiel auf',
  scoreProgression: 'Punkteverlauf', gameStats: 'Statistiken',
  roundsPlayed: 'Gespielte Runden', totalPoints: 'Gesamtpunkte',
  biggestTurn: 'Bester Zug', inRound: 'in Runde', highestAverage: 'H\u00f6chster Schnitt',
  ptsPerTurn: 'Pkt/Zug', mostConsistent: 'Konstantester', leadChanges: 'F\u00fchrungswechsel',
  dominantVictory: 'Dominanter Sieg', neckAndNeck: 'Kopf an Kopf!', competitiveGame: 'Spannendes Spiel',
  settings: 'Einstellungen', soundEffects: 'Soundeffekte', soundDesc: 'Punkte- und Feierger\u00e4usche',
  hapticFeedback: 'Haptisches Feedback', hapticDesc: 'Vibration auf nativen Ger\u00e4ten',
  theme: 'Design', system: 'System', light: 'Hell', dark: 'Dunkel',
  language: 'Sprache', languageDesc: 'W\u00e4hle deine Sprache',
  howToPlay: 'Spielanleitung', setup: 'Vorbereitung', onYourTurn: 'Dein Zug',
  scoring: 'Wertung', scoringExamples: 'Wertungsbeispiele', endGameRules: 'Spielende',
  perfectLineBonus: "+6 Bonus",
  ruleSetup1: "2–4 Spieler, 108 Steine (6 Formen x 6 Farben x 3 Exemplare)",
  ruleSetup2: "Jeder Spieler zieht 6 Steine",
  ruleSetup3: "Erster Spieler: wer die meisten Steine legen kann",
  ruleTurn1: "Lege 1+ Steine in eine Reihe ODER tausche Steine (0 Punkte)",
  ruleTurn2: "Alle Steine einer Reihe müssen ein Merkmal teilen (gleiche Farbe ODER gleiche Form)",
  ruleTurn3: "Keine Duplikate, max. 6 Steine pro Reihe",
  ruleTurn4: "Ziehe nach dem Legen auf 6 Steine nach",
  ruleScore1: "Jeder gelegte Stein bringt 1 Punkt pro Stein in der Reihe (inkl. vorhandener)",
  ruleScore2: "Berührt ein Stein zwei Reihen, zählen beide",
  ruleScore3: "Ein Stein neben einem vorhandenen = mindestens 2 Punkte",
  ruleExample1Title: "Lege 1 Stein an eine Reihe von 3:",
  ruleExample1Score: "Punkte: 4 (4 Steine in der Reihe)",
  ruleExample2Title: "Lege 2 Steine an eine Reihe von 2:",
  ruleExample2Score: "Punkte: 4 (4 Steine in der Reihe)",
  ruleExample3Title: "Lege 1 Stein, der zwei Reihen berührt (3 und 4):",
  ruleExample3Score: "Punkte: 3 + 4 = 7",
  rulePerfect1: "Reihe von 6 = 6 Punkte + 6 Bonus = 12 gesamt",
  rulePerfect2: "Zwei senkrechte 6er-Reihen = 24 Punkte",
  ruleEnd1: "Spiel endet wenn keine Steine mehr da sind und ein Spieler alle gelegt hat",
  ruleEnd2: "Dieser Spieler bekommt +6 Bonuspunkte",
  ruleEnd3: "Die höchste Punktzahl gewinnt!",
};

const pt: TranslationStrings = {
  appName: 'Qwi Count', appTagline: 'Registre pontua\u00e7\u00f5es dos seus jogos de pe\u00e7as',
  game: 'Jogo', newGame: 'Novo Jogo', resumeGame: 'Continuar', rules: 'Regras',
  howManyPlayers: 'Quantos jogadores?', dragToReorder: 'Arraste para ordenar',
  whoStarts: 'Quem come\u00e7a?', whoStartsDesc: 'O jogador com a melhor jogada inicial come\u00e7a',
  startGame: 'Iniciar Jogo', next: 'Pr\u00f3ximo', back: 'Voltar', cancel: 'Cancelar',
  round: 'Rodada', turn: 'turno', custom: 'Personalizado', perfectLine: 'LINHA PERFEITA!',
  undo: 'Desfazer', skip: 'Pular', end: 'Fim',
  endGame: 'Encerrar jogo?', endGameDesc: 'D\u00ea +6 b\u00f4nus final a um jogador ou encerre sem b\u00f4nus.',
  pendingPoints: 'tem pontos pendentes', autoAdded: 'ser\u00e3o adicionados automaticamente.',
  endNoBonus: 'Encerrar (sem b\u00f4nus)', noActiveGame: 'Sem jogo ativo', startNewGame: 'Iniciar novo jogo',
  wins: 'venceu!', bestTurn: 'Melhor', perfectLines: 'linha perfeita',
  shareScores: 'Compartilhar', home: 'In\u00edcio',
  finalScores: 'Pontua\u00e7\u00f5es Finais', winner: 'Vencedor', playAt: 'Jogue em',
  scoreProgression: 'Progresso da Pontua\u00e7\u00e3o', gameStats: 'Estat\u00edsticas',
  roundsPlayed: 'Rodadas', totalPoints: 'pontos totais',
  biggestTurn: 'Maior Turno', inRound: 'na rodada', highestAverage: 'Maior M\u00e9dia',
  ptsPerTurn: 'pts/turno', mostConsistent: 'Mais Consistente', leadChanges: 'Mudan\u00e7as de L\u00edder',
  dominantVictory: 'Vit\u00f3ria dominante', neckAndNeck: 'Muito disputado!', competitiveGame: 'Jogo competitivo',
  settings: 'Configura\u00e7\u00f5es', soundEffects: 'Efeitos Sonoros', soundDesc: 'Sons de pontua\u00e7\u00e3o e celebra\u00e7\u00f5es',
  hapticFeedback: 'Vibra\u00e7\u00e3o', hapticDesc: 'Vibra\u00e7\u00e3o em dispositivos nativos',
  theme: 'Tema', system: 'sistema', light: 'claro', dark: 'escuro',
  language: 'Idioma', languageDesc: 'Escolha seu idioma',
  howToPlay: 'Como Jogar', setup: 'Prepara\u00e7\u00e3o', onYourTurn: 'Na Sua Vez',
  scoring: 'Pontua\u00e7\u00e3o', scoringExamples: 'Exemplos', endGameRules: 'Fim do Jogo',
  perfectLineBonus: "+6 bônus",
  ruleSetup1: "2–4 jogadores, 108 peças (6 formas x 6 cores x 3 cópias)",
  ruleSetup2: "Cada jogador compra 6 peças",
  ruleSetup3: "Primeiro jogador: quem puder jogar mais peças",
  ruleTurn1: "Coloque 1+ peças em uma linha, OU troque peças (0 pontos)",
  ruleTurn2: "Todas as peças em uma linha devem compartilhar um atributo (mesma cor OU mesma forma)",
  ruleTurn3: "Sem duplicatas, máximo 6 peças por linha",
  ruleTurn4: "Compre até ter 6 peças após jogar",
  ruleScore1: "Cada peça marca 1 ponto por peça na linha (incluindo existentes)",
  ruleScore2: "Se uma peça toca duas linhas, ambas pontuam",
  ruleScore3: "Uma peça ao lado de existente = 2 pontos mínimo",
  ruleExample1Title: "Coloque 1 peça estendendo uma linha de 3:",
  ruleExample1Score: "Pontuação: 4 pontos (4 peças na linha)",
  ruleExample2Title: "Coloque 2 peças estendendo uma linha de 2:",
  ruleExample2Score: "Pontuação: 4 pontos (4 peças na linha)",
  ruleExample3Title: "Coloque 1 peça que toca duas linhas (3 e 4):",
  ruleExample3Score: "Pontuação: 3 + 4 = 7 pontos",
  rulePerfect1: "Linha de 6 peças = 6 pontos + 6 bônus = 12 total",
  rulePerfect2: "Duas linhas perpendiculares de 6 = 24 pontos",
  ruleEnd1: "O jogo termina quando não há mais peças e um jogador esvazia sua mão",
  ruleEnd2: "Esse jogador recebe +6 pontos de bônus",
  ruleEnd3: "A maior pontuação vence!",
};

const zh: TranslationStrings = {
  appName: 'Qwi Count', appTagline: '\u8bb0\u5f55\u4f60\u7684\u62fc\u56fe\u6e38\u620f\u5206\u6570',
  game: '游戏', newGame: '\u65b0\u6e38\u620f', resumeGame: '\u7ee7\u7eed\u6e38\u620f', rules: '\u89c4\u5219',
  howManyPlayers: '\u51e0\u4f4d\u73a9\u5bb6\uff1f', dragToReorder: '\u62d6\u52a8\u8c03\u6574\u987a\u5e8f',
  whoStarts: '\u8c01\u5148\u5f00\u59cb\uff1f', whoStartsDesc: '\u62e5\u6709\u6700\u4f73\u5f00\u5c40\u7684\u73a9\u5bb6\u5148\u624b',
  startGame: '\u5f00\u59cb\u6e38\u620f', next: '\u4e0b\u4e00\u4f4d', back: '\u8fd4\u56de', cancel: '\u53d6\u6d88',
  round: '\u56de\u5408', turn: '\u56de\u5408', custom: '\u81ea\u5b9a\u4e49', perfectLine: '\u5b8c\u7f8e\u8fde\u7ebf\uff01',
  undo: '\u64a4\u9500', skip: '\u8df3\u8fc7', end: '\u7ed3\u675f',
  endGame: '\u7ed3\u675f\u6e38\u620f\uff1f', endGameDesc: '\u7ed9\u4e00\u4f4d\u73a9\u5bb6+6\u7ed3\u675f\u5956\u52b1\uff0c\u6216\u4e0d\u52a0\u5956\u52b1\u7ed3\u675f\u3002',
  pendingPoints: '\u6709\u5f85\u5b9a\u5206\u6570', autoAdded: '\u5c06\u81ea\u52a8\u6dfb\u52a0\u3002',
  endNoBonus: '\u7ed3\u675f\uff08\u65e0\u5956\u52b1\uff09', noActiveGame: '\u65e0\u6d3b\u52a8\u6e38\u620f', startNewGame: '\u5f00\u59cb\u65b0\u6e38\u620f',
  wins: '\u83b7\u80dc\uff01', bestTurn: '\u6700\u4f73', perfectLines: '\u5b8c\u7f8e\u8fde\u7ebf',
  shareScores: '\u5206\u4eab\u5206\u6570', home: '\u4e3b\u9875',
  finalScores: '\u6700\u7ec8\u5206\u6570', winner: '\u80dc\u8005', playAt: '\u5728\u6b64\u6e38\u73a9',
  scoreProgression: '\u5206\u6570\u8d70\u52bf', gameStats: '\u6e38\u620f\u7edf\u8ba1',
  roundsPlayed: '\u56de\u5408\u6570', totalPoints: '\u603b\u5206',
  biggestTurn: '\u6700\u9ad8\u5355\u56de\u5408', inRound: '\u5728\u7b2c', highestAverage: '\u6700\u9ad8\u5747\u5206',
  ptsPerTurn: '\u5206/\u56de\u5408', mostConsistent: '\u6700\u7a33\u5b9a', leadChanges: '\u9886\u5148\u53d8\u5316',
  dominantVictory: '\u538b\u5012\u6027\u80dc\u5229', neckAndNeck: '\u4e0d\u76f8\u4e0a\u4e0b\uff01', competitiveGame: '\u6fc0\u70c8\u7ade\u4e89',
  settings: '\u8bbe\u7f6e', soundEffects: '\u97f3\u6548', soundDesc: '\u5f97\u5206\u548c\u5e86\u795d\u97f3\u6548',
  hapticFeedback: '\u89e6\u89c9\u53cd\u9988', hapticDesc: '\u539f\u751f\u8bbe\u5907\u632f\u52a8',
  theme: '\u4e3b\u9898', system: '\u7cfb\u7edf', light: '\u6d45\u8272', dark: '\u6df1\u8272',
  language: '\u8bed\u8a00', languageDesc: '\u9009\u62e9\u4f60\u7684\u8bed\u8a00',
  howToPlay: '\u5982\u4f55\u6e38\u73a9', setup: '\u51c6\u5907', onYourTurn: '\u4f60\u7684\u56de\u5408',
  scoring: '\u8ba1\u5206', scoringExamples: '\u8ba1\u5206\u793a\u4f8b', endGameRules: '\u6e38\u620f\u7ed3\u675f',
  perfectLineBonus: "+6奖励",
  ruleSetup1: "2–4位玩家，108块拼片（6种形状 x 6种颜色 x 3副）",
  ruleSetup2: "每位玩家抽6块",
  ruleSetup3: "先手：能出最多拼片的玩家",
  ruleTurn1: "放置1+块在一条线上，或交换拼片（0分）",
  ruleTurn2: "一条线上所有拼片必须共享一个属性（同色或同形）",
  ruleTurn3: "不能重复，每线最多6块",
  ruleTurn4: "放置后补抽至6块",
  ruleScore1: "每放一块得分 = 该线拼片总数（含已有）",
  ruleScore2: "触及两条线则两条都计分",
  ruleScore3: "紧邻已有拼片 = 至少2分",
  ruleExample1Title: "在3块线上加1块:",
  ruleExample1Score: "得分：4分（4块）",
  ruleExample2Title: "在2块线上加2块:",
  ruleExample2Score: "得分：4分（4块）",
  ruleExample3Title: "触及两线的1块（3和4）:",
  ruleExample3Score: "得分：3 + 4 = 7分",
  rulePerfect1: "完成恰好6块的线 = 6分 + 6奖励 = 共12分",
  rulePerfect2: "完成两条垂直6块线 = 24分",
  ruleEnd1: "没有拼片可抽且玩家清空手中拼片时结束",
  ruleEnd2: "该玩家获得+6奖励分",
  ruleEnd3: "最高分获胜！",
};

const ja: TranslationStrings = {
  appName: 'Qwi Count', appTagline: '\u30bf\u30a4\u30eb\u30b2\u30fc\u30e0\u306e\u30b9\u30b3\u30a2\u8a18\u9332',
  game: 'ゲーム', newGame: '\u65b0\u3057\u3044\u30b2\u30fc\u30e0', resumeGame: '\u7d9a\u3051\u308b', rules: '\u30eb\u30fc\u30eb',
  howManyPlayers: '\u4f55\u4eba\u3067\u904a\u3076\uff1f', dragToReorder: '\u30c9\u30e9\u30c3\u30b0\u3067\u9806\u756a\u3092\u5909\u66f4',
  whoStarts: '\u8ab0\u304c\u5148\u653b\uff1f', whoStartsDesc: '\u6700\u826f\u306e\u521d\u624b\u3092\u6301\u3064\u30d7\u30ec\u30a4\u30e4\u30fc\u304c\u5148\u653b',
  startGame: '\u30b2\u30fc\u30e0\u958b\u59cb', next: '\u6b21\u3078', back: '\u623b\u308b', cancel: '\u30ad\u30e3\u30f3\u30bb\u30eb',
  round: '\u30e9\u30a6\u30f3\u30c9', turn: '\u30bf\u30fc\u30f3', custom: '\u30ab\u30b9\u30bf\u30e0', perfectLine: '\u30d1\u30fc\u30d5\u30a7\u30af\u30c8\u30e9\u30a4\u30f3\uff01',
  undo: '\u5143\u306b\u623b\u3059', skip: '\u30b9\u30ad\u30c3\u30d7', end: '\u7d42\u4e86',
  endGame: '\u30b2\u30fc\u30e0\u7d42\u4e86\uff1f', endGameDesc: '+6\u30dc\u30fc\u30ca\u30b9\u3092\u4e0e\u3048\u308b\u304b\u3001\u30dc\u30fc\u30ca\u30b9\u306a\u3057\u3067\u7d42\u4e86\u3002',
  pendingPoints: '\u306e\u672a\u78ba\u5b9a\u30dd\u30a4\u30f3\u30c8', autoAdded: '\u81ea\u52d5\u7684\u306b\u52a0\u7b97\u3055\u308c\u307e\u3059\u3002',
  endNoBonus: '\u7d42\u4e86\uff08\u30dc\u30fc\u30ca\u30b9\u306a\u3057\uff09', noActiveGame: '\u30a2\u30af\u30c6\u30a3\u30d6\u306a\u30b2\u30fc\u30e0\u306a\u3057', startNewGame: '\u65b0\u3057\u3044\u30b2\u30fc\u30e0\u3092\u958b\u59cb',
  wins: '\u306e\u52dd\u5229\uff01', bestTurn: '\u6700\u9ad8', perfectLines: '\u30d1\u30fc\u30d5\u30a7\u30af\u30c8\u30e9\u30a4\u30f3',
  shareScores: '\u30b9\u30b3\u30a2\u3092\u5171\u6709', home: '\u30db\u30fc\u30e0',
  finalScores: '\u6700\u7d42\u30b9\u30b3\u30a2', winner: '\u52dd\u8005', playAt: '\u30d7\u30ec\u30a4\u306f\u3053\u3061\u3089',
  scoreProgression: '\u30b9\u30b3\u30a2\u63a8\u79fb', gameStats: '\u7d71\u8a08',
  roundsPlayed: '\u30e9\u30a6\u30f3\u30c9\u6570', totalPoints: '\u5408\u8a08\u30dd\u30a4\u30f3\u30c8',
  biggestTurn: '\u6700\u9ad8\u30bf\u30fc\u30f3', inRound: '\u30e9\u30a6\u30f3\u30c9', highestAverage: '\u6700\u9ad8\u5e73\u5747',
  ptsPerTurn: '\u70b9/\u30bf\u30fc\u30f3', mostConsistent: '\u6700\u3082\u5b89\u5b9a', leadChanges: '\u30ea\u30fc\u30c9\u5909\u52d5',
  dominantVictory: '\u5727\u52dd', neckAndNeck: '\u63a5\u6226\uff01', competitiveGame: '\u6fc0\u6226',
  settings: '\u8a2d\u5b9a', soundEffects: '\u30b5\u30a6\u30f3\u30c9', soundDesc: '\u30b9\u30b3\u30a2\u3068\u304a\u795d\u3044\u306e\u97f3',
  hapticFeedback: '\u89e6\u899a\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af', hapticDesc: '\u30cd\u30a4\u30c6\u30a3\u30d6\u30c7\u30d0\u30a4\u30b9\u306e\u632f\u52d5',
  theme: '\u30c6\u30fc\u30de', system: '\u30b7\u30b9\u30c6\u30e0', light: '\u30e9\u30a4\u30c8', dark: '\u30c0\u30fc\u30af',
  language: '\u8a00\u8a9e', languageDesc: '\u8a00\u8a9e\u3092\u9078\u629e',
  howToPlay: '\u904a\u3073\u65b9', setup: '\u6e96\u5099', onYourTurn: '\u3042\u306a\u305f\u306e\u756a',
  scoring: '\u5f97\u70b9', scoringExamples: '\u5f97\u70b9\u4f8b', endGameRules: '\u30b2\u30fc\u30e0\u7d42\u4e86',
  perfectLineBonus: "+6ボーナス",
  ruleSetup1: "2–4人、108枚のタイル（6形×6色×3セット）",
  ruleSetup2: "各プレイヤーは6枚引く",
  ruleSetup3: "最初のプレイヤー：最も多くタイルを出せる人",
  ruleTurn1: "1枚以上を一列に置くか、タイルを交換（0点）",
  ruleTurn2: "一列の全タイルは1属性を共有（同色または同形）",
  ruleTurn3: "重複なし、最大6枚まで",
  ruleTurn4: "置いた後6枚まで引く",
  ruleScore1: "置いたタイルごとにその列のタイル数分の点（既存含む）",
  ruleScore2: "2列に触れる場合両方が得点",
  ruleScore3: "既存の隣に1枚 = 最低2点",
  ruleExample1Title: "3枚の列1枚延長:",
  ruleExample1Score: "得点: 4点（4枚）",
  ruleExample2Title: "2枚の列2枚延長:",
  ruleExample2Score: "得点: 4点（4枚）",
  ruleExample3Title: "2列に触れる1枚（3と4）:",
  ruleExample3Score: "得点: 3 + 4 = 7点",
  rulePerfect1: "ちょうど6枚の列完成 = 6点 + 6ボーナス = 計12点",
  rulePerfect2: "直交し2列の6完成 = 24点",
  ruleEnd1: "タイルがなくなり手持ちを使い切ったら終了",
  ruleEnd2: "そのプレイヤーは+6ボーナス獲得",
  ruleEnd3: "最高得点の勝ち！",
};

const ko: TranslationStrings = {
  appName: 'Qwi Count', appTagline: '\ud0c0\uc77c \uac8c\uc784 \uc810\uc218 \uae30\ub85d',
  game: '게임', newGame: '\uc0c8 \uac8c\uc784', resumeGame: '\uacc4\uc18d\ud558\uae30', rules: '\uaddc\uce59',
  howManyPlayers: '\uba87 \uba85\uc774 \ud50c\ub808\uc774\ud558\ub098\uc694?', dragToReorder: '\ub4dc\ub798\uadf8\ud558\uc5ec \uc21c\uc11c \ubcc0\uacbd',
  whoStarts: '\ub204\uac00 \uba3c\uc800?', whoStartsDesc: '\uac00\uc7a5 \uc88b\uc740 \uccab \uc218\ub97c \uac00\uc9c4 \ud50c\ub808\uc774\uc5b4\uac00 \uba3c\uc800 \uc2dc\uc791',
  startGame: '\uac8c\uc784 \uc2dc\uc791', next: '\ub2e4\uc74c', back: '\ub4a4\ub85c', cancel: '\ucde8\uc18c',
  round: '\ub77c\uc6b4\ub4dc', turn: '\ud134', custom: '\uc9c1\uc811 \uc785\ub825', perfectLine: '\ud37c\ud399\ud2b8 \ub77c\uc778!',
  undo: '\uc2e4\ud589\ucde8\uc18c', skip: '\uac74\ub108\ub6f0\uae30', end: '\uc885\ub8cc',
  endGame: '\uac8c\uc784 \uc885\ub8cc?', endGameDesc: '+6 \ubcf4\ub108\uc2a4\ub97c \uc904 \ud50c\ub808\uc774\uc5b4\ub97c \uc120\ud0dd\ud558\uac70\ub098 \ubcf4\ub108\uc2a4 \uc5c6\uc774 \uc885\ub8cc.',
  pendingPoints: '\ub300\uae30 \uc911\uc778 \uc810\uc218', autoAdded: '\uc790\ub3d9\uc73c\ub85c \ucd94\uac00\ub429\ub2c8\ub2e4.',
  endNoBonus: '\uc885\ub8cc (\ubcf4\ub108\uc2a4 \uc5c6\uc74c)', noActiveGame: '\ud65c\uc131 \uac8c\uc784 \uc5c6\uc74c', startNewGame: '\uc0c8 \uac8c\uc784 \uc2dc\uc791',
  wins: '\uc2b9\ub9ac!', bestTurn: '\ucd5c\uace0', perfectLines: '\ud37c\ud399\ud2b8 \ub77c\uc778',
  shareScores: '\uc810\uc218 \uacf5\uc720', home: '\ud648',
  finalScores: '\ucd5c\uc885 \uc810\uc218', winner: '\uc2b9\uc790', playAt: '\ud50c\ub808\uc774',
  scoreProgression: '\uc810\uc218 \ucd94\uc774', gameStats: '\ud1b5\uacc4',
  roundsPlayed: '\ub77c\uc6b4\ub4dc \uc218', totalPoints: '\ucd1d \uc810\uc218',
  biggestTurn: '\ucd5c\uace0 \ud134', inRound: '\ub77c\uc6b4\ub4dc', highestAverage: '\ucd5c\uace0 \ud3c9\uade0',
  ptsPerTurn: '\uc810/\ud134', mostConsistent: '\uac00\uc7a5 \uafb8\uc900\ud55c', leadChanges: '\uc120\ub450 \ubcc0\uacbd',
  dominantVictory: '\uc555\ub3c4\uc801 \uc2b9\ub9ac', neckAndNeck: '\ubc15\ube59!', competitiveGame: '\uacbd\uc7c1\uc801\uc778 \uac8c\uc784',
  settings: '\uc124\uc815', soundEffects: '\uc74c\ud5a5 \ud6a8\uacfc', soundDesc: '\uc810\uc218 \ubc0f \ucd95\ud558 \uc18c\ub9ac',
  hapticFeedback: '\uc9c4\ub3d9 \ud53c\ub4dc\ubc31', hapticDesc: '\ub124\uc774\ud2f0\ube0c \uae30\uae30 \uc9c4\ub3d9',
  theme: '\ud14c\ub9c8', system: '\uc2dc\uc2a4\ud15c', light: '\ub77c\uc774\ud2b8', dark: '\ub2e4\ud06c',
  language: '\uc5b8\uc5b4', languageDesc: '\uc5b8\uc5b4 \uc120\ud0dd',
  howToPlay: '\uac8c\uc784 \ubc29\ubc95', setup: '\uc900\ube44', onYourTurn: '\ub2f9\uc2e0\uc758 \ucc28\ub840',
  scoring: '\uc810\uc218', scoringExamples: '\uc810\uc218 \uc608\uc2dc', endGameRules: '\uac8c\uc784 \uc885\ub8cc',
  perfectLineBonus: "+6 보너스",
  ruleSetup1: "2–4명, 108개 타일 (6모양 x 6색상 x 3세트)",
  ruleSetup2: "각 플레이어는 6개 타일을 받습니다",
  ruleSetup3: "첫 플레이어: 가장 많은 타일을 낼 수 있는 사람",
  ruleTurn1: "1개 이상 타일을 한 줄에 놓거나, 타일 교환 (0점)",
  ruleTurn2: "한 줄의 모든 타일은 하나의 속성을 공유 (같은 색 또는 같은 모양)",
  ruleTurn3: "중복 없음, 최대 6개",
  ruleTurn4: "놓은 후 6개까지 뽑기",
  ruleScore1: "놓은 타일마다 해당 줄의 타일 수만큼 점수 (기존 포함)",
  ruleScore2: "타일이 두 줄에 닿으면 둘 다 점수",
  ruleScore3: "기존 옆에 1개 = 최소 2점",
  ruleExample1Title: "3개 줄에 1개 추가:",
  ruleExample1Score: "점수: 4점 (4개)",
  ruleExample2Title: "2개 줄에 2개 추가:",
  ruleExample2Score: "점수: 4점 (4개)",
  ruleExample3Title: "두 줄에 닿는 1개 (3과 4):",
  ruleExample3Score: "점수: 3 + 4 = 7점",
  rulePerfect1: "정확히 6개 줄 완성 = 6점 + 6 보너스 = 총 12점",
  rulePerfect2: "직교 두 6개 줄 완성 = 24점",
  ruleEnd1: "타일이 없고 플레이어가 손을 비우면 종료",
  ruleEnd2: "해당 플레이어는 +6 보너스",
  ruleEnd3: "최고 점수가 승리!",
};

const ar: TranslationStrings = {
  appName: 'Qwi Count', appTagline: '\u062a\u062a\u0628\u0639 \u0646\u062a\u0627\u0626\u062c \u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u0628\u0644\u0627\u0637',
  game: 'اللعبة', newGame: '\u0644\u0639\u0628\u0629 \u062c\u062f\u064a\u062f\u0629', resumeGame: '\u0627\u0633\u062a\u0626\u0646\u0627\u0641', rules: '\u0627\u0644\u0642\u0648\u0627\u0639\u062f',
  howManyPlayers: '\u0643\u0645 \u0639\u062f\u062f \u0627\u0644\u0644\u0627\u0639\u0628\u064a\u0646\u061f', dragToReorder: '\u0627\u0633\u062d\u0628 \u0644\u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0623\u062f\u0648\u0627\u0631',
  whoStarts: '\u0645\u0646 \u064a\u0628\u062f\u0623\u061f', whoStartsDesc: '\u0627\u0644\u0644\u0627\u0639\u0628 \u0635\u0627\u062d\u0628 \u0623\u0641\u0636\u0644 \u062d\u0631\u0643\u0629 \u0627\u0641\u062a\u062a\u0627\u062d\u064a\u0629 \u064a\u0628\u062f\u0623 \u0623\u0648\u0644\u0627\u064b',
  startGame: '\u0628\u062f\u0621 \u0627\u0644\u0644\u0639\u0628\u0629', next: '\u0627\u0644\u062a\u0627\u0644\u064a', back: '\u0631\u062c\u0648\u0639', cancel: '\u0625\u0644\u063a\u0627\u0621',
  round: '\u062c\u0648\u0644\u0629', turn: '\u062f\u0648\u0631', custom: '\u0645\u062e\u0635\u0635', perfectLine: '\u062e\u0637 \u0645\u062b\u0627\u0644\u064a!',
  undo: '\u062a\u0631\u0627\u062c\u0639', skip: '\u062a\u062e\u0637\u064a', end: '\u0625\u0646\u0647\u0627\u0621',
  endGame: '\u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u0644\u0639\u0628\u0629\u061f', endGameDesc: '\u0627\u0645\u0646\u062d +6 \u0645\u0643\u0627\u0641\u0623\u0629 \u0646\u0647\u0627\u064a\u0629 \u0644\u0644\u0627\u0639\u0628 \u0623\u0648 \u0623\u0646\u0647\u0650 \u0628\u062f\u0648\u0646 \u0645\u0643\u0627\u0641\u0623\u0629.',
  pendingPoints: '\u0644\u062f\u064a\u0647 \u0646\u0642\u0627\u0637 \u0645\u0639\u0644\u0642\u0629', autoAdded: '\u0633\u062a\u064f\u0636\u0627\u0641 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b.',
  endNoBonus: '\u0625\u0646\u0647\u0627\u0621 (\u0628\u062f\u0648\u0646 \u0645\u0643\u0627\u0641\u0623\u0629)', noActiveGame: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0644\u0639\u0628\u0629 \u0646\u0634\u0637\u0629', startNewGame: '\u0628\u062f\u0621 \u0644\u0639\u0628\u0629 \u062c\u062f\u064a\u062f\u0629',
  wins: '\u064a\u0641\u0648\u0632!', bestTurn: '\u0623\u0641\u0636\u0644', perfectLines: '\u062e\u0637 \u0645\u062b\u0627\u0644\u064a',
  shareScores: '\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0646\u062a\u0627\u0626\u062c', home: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
  finalScores: '\u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0646\u0647\u0627\u0626\u064a\u0629', winner: '\u0627\u0644\u0641\u0627\u0626\u0632', playAt: '\u0627\u0644\u0639\u0628 \u0639\u0644\u0649',
  scoreProgression: '\u062a\u0637\u0648\u0631 \u0627\u0644\u0646\u062a\u064a\u062c\u0629', gameStats: '\u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a',
  roundsPlayed: '\u0627\u0644\u062c\u0648\u0644\u0627\u062a', totalPoints: '\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0646\u0642\u0627\u0637',
  biggestTurn: '\u0623\u0643\u0628\u0631 \u062f\u0648\u0631', inRound: '\u0641\u064a \u0627\u0644\u062c\u0648\u0644\u0629', highestAverage: '\u0623\u0639\u0644\u0649 \u0645\u062a\u0648\u0633\u0637',
  ptsPerTurn: '\u0646\u0642\u0627\u0637/\u062f\u0648\u0631', mostConsistent: '\u0627\u0644\u0623\u0643\u062b\u0631 \u0627\u062a\u0633\u0627\u0642\u0627\u064b', leadChanges: '\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0627\u0644\u0635\u062f\u0627\u0631\u0629',
  dominantVictory: '\u0641\u0648\u0632 \u0633\u0627\u062d\u0642', neckAndNeck: '\u0645\u0646\u0627\u0641\u0633\u0629 \u0634\u062f\u064a\u062f\u0629!', competitiveGame: '\u0644\u0639\u0628\u0629 \u062a\u0646\u0627\u0641\u0633\u064a\u0629',
  settings: '\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a', soundEffects: '\u0627\u0644\u0645\u0624\u062b\u0631\u0627\u062a \u0627\u0644\u0635\u0648\u062a\u064a\u0629', soundDesc: '\u0623\u0635\u0648\u0627\u062a \u0627\u0644\u0646\u0642\u0627\u0637 \u0648\u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0644\u0627\u062a',
  hapticFeedback: '\u0627\u0644\u0627\u0647\u062a\u0632\u0627\u0632', hapticDesc: '\u0627\u0647\u062a\u0632\u0627\u0632 \u0639\u0644\u0649 \u0627\u0644\u0623\u062c\u0647\u0632\u0629 \u0627\u0644\u0623\u0635\u0644\u064a\u0629',
  theme: '\u0627\u0644\u0645\u0638\u0647\u0631', system: '\u0627\u0644\u0646\u0638\u0627\u0645', light: '\u0641\u0627\u062a\u062d', dark: '\u062f\u0627\u0643\u0646',
  language: '\u0627\u0644\u0644\u063a\u0629', languageDesc: '\u0627\u062e\u062a\u0631 \u0644\u063a\u062a\u0643',
  howToPlay: '\u0643\u064a\u0641 \u062a\u0644\u0639\u0628', setup: '\u0627\u0644\u062a\u062d\u0636\u064a\u0631', onYourTurn: '\u0641\u064a \u062f\u0648\u0631\u0643',
  scoring: '\u0627\u0644\u062a\u0633\u062c\u064a\u0644', scoringExamples: '\u0623\u0645\u062b\u0644\u0629 \u0627\u0644\u062a\u0633\u062c\u064a\u0644', endGameRules: '\u0646\u0647\u0627\u064a\u0629 \u0627\u0644\u0644\u0639\u0628\u0629',
  perfectLineBonus: "+6 مكافأة",
  ruleSetup1: "2–4 لاعبين، 108 بلاطات (6 أشكال x 6 ألوان x 3 نسخ)",
  ruleSetup2: "كل لاعب يسحب 6 بلاطات",
  ruleSetup3: "اللاعب الأول: من يضع أكثر بلاطات",
  ruleTurn1: "ضع 1+ بلاطة في سطر، أو بدّل (0 نقطة)",
  ruleTurn2: "كل بلاطات السطر تشترك في صفة (نفس اللون أو الشكل)",
  ruleTurn3: "لا تكرار، أقصى 6 لكل سطر",
  ruleTurn4: "اسحب حتى 6 بعد الوضع",
  ruleScore1: "كل بلاطة تسجل نقطة لكل بلاطة في السطر (بما فيها الموجودة)",
  ruleScore2: "إذا لمست سطرين، كلاهما يسجل",
  ruleScore3: "بلاطة بجانب موجودة = نقطتان أدنى",
  ruleExample1Title: "ضع 1 لتمديد سطر من 3:",
  ruleExample1Score: "النقاط: 4 (4 بلاطات)",
  ruleExample2Title: "ضع 2 لتمديد سطر من 2:",
  ruleExample2Score: "النقاط: 4 (4 بلاطات)",
  ruleExample3Title: "ضع 1 تلمس سطرين (3 و4):",
  ruleExample3Score: "النقاط: 3 + 4 = 7",
  rulePerfect1: "سطر من 6 = 6 نقاط + 6 مكافأة = 12 إجمالي",
  rulePerfect2: "سطران متعامدان من 6 = 24 نقطة",
  ruleEnd1: "ينتهي اللعب عندما لا توجد بلاطات ويفرغ لاعب يده",
  ruleEnd2: "يحصل على +6 مكافأة",
  ruleEnd3: "أعلى نقاط يفوز!",
};

const hi: TranslationStrings = {
  appName: 'Qwi Count', appTagline: '\u0905\u092a\u0928\u0947 \u091f\u093e\u0907\u0932 \u0917\u0947\u092e \u0915\u0947 \u0938\u094d\u0915\u094b\u0930 \u091f\u094d\u0930\u0948\u0915 \u0915\u0930\u0947\u0902',
  game: 'खेल', newGame: '\u0928\u092f\u093e \u0916\u0947\u0932', resumeGame: '\u091c\u093e\u0930\u0940 \u0930\u0916\u0947\u0902', rules: '\u0928\u093f\u092f\u092e',
  howManyPlayers: '\u0915\u093f\u0924\u0928\u0947 \u0916\u093f\u0932\u093e\u0921\u093c\u0940?', dragToReorder: '\u0915\u094d\u0930\u092e \u092c\u0926\u0932\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0916\u0940\u0902\u091a\u0947\u0902',
  whoStarts: '\u0915\u094c\u0928 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0917\u093e?', whoStartsDesc: '\u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u0940 \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u091a\u093e\u0932 \u0935\u093e\u0932\u093e \u0916\u093f\u0932\u093e\u0921\u093c\u0940 \u092a\u0939\u0932\u0947 \u0916\u0947\u0932\u0924\u093e \u0939\u0948',
  startGame: '\u0916\u0947\u0932 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902', next: '\u0905\u0917\u0932\u093e', back: '\u0935\u093e\u092a\u0938', cancel: '\u0930\u0926\u094d\u0926',
  round: '\u0930\u093e\u0909\u0902\u0921', turn: '\u092c\u093e\u0930\u0940', custom: '\u0915\u0938\u094d\u091f\u092e', perfectLine: '\u092a\u0930\u094d\u092b\u0947\u0915\u094d\u091f \u0932\u093e\u0907\u0928!',
  undo: '\u0935\u093e\u092a\u0938 \u0915\u0930\u0947\u0902', skip: '\u091b\u094b\u0921\u093c\u0947\u0902', end: '\u0938\u092e\u093e\u092a\u094d\u0924',
  endGame: '\u0916\u0947\u0932 \u0938\u092e\u093e\u092a\u094d\u0924 \u0915\u0930\u0947\u0902?', endGameDesc: '+6 \u092c\u094b\u0928\u0938 \u0926\u0947\u0902 \u092f\u093e \u092c\u094b\u0928\u0938 \u0915\u0947 \u092c\u093f\u0928\u093e \u0938\u092e\u093e\u092a\u094d\u0924 \u0915\u0930\u0947\u0902\u0964',
  pendingPoints: '\u0915\u0947 \u0932\u0902\u092c\u093f\u0924 \u0905\u0902\u0915', autoAdded: '\u0938\u094d\u0935\u091a\u093e\u0932\u093f\u0924 \u0930\u0942\u092a \u0938\u0947 \u091c\u094b\u0921\u093c\u0947 \u091c\u093e\u090f\u0902\u0917\u0947\u0964',
  endNoBonus: '\u0938\u092e\u093e\u092a\u094d\u0924 (\u092c\u094b\u0928\u0938 \u0928\u0939\u0940\u0902)', noActiveGame: '\u0915\u094b\u0908 \u0938\u0915\u094d\u0930\u093f\u092f \u0916\u0947\u0932 \u0928\u0939\u0940\u0902', startNewGame: '\u0928\u092f\u093e \u0916\u0947\u0932 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902',
  wins: '\u091c\u0940\u0924\u093e!', bestTurn: '\u0938\u0930\u094d\u0935\u0936\u094d\u0930\u0947\u0937\u094d\u0920', perfectLines: '\u092a\u0930\u094d\u092b\u0947\u0915\u094d\u091f \u0932\u093e\u0907\u0928',
  shareScores: '\u0938\u094d\u0915\u094b\u0930 \u0936\u0947\u092f\u0930 \u0915\u0930\u0947\u0902', home: '\u0939\u094b\u092e',
  finalScores: '\u0905\u0902\u0924\u093f\u092e \u0938\u094d\u0915\u094b\u0930', winner: '\u0935\u093f\u091c\u0947\u0924\u093e', playAt: '\u0916\u0947\u0932\u0947\u0902',
  scoreProgression: '\u0938\u094d\u0915\u094b\u0930 \u092a\u094d\u0930\u0917\u0924\u093f', gameStats: '\u0906\u0902\u0915\u0921\u093c\u0947',
  roundsPlayed: '\u0930\u093e\u0909\u0902\u0921', totalPoints: '\u0915\u0941\u0932 \u0905\u0902\u0915',
  biggestTurn: '\u0938\u092c\u0938\u0947 \u092c\u0921\u093c\u0940 \u092c\u093e\u0930\u0940', inRound: '\u0930\u093e\u0909\u0902\u0921 \u092e\u0947\u0902', highestAverage: '\u0938\u092c\u0938\u0947 \u0905\u0927\u093f\u0915 \u0914\u0938\u0924',
  ptsPerTurn: '\u0905\u0902\u0915/\u092c\u093e\u0930\u0940', mostConsistent: '\u0938\u092c\u0938\u0947 \u0938\u094d\u0925\u093f\u0930', leadChanges: '\u0928\u0947\u0924\u0943\u0924\u094d\u0935 \u092a\u0930\u093f\u0935\u0930\u094d\u0924\u0928',
  dominantVictory: '\u092a\u094d\u0930\u092d\u093e\u0935\u0936\u093e\u0932\u0940 \u091c\u0940\u0924', neckAndNeck: '\u0915\u093e\u0902\u091f\u0947 \u0915\u0940 \u091f\u0915\u094d\u0915\u0930!', competitiveGame: '\u092a\u094d\u0930\u0924\u093f\u0938\u094d\u092a\u0930\u094d\u0927\u0940 \u0916\u0947\u0932',
  settings: '\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938', soundEffects: '\u0927\u094d\u0935\u0928\u093f \u092a\u094d\u0930\u092d\u093e\u0935', soundDesc: '\u0938\u094d\u0915\u094b\u0930 \u0914\u0930 \u091c\u0936\u094d\u0928 \u0915\u0940 \u0906\u0935\u093e\u091c\u093c\u0947\u0902',
  hapticFeedback: '\u0915\u0902\u092a\u0928 \u092a\u094d\u0930\u0924\u093f\u0915\u094d\u0930\u093f\u092f\u093e', hapticDesc: '\u0928\u0947\u091f\u093f\u0935 \u0921\u093f\u0935\u093e\u0907\u0938 \u092a\u0930 \u0915\u0902\u092a\u0928',
  theme: '\u0925\u0940\u092e', system: '\u0938\u093f\u0938\u094d\u091f\u092e', light: '\u0932\u093e\u0907\u091f', dark: '\u0921\u093e\u0930\u094d\u0915',
  language: '\u092d\u093e\u0937\u093e', languageDesc: '\u0905\u092a\u0928\u0940 \u092d\u093e\u0937\u093e \u091a\u0941\u0928\u0947\u0902',
  howToPlay: '\u0915\u0948\u0938\u0947 \u0916\u0947\u0932\u0947\u0902', setup: '\u0924\u0948\u092f\u093e\u0930\u0940', onYourTurn: '\u0906\u092a\u0915\u0940 \u092c\u093e\u0930\u0940',
  scoring: '\u0938\u094d\u0915\u094b\u0930\u093f\u0902\u0917', scoringExamples: '\u0938\u094d\u0915\u094b\u0930\u093f\u0902\u0917 \u0909\u0926\u093e\u0939\u0930\u0923', endGameRules: '\u0916\u0947\u0932 \u0938\u092e\u093e\u092a\u094d\u0924\u093f',
  perfectLineBonus: "+6 बोनस",
  ruleSetup1: "2–4 खिलाड़ी, 108 टाइल (6 आकार x 6 रंग x 3 कॉपी)",
  ruleSetup2: "हर खिलाड़ी 6 टाइल लेता है",
  ruleSetup3: "पहले खिलाड़ी: जो सबसे ज्यादा टाइल खेल सके",
  ruleTurn1: "1+ टाइल एक लाइन में रखें, या बदलें (0 अंक)",
  ruleTurn2: "एक लाइन में सभी एक गुण साझा करें (रंग या आकार)",
  ruleTurn3: "डुप्लिकेट नहीं, अधिकतम 6",
  ruleTurn4: "रखने के बाद 6 तक भरें",
  ruleScore1: "हर रखी टाइल लाइन में टाइल संख्या के बराबर अंक (मौजूदा सहित)",
  ruleScore2: "दो लाइनों को छूती है तो दोनों स्कोर",
  ruleScore3: "मौजूदा के पास 1 = न्यूनतम 2 अंक",
  ruleExample1Title: "3 की लाइन में 1 जोड़ें:",
  ruleExample1Score: "स्कोर: 4 अंक (4 टाइल)",
  ruleExample2Title: "2 की लाइन में 2 जोड़ें:",
  ruleExample2Score: "स्कोर: 4 अंक (4 टाइल)",
  ruleExample3Title: "दो लाइनों को छूने वाली 1 (3 और 4):",
  ruleExample3Score: "स्कोर: 3 + 4 = 7 अंक",
  rulePerfect1: "ठीक 6 की लाइन = 6 अंक + 6 बोनस = कुल 12",
  rulePerfect2: "दो लंबवत लाइनें 6 = 24 अंक",
  ruleEnd1: "जब टाइल नहीं बची और खिलाड़ी ने सब खेल लिया तो समाप्त",
  ruleEnd2: "उसे +6 बोनस अंक मिलते हैं",
  ruleEnd3: "सबसे अधिक अंक जीतते हैं!",
};

export const translations: Record<Language, TranslationStrings> = {
  en, es, fr, de, pt, zh, ja, ko, ar, hi,
};

export const LANGUAGE_OPTIONS: { value: Language; label: string; native: string }[] = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'es', label: 'Spanish', native: 'Espa\u00f1ol' },
  { value: 'fr', label: 'French', native: 'Fran\u00e7ais' },
  { value: 'de', label: 'German', native: 'Deutsch' },
  { value: 'pt', label: 'Portuguese', native: 'Portugu\u00eas' },
  { value: 'zh', label: 'Chinese', native: '\u4e2d\u6587' },
  { value: 'ja', label: 'Japanese', native: '\u65e5\u672c\u8a9e' },
  { value: 'ko', label: 'Korean', native: '\ud55c\uad6d\uc5b4' },
  { value: 'ar', label: 'Arabic', native: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' },
  { value: 'hi', label: 'Hindi', native: '\u0939\u093f\u0928\u094d\u0926\u0940' },
];
