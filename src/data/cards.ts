import { FactionId } from './factions';

export interface CardData {
  id: string;
  name: string;
  faction: FactionId;
  cost: number;
  type: 'ATTACK' | 'DEFENSE' | 'SKILL';
  value: number;
  description: string;
}

export const INITIAL_DECK: CardData[] = [
  { id: 'strike_1', name: '进言', faction: 'NEUTRAL', cost: 1, type: 'ATTACK', value: 6, description: '造成6点伤害' },
  { id: 'strike_2', name: '进言', faction: 'NEUTRAL', cost: 1, type: 'ATTACK', value: 6, description: '造成6点伤害' },
  { id: 'strike_3', name: '进言', faction: 'NEUTRAL', cost: 1, type: 'ATTACK', value: 6, description: '造成6点伤害' },
  { id: 'strike_4', name: '进言', faction: 'NEUTRAL', cost: 1, type: 'ATTACK', value: 6, description: '造成6点伤害' },
  { id: 'defend_1', name: '周旋', faction: 'NEUTRAL', cost: 1, type: 'DEFENSE', value: 5, description: '获得5点护甲' },
  { id: 'defend_2', name: '周旋', faction: 'NEUTRAL', cost: 1, type: 'DEFENSE', value: 5, description: '获得5点护甲' },
  { id: 'defend_3', name: '周旋', faction: 'NEUTRAL', cost: 1, type: 'DEFENSE', value: 5, description: '获得5点护甲' },
  { id: 'defend_4', name: '周旋', faction: 'NEUTRAL', cost: 1, type: 'DEFENSE', value: 5, description: '获得5点护甲' },
];

export const CARD_POOL: CardData[] = [
  // 武皇集团 (Wu Zhou) - Debuffs, high risk/reward
  { id: 'c_wuzhou_1', name: '罗织罪名', faction: 'WU_ZHOU', cost: 1, type: 'SKILL', value: 0, description: '给予敌人2层虚弱（造成的伤害减少25%）。' },
  { id: 'c_wuzhou_2', name: '铜匦告密', faction: 'WU_ZHOU', cost: 2, type: 'ATTACK', value: 14, description: '造成14点伤害，若敌人有负面状态，恢复自身5点生命。' },
  { id: 'c_wuzhou_3', name: '北门学士', faction: 'WU_ZHOU', cost: 0, type: 'SKILL', value: 0, description: '抽2张牌，失去2点生命。' },
  
  // 李唐旧臣 (Li Tang) - Defense, scaling
  { id: 'c_litang_1', name: '门阀底蕴', faction: 'LI_TANG', cost: 1, type: 'DEFENSE', value: 12, description: '获得12点护甲。' },
  { id: 'c_litang_2', name: '匡复之志', faction: 'LI_TANG', cost: 2, type: 'ATTACK', value: 8, description: '造成8点伤害。每打出一张李唐牌，此牌伤害+3。' },
  { id: 'c_litang_3', name: '旧臣联名', faction: 'LI_TANG', cost: 1, type: 'DEFENSE', value: 8, description: '获得8点护甲，抽1张牌。' },

  // 太平公主党 (Taiping) - Manipulation, combo
  { id: 'c_taiping_1', name: '夫人外交', faction: 'TAI_PING', cost: 1, type: 'SKILL', value: 0, description: '下回合额外获得2点行动力。' },
  { id: 'c_taiping_2', name: '幕后推手', faction: 'TAI_PING', cost: 2, type: 'ATTACK', value: 10, description: '造成10点伤害。将一张“进言”加入手牌，其耗能变为0。' },

  // 隆基党 (Li Longji) - Burst, late game
  { id: 'c_longji_1', name: '万骑突袭', faction: 'LI_LONGJI', cost: 3, type: 'ATTACK', value: 25, description: '造成25点伤害。' },
  { id: 'c_longji_2', name: '拨乱反正', faction: 'LI_LONGJI', cost: 1, type: 'SKILL', value: 0, description: '清除自身所有负面状态，获得10点护甲。' },

  // 韦氏外戚 (Wei Family) - Resource manipulation
  { id: 'c_wei_1', name: '结党营私', faction: 'WEI_FAMILY', cost: 1, type: 'DEFENSE', value: 7, description: '获得7点护甲。若手牌中有其他韦氏牌，额外获得7点护甲。' },
  { id: 'c_wei_2', name: '外戚专权', faction: 'WEI_FAMILY', cost: 2, type: 'ATTACK', value: 12, description: '造成12点伤害。获得等同于造成伤害的护甲。' },

  // 关陇集团 (Guanlong) - High cost, powerful defense and resource generation
  { id: 'c_guanlong_1', name: '门阀底蕴', faction: 'GUAN_LONG', cost: 2, type: 'DEFENSE', value: 15, description: '获得15点护甲。下回合开始时额外抽1张牌。' },
  { id: 'c_guanlong_2', name: '朝堂盘根', faction: 'GUAN_LONG', cost: 3, type: 'ATTACK', value: 20, description: '造成20点伤害。若自身护甲大于0，额外造成10点伤害。' },

  // 科举新贵 (Scholars) - Low cost, card draw, combo
  { id: 'c_scholar_1', name: '连中三元', faction: 'SCHOLARS', cost: 0, type: 'SKILL', value: 0, description: '抽2张牌。本回合下一张打出的牌耗能-1。' },
  { id: 'c_scholar_2', name: '激扬文字', faction: 'SCHOLARS', cost: 1, type: 'ATTACK', value: 6, description: '造成6点伤害。本回合每打出一张牌，此牌伤害+2。' },

  // 江南士族 (Jiangnan) - Gold manipulation, economic advantage
  { id: 'c_jiangnan_1', name: '江南财赋', faction: 'JIANG_NAN', cost: 1, type: 'SKILL', value: 0, description: '获得15点护甲。战斗结束后额外获得10资材。' },
  { id: 'c_jiangnan_2', name: '重金收买', faction: 'JIANG_NAN', cost: 2, type: 'SKILL', value: 0, description: '获得20点护甲。若资材大于100，额外获得10点护甲。' },
];
