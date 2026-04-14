import { useGameStore } from '../store/gameStore';

export default function StartScreen() {
  const startGame = useGameStore(state => state.startGame);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[radial-gradient(circle_at_center,#2a221a_0%,#0f0d0c_100%)] text-game-text font-sans">
      <h1 className="text-6xl font-bold mb-4 text-game-gold tracking-[4px] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] font-serif">武周·王佐之人</h1>
      <p className="text-xl mb-12 text-game-muted">在权力的漩涡中，你将辅佐谁走向巅峰？</p>
      
      <button 
        onClick={startGame}
        className="px-8 py-4 bg-[#1c1713] hover:bg-[#2a2520] text-game-gold text-2xl rounded shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all border-2 border-game-gold font-serif tracking-widest"
      >
        开始征程
      </button>
    </div>
  );
}
