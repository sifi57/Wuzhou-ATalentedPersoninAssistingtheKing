export const FACTIONS = {
  WU_ZHOU: { id: 'WU_ZHOU', name: '武皇集团', color: 'text-game-red', bg: 'bg-red-900', border: 'border-game-red' },
  LI_TANG: { id: 'LI_TANG', name: '李唐旧臣', color: 'text-game-gold', bg: 'bg-yellow-900', border: 'border-game-gold' },
  TAI_PING: { id: 'TAI_PING', name: '太平公主党', color: 'text-purple-400', bg: 'bg-purple-900', border: 'border-purple-500' },
  LI_LONGJI: { id: 'LI_LONGJI', name: '隆基党', color: 'text-blue-400', bg: 'bg-blue-900', border: 'border-blue-500' },
  WEI_FAMILY: { id: 'WEI_FAMILY', name: '韦氏外戚', color: 'text-green-400', bg: 'bg-green-900', border: 'border-green-500' },
  GUAN_LONG: { id: 'GUAN_LONG', name: '关陇集团', color: 'text-orange-400', bg: 'bg-orange-900', border: 'border-orange-500' },
  SCHOLARS: { id: 'SCHOLARS', name: '科举新贵', color: 'text-cyan-400', bg: 'bg-cyan-900', border: 'border-cyan-500' },
  JIANG_NAN: { id: 'JIANG_NAN', name: '江南士族', color: 'text-emerald-400', bg: 'bg-emerald-900', border: 'border-emerald-500' },
  NEUTRAL: { id: 'NEUTRAL', name: '中立', color: 'text-game-muted', bg: 'bg-gray-800', border: 'border-game-border' },
};

export type FactionId = keyof typeof FACTIONS;
