import LoadingSpinner from './LoadingSpinner';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-accent-yellow">
      <div className="bg-primary border-brutal border-brutal-black shadow-brutal-lg px-8 py-4 mb-6 animate-bounce">
        <h1 className="text-4xl font-bold text-white">📚</h1>
      </div>
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-xl font-bold uppercase">Carregando...</p>
    </div>
  );
}

