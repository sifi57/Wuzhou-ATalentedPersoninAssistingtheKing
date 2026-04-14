import { useGameStore } from '../store/gameStore';
import { FACTIONS } from '../data/factions';
import { cn } from '../lib/utils';
import { Shield, Zap } from 'lucide-react';

export default function BattleScreen() {
  const { 
    hp, maxHp, energy, maxEnergy, hand, drawPile, discard, 
    enemyHp, enemyMaxHp, enemyIntent, enemyIntentValue,
    playerBlock, enemyBlock, playCard, endTurn
  } = useGameStore();

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_center,#2a221a_0%,#0f0d0c_100%)] text-game-text font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-game-header border-b-2 border-game-border shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-6 text-sm text-game-muted">
          <div className="flex gap-2">HP: <span className="text-game-gold font-bold">{hp}/{maxHp}</span></div>
          {playerBlock > 0 && <div className="text-[#4682b4] flex items-center gap-1 font-bold"><Shield size={16}/> {playerBlock}</div>}
        </div>
        <div className="flex items-center gap-6 text-sm text-game-muted">
          {enemyBlock > 0 && <div className="text-[#4682b4] flex items-center gap-1 font-bold"><Shield size={16}/> {enemyBlock}</div>}
          <div className="flex gap-2">Enemy HP: <span className="text-game-red font-bold">{enemyHp}/{enemyMaxHp}</span></div>
        </div>
      </div>

      {/* Battlefield */}
      <div className="flex-1 flex items-center justify-between px-32 relative">
        {/* Player */}
        <div className="flex flex-col items-center z-10">
          <div className="w-32 h-48 bg-[rgba(20,18,16,0.8)] border border-game-border flex items-center justify-center mb-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            <span className="text-game-gold tracking-widest font-serif text-xl">玩家</span>
          </div>
          <div className="flex gap-2 text-game-gold font-bold text-xl drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            <Zap /> {energy}/{maxEnergy}
          </div>
        </div>

        {/* VS */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[#3d352b] tracking-widest opacity-50 font-serif">
          对决
        </div>

        {/* Enemy */}
        <div className="flex flex-col items-center z-10">
          <div className="mb-4 text-center bg-[rgba(40,35,30,0.6)] px-4 py-2 border border-[#4a4135]">
            <div className="text-[12px] text-game-muted font-serif">意图</div>
            <div className="font-bold text-game-red">{enemyIntent === 'ATTACK' ? `攻击 (${enemyIntentValue})` : `防御 (${enemyIntentValue})`}</div>
          </div>
          <div className="w-32 h-48 bg-[linear-gradient(135deg,#2a2520_0%,#3d1a1a_100%)] border border-game-red flex items-center justify-center shadow-[0_4px_10px_rgba(196,30,58,0.3)]">
            <span className="text-game-text tracking-widest font-serif text-xl">大敌</span>
          </div>
        </div>
      </div>

      {/* Hand & Controls */}
      <div className="bg-[linear-gradient(to_top,#0a0908,#1c1713)] border-t-2 border-game-border p-4 flex flex-col h-[260px]">
        <div className="flex justify-between items-end mb-4 px-8">
          <div className="text-[12px] text-game-muted">抽牌堆: <span className="text-game-gold">{drawPile.length}</span></div>
          <button 
            onClick={endTurn}
            className="px-6 py-2 bg-[#1c1713] hover:bg-[#2a2520] text-game-gold font-bold border border-game-gold shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-colors tracking-widest font-serif"
          >
            结束回合
          </button>
          <div className="text-[12px] text-game-muted">弃牌堆: <span className="text-game-gold">{discard.length}</span></div>
        </div>

        <div className="flex-1 flex justify-center gap-[15px] items-center">
          {hand.map((card, idx) => {
            const faction = FACTIONS[card.faction];
            const canPlay = energy >= card.cost;
            
            // Determine card style based on faction or type
            let cardBgClass = "bg-game-card border-game-border";
            if (card.faction === 'LI_TANG') cardBgClass = "border-game-red bg-[linear-gradient(135deg,#2a2520_0%,#3d1a1a_100%)]";
            if (card.faction === 'WU_FAMILY' || card.faction === 'CRUEL_OFFICIALS') cardBgClass = "border-game-gold bg-[linear-gradient(135deg,#2a2520_0%,#3d352b_100%)]";

            return (
              <button
                key={idx}
                onClick={() => playCard(idx)}
                disabled={!canPlay}
                className={cn(
                  "w-[140px] h-[190px] rounded-[8px] p-[10px] flex flex-col text-left transition-transform relative border",
                  cardBgClass,
                  canPlay ? "hover:-translate-y-4 cursor-pointer" : "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="absolute -top-[5px] -left-[5px] w-[24px] h-[24px] bg-game-gold text-[#1c1713] rounded-full flex items-center justify-center font-bold text-[12px] shadow-md">
                  {card.cost}
                </div>
                <div className="h-[25px] border-b border-game-border-light text-[12px] font-bold text-game-gold ml-4 font-serif">
                  {card.name}
                </div>
                <div className="flex-1 bg-[rgba(0,0,0,0.2)] margin-[8px_0] flex items-center justify-center text-[#3d352b] text-[40px] my-2">
                  {card.type === 'ATTACK' ? '⚔️' : card.type === 'DEFENSE' ? '🛡️' : '📜'}
                </div>
                <div className="text-[10px] text-game-muted leading-[1.4] h-[40px] overflow-hidden">
                  {card.description}
                </div>
                <div className="absolute bottom-[5px] right-[10px] text-[9px] uppercase text-[#8a7e6e]">
                  {faction.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
