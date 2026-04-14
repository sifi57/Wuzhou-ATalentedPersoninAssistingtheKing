import { useGameStore } from './store/gameStore';
import StartScreen from './components/StartScreen';
import MapScreen from './components/MapScreen';
import EventScreen from './components/EventScreen';
import BattleScreen from './components/BattleScreen';
import RewardScreen from './components/RewardScreen';

export default function App() {
  const phase = useGameStore(state => state.phase);

  return (
    <div className="w-full h-screen bg-game-bg text-game-text overflow-hidden font-sans selection:bg-game-gold/30">
      {phase === 'START' && <StartScreen />}
      {phase === 'MAP' && <MapScreen />}
      {phase === 'EVENT' && <EventScreen />}
      {phase === 'BATTLE' && <BattleScreen />}
      {phase === 'REWARD' && <RewardScreen />}
      {phase === 'GAMEOVER' && (
        <div className="flex flex-col items-center justify-center h-full bg-[radial-gradient(circle_at_center,#3d1a1a_0%,#0f0d0c_100%)] text-game-text">
          <h1 className="text-6xl text-game-red mb-8 font-bold tracking-[8px] drop-shadow-[0_0_15px_rgba(196,30,58,0.5)] font-serif">身死族灭</h1>
          <button onClick={() => useGameStore.getState().startGame()} className="px-8 py-3 bg-[#1c1713] hover:bg-[#2a2520] text-game-gold border border-game-border tracking-widest transition-colors font-serif">重新开始</button>
        </div>
      )}
      {phase === 'VICTORY' && (
        <div className="flex flex-col items-center justify-center h-full bg-[radial-gradient(circle_at_center,#3d352b_0%,#0f0d0c_100%)] text-game-text">
          <h1 className="text-6xl text-game-gold mb-8 font-bold tracking-[8px] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] font-serif">权倾天下</h1>
          <button onClick={() => useGameStore.getState().startGame()} className="px-8 py-3 bg-[#1c1713] hover:bg-[#2a2520] text-game-gold border border-game-gold tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-colors font-serif">再次挑战</button>
        </div>
      )}
    </div>
  );
}
