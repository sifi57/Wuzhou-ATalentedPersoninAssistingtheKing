import { create } from 'zustand';
import { CardData, INITIAL_DECK, CARD_POOL } from '../data/cards';
import { CHAPTERS } from '../data/chapters';

export type GamePhase = 'START' | 'MAP' | 'EVENT' | 'BATTLE' | 'REWARD' | 'GAMEOVER' | 'VICTORY';

export interface MapNode {
  id: string;
  type: 'BATTLE' | 'ELITE' | 'EVENT' | 'REST' | 'SHOP' | 'BOSS';
  status: 'LOCKED' | 'AVAILABLE' | 'COMPLETED';
  nextNodes: string[];
  x: number;
  y: number;
}

interface GameState {
  phase: GamePhase;
  chapterIndex: number;
  hp: number;
  maxHp: number;
  gold: number;
  deck: CardData[];
  mapNodes: MapNode[];
  currentNodeId: string | null;
  currentEventId: string | null;
  flags: Record<string, boolean>;
  
  // Battle state
  energy: number;
  maxEnergy: number;
  hand: CardData[];
  discard: CardData[];
  drawPile: CardData[];
  enemyHp: number;
  enemyMaxHp: number;
  enemyIntent: string;
  enemyIntentValue: number;
  playerBlock: number;
  enemyBlock: number;

  // Actions
  startGame: () => void;
  selectNode: (nodeId: string) => void;
  completeNode: () => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  addGold: (amount: number) => void;
  loseGold: (amount: number) => void;
  addCardToDeck: (card: CardData) => void;
  setFlag: (key: string, value: boolean) => void;
  
  // Battle Actions
  startBattle: (isElite: boolean, isBoss: boolean) => void;
  playCard: (cardIndex: number) => void;
  endTurn: () => void;
}

const generateMap = (chapterIndex: number, flags: Record<string, boolean>): MapNode[] => {
  // Simplified map generation for prototype
  return [
    { id: 'n1', type: 'BATTLE', status: 'AVAILABLE', nextNodes: ['n2', 'n3'], x: 100, y: 500 },
    { id: 'n2', type: 'EVENT', status: 'LOCKED', nextNodes: ['n4'], x: 200, y: 400 },
    { id: 'n3', type: 'BATTLE', status: 'LOCKED', nextNodes: ['n4', 'n5'], x: 200, y: 600 },
    { id: 'n4', type: 'ELITE', status: 'LOCKED', nextNodes: ['n6'], x: 300, y: 450 },
    { id: 'n5', type: 'REST', status: 'LOCKED', nextNodes: ['n6'], x: 300, y: 650 },
    { id: 'n6', type: 'BOSS', status: 'LOCKED', nextNodes: [], x: 400, y: 500 },
  ];
};

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'START',
  chapterIndex: 0,
  hp: 50,
  maxHp: 50,
  gold: 100,
  deck: [...INITIAL_DECK],
  mapNodes: [],
  currentNodeId: null,
  currentEventId: null,
  flags: {},

  energy: 3,
  maxEnergy: 3,
  hand: [],
  discard: [],
  drawPile: [],
  enemyHp: 30,
  enemyMaxHp: 30,
  enemyIntent: 'ATTACK',
  enemyIntentValue: 5,
  playerBlock: 0,
  enemyBlock: 0,

  startGame: () => set({
    phase: 'MAP',
    chapterIndex: 0,
    hp: 50,
    maxHp: 50,
    gold: 100,
    deck: [...INITIAL_DECK],
    mapNodes: generateMap(0, {}),
    currentNodeId: null,
    flags: {},
  }),

  selectNode: (nodeId) => {
    const { mapNodes } = get();
    const node = mapNodes.find(n => n.id === nodeId);
    if (!node || node.status !== 'AVAILABLE') return;

    // Update map status
    const newNodes = mapNodes.map(n => ({
      ...n,
      status: n.id === nodeId ? 'COMPLETED' : (n.status === 'AVAILABLE' ? 'LOCKED' : n.status)
    }));
    
    // Unlock next nodes
    node.nextNodes.forEach(nextId => {
      const nextNode = newNodes.find(n => n.id === nextId);
      if (nextNode) nextNode.status = 'AVAILABLE';
    });

    set({ mapNodes: newNodes, currentNodeId: nodeId });

    if (node.type === 'BATTLE' || node.type === 'ELITE' || node.type === 'BOSS') {
      get().startBattle(node.type === 'ELITE', node.type === 'BOSS');
    } else if (node.type === 'EVENT') {
      // Logic to select event based on chapter and flags
      const { chapterIndex, flags } = get();
      let eventId = `ch${chapterIndex + 1}_main_1`; // Default to first main event of chapter
      
      if (chapterIndex === 0) {
        if (flags['trust_wu'] && !flags['ch1_side_1_done']) {
          eventId = 'ch1_side_1';
          get().setFlag('ch1_side_1_done', true);
        } else {
          eventId = Math.random() > 0.5 ? 'ch1_main_1' : 'ch1_main_2';
        }
      } else if (chapterIndex === 1) {
        if (!flags['ch2_side_1_done'] && Math.random() > 0.5) {
          eventId = 'ch2_side_1';
          get().setFlag('ch2_side_1_done', true);
        } else {
          eventId = 'ch2_main_1';
        }
      } else if (chapterIndex === 2) {
        if (!flags['ch3_side_1_done'] && Math.random() > 0.5) {
          eventId = 'ch3_side_1';
          get().setFlag('ch3_side_1_done', true);
        } else {
          eventId = 'ch3_main_1';
        }
      } else if (chapterIndex === 3) {
        eventId = 'ch4_main_1';
      } else if (chapterIndex === 4) {
        eventId = 'ch5_main_1';
      } else if (chapterIndex === 5) {
        eventId = 'ch6_main_1';
      }

      set({ phase: 'EVENT', currentEventId: eventId });
    } else if (node.type === 'REST') {
      get().heal(15);
      get().completeNode();
    }
  },

  completeNode: () => {
    const { currentNodeId, mapNodes, chapterIndex, flags } = get();
    const node = mapNodes.find(n => n.id === currentNodeId);
    if (node?.type === 'BOSS') {
      if (chapterIndex < CHAPTERS.length - 1) {
        set({ chapterIndex: chapterIndex + 1, mapNodes: generateMap(chapterIndex + 1, flags), currentNodeId: null, phase: 'MAP' });
      } else {
        set({ phase: 'VICTORY' });
      }
    } else {
      set({ phase: 'MAP' });
    }
  },

  takeDamage: (amount) => set(state => {
    const newHp = Math.max(0, state.hp - amount);
    if (newHp === 0) return { hp: 0, phase: 'GAMEOVER' };
    return { hp: newHp };
  }),

  heal: (amount) => set(state => ({ hp: Math.min(state.maxHp, state.hp + amount) })),
  addGold: (amount) => set(state => ({ gold: state.gold + amount })),
  loseGold: (amount) => set(state => ({ gold: Math.max(0, state.gold - amount) })),
  addCardToDeck: (card) => set(state => ({ deck: [...state.deck, card] })),
  setFlag: (key, value) => set(state => ({ flags: { ...state.flags, [key]: value } })),

  startBattle: (isElite, isBoss) => {
    const { deck } = get();
    // Shuffle deck into draw pile
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const initialHand = shuffled.splice(0, 5);
    
    set({
      phase: 'BATTLE',
      drawPile: shuffled,
      hand: initialHand,
      discard: [],
      energy: get().maxEnergy,
      playerBlock: 0,
      enemyBlock: 0,
      enemyMaxHp: isBoss ? 100 : (isElite ? 60 : 30),
      enemyHp: isBoss ? 100 : (isElite ? 60 : 30),
      enemyIntent: 'ATTACK',
      enemyIntentValue: isBoss ? 15 : (isElite ? 10 : 5)
    });
  },

  playCard: (cardIndex) => {
    const { hand, energy, enemyHp, playerBlock, enemyBlock } = get();
    const card = hand[cardIndex];
    if (energy < card.cost) return;

    let newEnemyHp = enemyHp;
    let newPlayerBlock = playerBlock;
    let newEnemyBlock = enemyBlock;

    if (card.type === 'ATTACK') {
      let damage = card.value;
      if (newEnemyBlock > 0) {
        if (newEnemyBlock >= damage) {
          newEnemyBlock -= damage;
          damage = 0;
        } else {
          damage -= newEnemyBlock;
          newEnemyBlock = 0;
        }
      }
      newEnemyHp -= damage;
    } else if (card.type === 'DEFENSE') {
      newPlayerBlock += card.value;
    } else if (card.type === 'SKILL') {
      // Handle skill effects
    }

    const newHand = [...hand];
    newHand.splice(cardIndex, 1);

    set({
      energy: energy - card.cost,
      hand: newHand,
      discard: [...get().discard, card],
      enemyHp: newEnemyHp,
      playerBlock: newPlayerBlock,
      enemyBlock: newEnemyBlock
    });

    if (newEnemyHp <= 0) {
      set({ phase: 'REWARD' });
    }
  },

  endTurn: () => {
    const { enemyIntent, enemyIntentValue, playerBlock, hp, hand, discard, drawPile, maxEnergy } = get();
    
    // Enemy action
    let newHp = hp;
    let newPlayerBlock = playerBlock;
    
    if (enemyIntent === 'ATTACK') {
      let damage = enemyIntentValue;
      if (newPlayerBlock > 0) {
        if (newPlayerBlock >= damage) {
          newPlayerBlock -= damage;
          damage = 0;
        } else {
          damage -= newPlayerBlock;
          newPlayerBlock = 0;
        }
      }
      newHp -= damage;
    }

    if (newHp <= 0) {
      set({ hp: 0, phase: 'GAMEOVER' });
      return;
    }

    // Draw new hand
    let newDrawPile = [...drawPile];
    let newDiscard = [...discard, ...hand];
    let newHand = [];

    for (let i = 0; i < 5; i++) {
      if (newDrawPile.length === 0) {
        newDrawPile = [...newDiscard].sort(() => Math.random() - 0.5);
        newDiscard = [];
      }
      if (newDrawPile.length > 0) {
        newHand.push(newDrawPile.pop()!);
      }
    }

    set({
      hp: newHp,
      playerBlock: 0, // Reset block
      hand: newHand,
      drawPile: newDrawPile,
      discard: newDiscard,
      energy: maxEnergy,
      // Randomize next enemy intent
      enemyIntent: Math.random() > 0.3 ? 'ATTACK' : 'DEFEND',
      enemyIntentValue: Math.floor(Math.random() * 10) + 5
    });
  }
}));
