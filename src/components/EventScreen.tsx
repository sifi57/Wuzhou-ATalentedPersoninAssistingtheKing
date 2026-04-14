import { useGameStore } from '../store/gameStore';
import { EVENTS } from '../data/events';

export default function EventScreen() {
  const { currentEventId, completeNode } = useGameStore();
  const event = currentEventId ? EVENTS[currentEventId] : null;

  if (!event) return null;

  const handleChoice = (effect: any) => {
    effect(useGameStore.getState());
    completeNode();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[radial-gradient(circle_at_center,#2a221a_0%,#0f0d0c_100%)] text-game-text p-8 font-sans">
      <div className="max-w-2xl w-full bg-[rgba(20,18,16,0.8)] border border-game-border-light p-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="bg-[#3d1a1a] p-2 px-4 border-l-4 border-game-red text-xs uppercase tracking-widest mb-6 inline-block font-serif">
          事件
        </div>
        <h2 className="text-2xl font-bold text-game-gold mb-6 tracking-widest font-serif">{event.title}</h2>
        <div className="bg-[rgba(40,35,30,0.6)] border border-[#4a4135] p-4 mb-8 rounded-sm">
          <p className="text-[14px] text-game-text leading-[1.6]">
            {event.description}
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          {event.choices.map(choice => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.effect)}
              className="w-full text-left p-4 bg-game-card hover:bg-[#3d352b] transition-colors border border-game-border group"
            >
              <div className="font-bold text-[14px] text-game-text group-hover:text-game-gold font-serif">{choice.text}</div>
              <div className="text-[12px] text-game-muted mt-1">{choice.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
