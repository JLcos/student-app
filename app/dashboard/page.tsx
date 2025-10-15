'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';
import FloatingAddButton from '@/components/FloatingAddButton';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import ActivityForm from '@/components/ActivityForm';
import { formatDate, getRelativeDate } from '@/utils/helpers';
import { MdCheckCircle, MdRadioButtonUnchecked, MdCalendarToday } from 'react-icons/md';
import { Activity } from '@/types';

export default function DashboardPage() {
  const { activities, subjects, user, toggleActivityComplete, getProgressStats } = useStore();
  const [showActivityModal, setShowActivityModal] = useState(false);
  const stats = getProgressStats();

  // Get today's activities
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const upcomingActivities = activities
    .filter((a) => a.dueDate >= today && !a.completed)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 5);

  const getSubjectById = (id: string) => subjects.find((s) => s.id === id);

  const ActivityItem = ({ activity }: { activity: Activity }) => {
    const subject = getSubjectById(activity.subjectId);
    
    return (
      <Card
        hoverable
        className="mb-3 cursor-pointer"
        onClick={() => toggleActivityComplete(activity.id)}
      >
        <div className="flex items-start gap-4">
          <button
            className="flex-shrink-0 text-3xl transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleActivityComplete(activity.id);
            }}
          >
            {activity.completed ? (
              <MdCheckCircle className="text-accent-green" />
            ) : (
              <MdRadioButtonUnchecked className="text-gray-400" />
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className={`font-bold text-lg ${activity.completed ? 'line-through text-gray-500' : ''}`}>
                {activity.title}
              </h3>
              {subject && (
                <Badge color={subject.color} className="text-xs">
                  {subject.name}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <MdCalendarToday />
              <span className="font-bold">{getRelativeDate(activity.dueDate)}</span>
              <span className="text-gray-600">• {formatDate(activity.dueDate)}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-brutal-gray pb-24">
      {/* Header */}
      <div className="bg-primary border-b-brutal border-brutal-black p-6">
        <h1 className="text-3xl font-bold text-white uppercase">
          Olá, {user?.name || 'Estudante'}! 👋
        </h1>
        <p className="text-white font-bold mt-1">
          {formatDate(new Date(), "EEEE, dd 'de' MMMM")}
        </p>
      </div>

      {/* Progress Summary */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-accent-green text-center p-4">
            <div className="text-3xl font-bold">{stats.completedToday}</div>
            <div className="text-xs font-bold uppercase mt-1">Concluídas</div>
          </Card>
          
          <Card className="bg-accent-yellow text-center p-4">
            <div className="text-3xl font-bold">{stats.totalToday - stats.completedToday}</div>
            <div className="text-xs font-bold uppercase mt-1">Pendentes</div>
          </Card>
          
          <Card className="bg-accent-pink text-center p-4">
            <div className="text-3xl font-bold">{stats.lateActivities}</div>
            <div className="text-xs font-bold uppercase mt-1">Atrasadas</div>
          </Card>
        </div>

        {stats.completedToday > 0 && (
          <Card className="mt-4 bg-secondary text-white text-center p-4">
            <p className="font-bold text-lg">
              🎉 Você concluiu {stats.completedToday} {stats.completedToday === 1 ? 'tarefa' : 'tarefas'} hoje!
            </p>
          </Card>
        )}
      </div>

      {/* Upcoming Activities */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold uppercase mb-4">Próximas Atividades</h2>
        
        {upcomingActivities.length === 0 ? (
          <Card className="text-center p-8">
            <p className="text-xl font-bold text-gray-500">
              Nenhuma atividade pendente 🎉
            </p>
            <p className="text-gray-600 mt-2">
              Aproveite seu tempo livre!
            </p>
          </Card>
        ) : (
          upcomingActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setShowActivityModal(true)} />

      {/* Activity Modal */}
      <Modal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        title="Nova Atividade"
        size="lg"
      >
        <ActivityForm onSuccess={() => setShowActivityModal(false)} />
      </Modal>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

