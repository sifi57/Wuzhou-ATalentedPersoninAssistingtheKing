import { useGameStore } from '../store/gameStore';
import { CHAPTERS } from '../data/chapters';
import { cn } from '../lib/utils';
import { Swords, Skull, MessageCircle, Tent, Store } from 'lucide-react';

export default function MapScreen() {
  const { mapNodes, selectNode, chapterIndex, hp, maxHp, gold } = useGameStore();
  const chapter = CHAPTERS[chapterIndex];

  const getNodeIcon = (type: string) => {
    switch(type) {
      case 'BATTLE': return <Swords size={24} />;
      case 'ELITE': return <Skull size={24} className="text-game-red" />;
      case 'EVENT': return <MessageCircle size={24} className="text-purple-400" />;
      case 'REST': return <Tent size={24} className="text-green-400" />;
      case 'SHOP': return <Store size={24} className="text-game-gold" />;
      case 'BOSS': return <Skull size={32} className="text-game-red" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_center,#2a221a_0%,#0f0d0c_100%)] text-game-text font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-game-header border-b-2 border-game-border shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div>
          <h2 className="text-xl font-bold text-game-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] tracking-widest font-serif">{chapter.name}</h2>
          <p className="text-sm text-game-muted">{chapter.description}</p>
        </div>
        <div className="flex gap-6 text-sm text-game-muted">
          <div className="flex gap-2">HP: <span className="text-game-gold font-bold">{hp}/{maxHp}</span></div>
          <div className="flex gap-2">金币: <span className="text-game-gold font-bold">{gold}</span></div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden p-8 flex items-center justify-center">
        <div className="relative w-[400px] h-[400px] border-2 border-game-border rounded-full flex items-center justify-center bg-[radial-gradient(circle,#3d352b_0%,transparent_70%)]">
          <div className="absolute inset-[0%] w-[110%] h-[110%] border border-dashed border-[rgba(212,175,55,0.2)] rounded-full pointer-events-none scale-110"></div>
          
          {/* Draw lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {mapNodes.map(node => 
              node.nextNodes.map(nextId => {
                const nextNode = mapNodes.find(n => n.id === nextId);
                if (!nextNode) return null;
                return (
                  <line 
                    key={`${node.id}-${nextId}`}
                    x1={`${(node.x / 500) * 100}%`} 
                    y1={`${(node.y / 800) * 100}%`} 
                    x2={`${(nextNode.x / 500) * 100}%`} 
                    y2={`${(nextNode.y / 800) * 100}%`} 
                    stroke={node.status === 'COMPLETED' ? '#d4af37' : '#5c4b3a'} 
                    strokeWidth="2"
                  />
                );
              })
            )}
          </svg>

          {/* Draw nodes */}
          {mapNodes.map(node => (
            <button
              key={node.id}
              onClick={() => selectNode(node.id)}
              disabled={node.status !== 'AVAILABLE'}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all border-2",
                node.status === 'LOCKED' && "bg-[#1c1713] border-[#3d352b] text-[#8a7e6e] cursor-not-allowed",
                node.status === 'AVAILABLE' && "bg-[#1c1713] border-game-gold text-game-gold cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:scale-110 hover:bg-[#2a2520]",
                node.status === 'COMPLETED' && "bg-[#3d352b] border-game-gold text-game-gold"
              )}
              style={{ left: `${(node.x / 500) * 100}%`, top: `${(node.y / 800) * 100}%` }}
            >
              {getNodeIcon(node.type)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
