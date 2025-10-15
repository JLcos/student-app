'use client';

import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';
import Card from '@/components/Card';
import { MdTrendingUp, MdCheckCircle, MdWarning, MdTimer } from 'react-icons/md';

export default function ReportsPage() {
  const { activities, subjects, getProgressStats } = useStore();
  const stats = getProgressStats();

  const totalActivities = activities.length;
  const completedActivities = activities.filter((a) => a.completed).length;
  const completionRate = totalActivities > 0 
    ? Math.round((completedActivities / totalActivities) * 100)
    : 0;

  const weekCompletionRate = stats.totalThisWeek > 0
    ? Math.round((stats.completedThisWeek / stats.totalThisWeek) * 100)
    : 0;

  // Activities by subject
  const activitiesBySubject = subjects.map((subject) => {
    const subjectActivities = activities.filter((a) => a.subjectId === subject.id);
    const completed = subjectActivities.filter((a) => a.completed).length;
    const total = subjectActivities.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      subject,
      completed,
      total,
      percentage,
    };
  }).filter((item) => item.total > 0);

  // Motivational message
  const getMessage = () => {
    if (weekCompletionRate >= 80) {
      return { emoji: '🎉', text: 'Excelente trabalho esta semana!', color: 'bg-accent-green' };
    } else if (weekCompletionRate >= 50) {
      return { emoji: '💪', text: 'Bom progresso! Continue assim!', color: 'bg-accent-yellow' };
    } else if (weekCompletionRate > 0) {
      return { emoji: '📚', text: 'Vamos lá! Você consegue!', color: 'bg-accent-blue' };
    } else {
      return { emoji: '🚀', text: 'Pronto para começar?', color: 'bg-primary' };
    }
  };

  const message = getMessage();

  return (
    <div className="min-h-screen bg-brutal-gray pb-24">
      {/* Header */}
      <div className="bg-accent-blue border-b-brutal border-brutal-black p-6">
        <h1 className="text-3xl font-bold text-white uppercase">Relatórios</h1>
        <p className="text-white font-bold mt-1">Seu desempenho escolar</p>
      </div>

      {/* Motivational Banner */}
      <div className="p-6">
        <Card className={`${message.color} text-center p-6`}>
          <div className="text-6xl mb-3">{message.emoji}</div>
          <p className="text-2xl font-bold text-white">{message.text}</p>
          {weekCompletionRate > 0 && (
            <p className="text-white font-bold mt-2">
              Você concluiu {weekCompletionRate}% das tarefas esta semana
            </p>
          )}
        </Card>
      </div>

      {/* Overall Stats */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold uppercase mb-4">Estatísticas Gerais</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="text-center p-6 bg-accent-green">
            <MdCheckCircle className="text-5xl mx-auto mb-2 text-white" />
            <div className="text-4xl font-bold text-white mb-1">
              {completedActivities}
            </div>
            <div className="text-sm font-bold text-white uppercase">
              Concluídas
            </div>
          </Card>

          <Card className="text-center p-6 bg-accent-pink">
            <MdWarning className="text-5xl mx-auto mb-2 text-white" />
            <div className="text-4xl font-bold text-white mb-1">
              {stats.lateActivities}
            </div>
            <div className="text-sm font-bold text-white uppercase">
              Atrasadas
            </div>
          </Card>

          <Card className="text-center p-6 bg-accent-yellow">
            <MdTimer className="text-5xl mx-auto mb-2" />
            <div className="text-4xl font-bold mb-1">
              {totalActivities - completedActivities}
            </div>
            <div className="text-sm font-bold uppercase">
              Pendentes
            </div>
          </Card>

          <Card className="text-center p-6 bg-secondary">
            <MdTrendingUp className="text-5xl mx-auto mb-2 text-white" />
            <div className="text-4xl font-bold text-white mb-1">
              {completionRate}%
            </div>
            <div className="text-sm font-bold text-white uppercase">
              Taxa Total
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-6">
          <h3 className="font-bold text-lg mb-3 uppercase">Progresso Geral</h3>
          <div className="relative h-8 bg-brutal-gray border-brutal border-brutal-black">
            <div
              className="absolute top-0 left-0 h-full bg-primary border-r-brutal border-brutal-black transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-bold">
              {completionRate}%
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-bold">
            {completedActivities} de {totalActivities} atividades concluídas
          </p>
        </Card>

        {/* This Week */}
        <Card className="p-6 mb-6">
          <h3 className="font-bold text-lg mb-3 uppercase">Esta Semana</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold">Concluídas hoje:</span>
              <span className="text-2xl font-bold text-accent-green">
                {stats.completedToday}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold">Total esta semana:</span>
              <span className="text-2xl font-bold text-secondary">
                {stats.completedThisWeek}
              </span>
            </div>
            <div className="relative h-8 bg-brutal-gray border-brutal border-brutal-black mt-3">
              <div
                className="absolute top-0 left-0 h-full bg-secondary border-r-brutal border-brutal-black transition-all duration-500"
                style={{ width: `${weekCompletionRate}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
                {weekCompletionRate}%
              </div>
            </div>
          </div>
        </Card>

        {/* By Subject */}
        {activitiesBySubject.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold uppercase mb-4">Por Matéria</h2>
            <div className="space-y-3">
              {activitiesBySubject.map((item) => (
                <Card key={item.subject.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 border-brutal border-brutal-black"
                        style={{ backgroundColor: item.subject.color }}
                      />
                      <span className="font-bold">{item.subject.name}</span>
                    </div>
                    <span className="font-bold">
                      {item.completed}/{item.total}
                    </span>
                  </div>
                  <div className="relative h-6 bg-brutal-gray border-brutal border-brutal-black">
                    <div
                      className="absolute top-0 left-0 h-full border-r-brutal border-brutal-black transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.subject.color,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                      {item.percentage}%
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

