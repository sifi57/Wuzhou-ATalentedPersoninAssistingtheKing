import { useGameStore } from '../store/gameStore';
import { CARD_POOL } from '../data/cards';
import { FACTIONS } from '../data/factions';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function RewardScreen() {
  const { completeNode, addCardToDeck, addGold } = useGameStore();
  const [cards] = useState(() => {
    const shuffled = [...CARD_POOL].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });
  const [gold] = useState(() => Math.floor(Math.random() * 20) + 10);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedCard) {
      const card = cards.find(c => c.id === selectedCard);
      if (card) addCardToDeck(card);
    }
    addGold(gold);
    completeNode();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[radial-gradient(circle_at_center,#2a221a_0%,#0f0d0c_100%)] text-game-text p-8 font-sans">
      <div className="bg-[#3d1a1a] p-2 px-6 border-l-4 border-game-red text-sm uppercase tracking-widest mb-8 inline-block shadow-[0_4px_10px_rgba(0,0,0,0.5)] font-serif">
        战斗胜利
      </div>
      
      <div className="mb-8 text-lg text-game-muted flex items-center gap-2">
        获得资材: <span className="text-game-gold font-bold text-xl">{gold}</span>
      </div>

      <h3 className="text-xl mb-8 text-game-text tracking-widest font-serif">选择一张策卡加入牌组</h3>
      
      <div className="flex gap-[20px] mb-12">
        {cards.map(card => {
          const faction = FACTIONS[card.faction];
          const isSelected = selectedCard === card.id;
          
          let cardBgClass = "bg-game-card border-game-border";
          if (card.faction === 'LI_TANG') cardBgClass = "border-game-red bg-[linear-gradient(135deg,#2a2520_0%,#3d1a1a_100%)]";
          if (card.faction === 'WU_FAMILY' || card.faction === 'CRUEL_OFFICIALS') cardBgClass = "border-game-gold bg-[linear-gradient(135deg,#2a2520_0%,#3d352b_100%)]";

          return (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className={cn(
                "w-[160px] h-[220px] rounded-[8px] p-[12px] flex flex-col text-left transition-all relative border",
                cardBgClass,
                isSelected ? "shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105 border-game-gold" : "hover:scale-105"
              )}
            >
              <div className="absolute -top-[5px] -left-[5px] w-[28px] h-[28px] bg-game-gold text-[#1c1713] rounded-full flex items-center justify-center font-bold text-[14px] shadow-md">
                {card.cost}
              </div>
              <div className="h-[30px] border-b border-game-border-light text-[14px] font-bold text-game-gold ml-5 font-serif">
                {card.name}
              </div>
              <div className="flex-1 bg-[rgba(0,0,0,0.2)] margin-[8px_0] flex items-center justify-center text-[#3d352b] text-[50px] my-3">
                {card.type === 'ATTACK' ? '⚔️' : card.type === 'DEFENSE' ? '🛡️' : '📜'}
              </div>
              <div className="text-[11px] text-game-muted leading-[1.4] h-[50px] overflow-hidden">
                {card.description}
              </div>
              <div className="absolute bottom-[8px] right-[12px] text-[10px] uppercase text-[#8a7e6e]">
                {faction.name}
              </div>
            </button>
          );
        })}
      </div>

      <button 
        onClick={handleConfirm}
        className="px-8 py-3 bg-[#1c1713] hover:bg-[#2a2520] text-game-gold font-bold border border-game-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-colors tracking-widest text-lg font-serif"
      >
        {selectedCard ? '确认选择' : '跳过选牌'}
      </button>
    </div>
  );
}
